import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { transporter, MAIL_FROM } from "@/lib/mailer";
import {
  getProductByStripePriceId,
  grantUserAccess,
  revokeSubscriptionAccess,
  createServiceOrder,
  upsertSubscription,
  updateSubscriptionStatus,
  cancelSubscription,
  getSubscriptionByStripeId,
  getAccessSource,
} from "@/lib/billing";
import type { Product, SubscriptionStatus } from "@/lib/billing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ── Idempotency: skip already-processed events ──────────────────────────
  const { data: alreadyProcessed } = await supabaseAdmin
    .from("webhook_events")
    .select("stripe_event_id")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (alreadyProcessed) {
    return NextResponse.json({ received: true });
  }

  // ── Process event ───────────────────────────────────────────────────────
  try {
    await handleEvent(event);
  } catch (err) {
    console.error(`Webhook handler error [${event.type}] ${event.id}:`, err);
    // Return 200 so Stripe doesn't flag the endpoint as failing.
    // Errors are logged — check server logs for investigation.
    return NextResponse.json({ received: true });
  }

  // Mark as processed only after successful handling
  await supabaseAdmin.from("webhook_events").insert({
    stripe_event_id: event.id,
    event_type: event.type,
  });

  return NextResponse.json({ received: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// Event router
// ─────────────────────────────────────────────────────────────────────────────
async function handleEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(
        event.data.object as Stripe.Checkout.Session
      );
      break;

    case "invoice.paid":
      await handleInvoicePaid(event.data.object as Stripe.Invoice);
      break;

    case "customer.subscription.updated":
      await handleSubscriptionUpdated(
        event.data.object as Stripe.Subscription
      );
      break;

    case "customer.subscription.deleted":
      await handleSubscriptionDeleted(
        event.data.object as Stripe.Subscription
      );
      break;

    case "customer.subscription.trial_will_end":
      await handleTrialWillEnd(event.data.object as Stripe.Subscription);
      break;

    default:
      break;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// checkout.session.completed
//
// Entry point for ALL purchases — subscriptions and one-time.
// Routes to grantUserAccess() or createServiceOrder() based on product.category.
// ─────────────────────────────────────────────────────────────────────────────
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  // client_reference_id is our internal customer UUID set in the checkout route
  const customerId = session.client_reference_id;
  if (!customerId) {
    console.error(
      "checkout.session.completed: missing client_reference_id",
      session.id
    );
    return;
  }

  if (session.payment_status !== "paid" && session.mode !== "subscription") {
    return;
  }

  // ── Resolve product from Stripe price ID ─────────────────────────────────
  let product: Product | null = null;
  let stripeSubscription: Stripe.Subscription | null = null;
  let stripePriceId: string | null = null;

  if (session.mode === "subscription" && session.subscription) {
    stripeSubscription = await stripe.subscriptions.retrieve(
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription.id
    );
    stripePriceId = stripeSubscription.items.data[0]?.price?.id ?? null;
  } else {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 1,
    });
    stripePriceId = lineItems.data[0]?.price?.id ?? null;
  }

  if (!stripePriceId) {
    console.error(
      "checkout.session.completed: could not resolve price_id",
      session.id
    );
    return;
  }

  product = await getProductByStripePriceId(stripePriceId);
  if (!product) {
    console.error(
      "checkout.session.completed: unknown price_id",
      stripePriceId,
      session.id
    );
    return;
  }

  // ── Purchase receipt log (always write before access grant) ─────────────
  await supabaseAdmin.from("purchases").insert({
    customer_id: customerId,
    product_id: product.id,
    purchase_type: product.type,
    stripe_session_id: session.id,
    stripe_customer_id:
      typeof session.customer === "string" ? session.customer : null,
    stripe_price_id: stripePriceId,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : null,
  });

  // ── Route based on product category ──────────────────────────────────────
  if (product.category === "access") {
    await grantUserAccess({
      customerId,
      productId: product.id,
      accessType: getAccessSource(product),
      source: stripeSubscription?.id ?? null,
    });

    if (stripeSubscription) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = stripeSubscription as any;
      await upsertSubscription({
        customerId,
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId:
          typeof session.customer === "string" ? session.customer : null,
        productId: product.id,
        status: stripeSubscription.status as SubscriptionStatus,
        currentPeriodStart: s.current_period_start
          ? new Date(s.current_period_start * 1000).toISOString()
          : null,
        currentPeriodEnd: s.current_period_end
          ? new Date(s.current_period_end * 1000).toISOString()
          : null,
        trialEndsAt: s.trial_end
          ? new Date(s.trial_end * 1000).toISOString()
          : null,
      });
    }
  } else if (product.category === "service") {
    await createServiceOrder({
      customerId,
      productId: product.id,
      stripePaymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : null,
    });
  }

  // ── Post-purchase email ───────────────────────────────────────────────────
  const email =
    session.customer_email || session.customer_details?.email || null;
  if (email) {
    await sendEmail(email, product);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// invoice.paid
//
// Fires on subscription renewals and trial → paid conversions.
// Extends user access by another billing period via grantUserAccess().
// Skips subscription_create (handled by checkout.session.completed).
// ─────────────────────────────────────────────────────────────────────────────
async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = invoice as any;
  const subscriptionId = inv.subscription as string | null;

  if (!subscriptionId || inv.billing_reason === "subscription_create") {
    return;
  }

  const sub = await getSubscriptionByStripeId(subscriptionId);
  if (!sub) {
    console.error("invoice.paid: subscription not found in DB", subscriptionId);
    return;
  }

  // Look up product directly by product_id stored on the subscription
  const { data: product } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", sub.product_id)
    .single();
  if (!product) {
    console.error("invoice.paid: product not found for id", sub.product_id);
    return;
  }

  const periodEnd = invoice.period_end
    ? new Date(invoice.period_end * 1000)
    : null;

  // Extend access — pass expiresAt from the new billing period end
  await grantUserAccess({
    customerId: sub.customer_id,
    productId: product.id,
    accessType: getAccessSource(product),
    expiresAt: periodEnd?.toISOString() ?? null,
    source: subscriptionId,
  });

  await updateSubscriptionStatus(subscriptionId, "active", {
    current_period_end: periodEnd?.toISOString() ?? undefined,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// customer.subscription.updated
//
// Status changes, plan changes, trial → active transitions.
// Only syncs status + period dates — access extension handled by invoice.paid.
// ─────────────────────────────────────────────────────────────────────────────
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = subscription as any;
  const periodEnd = s.current_period_end
    ? new Date(s.current_period_end * 1000)
    : null;
  const trialEnd = s.trial_end ? new Date(s.trial_end * 1000) : null;

  await updateSubscriptionStatus(
    subscription.id,
    subscription.status as SubscriptionStatus,
    {
      current_period_end: periodEnd?.toISOString() ?? undefined,
      trial_ends_at: trialEnd?.toISOString() ?? undefined,
    }
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// customer.subscription.deleted
//
// Access is revoked immediately by stripe_subscription_id.
// VIP and one_time_purchase rows in user_access are unaffected.
// ─────────────────────────────────────────────────────────────────────────────
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  await cancelSubscription(subscription.id);
  await revokeSubscriptionAccess(subscription.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// customer.subscription.trial_will_end
//
// Sends reminder email 3 days before trial ends.
// ─────────────────────────────────────────────────────────────────────────────
async function handleTrialWillEnd(
  subscription: Stripe.Subscription
): Promise<void> {
  const stripeCustomer = await stripe.customers.retrieve(
    subscription.customer as string
  );
  if (stripeCustomer.deleted || !stripeCustomer.email) return;

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: stripeCustomer.email,
      subject: "Hey Fellow Voyager — your trial ends in 3 days ✈️",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
          <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">Hey Fellow Voyager,</h2>
          <p style="color: #6b6b6b; font-size: 15px; margin-top: 8px;">
            Just a friendly heads-up — your 14-day free trial of <strong>Playbook Pro</strong> wraps up in 3 days.
            After that, your subscription kicks in automatically so you won't miss a beat.
          </p>
          <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
          <p style="color: #3a3a3a; font-size: 15px;">
            No action needed on your end — just keep exploring at your own pace. 🌍
          </p>
          <p>
            <a href="${siteUrl}/playbook/spain-dnv"
               style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Continue Your Journey &rarr;
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
          <p style="color: #aaaaaa; font-size: 12px;">
            Need to make changes? Visit your
            <a href="https://billing.stripe.com/p/login/3cI6oB9OKdBh6mdgcl73G00" style="color: #e3a99c;">billing portal</a> anytime.<br />
            Questions? Just reply to this email or reach us at hello@abiemaxey.com — we're always happy to help.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Trial reminder email error:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// sendEmail()
//
// Access products → "you're in" welcome email.
// Service products → "we've received your request" confirmation email.
// ─────────────────────────────────────────────────────────────────────────────
async function sendEmail(email: string, product: Product): Promise<void> {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";
  const isService = product.category === "service";

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: isService
        ? `Hey Fellow Voyager, we've received your ${product.name} request!`
        : "Welcome aboard, Fellow Voyager, your Playbook Pro access is live! ✈️",
      html: isService
        ? `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
            <h2 style="color: #3a3a3a; font-size: 24px;">Hey Fellow Voyager,</h2>
            <p style="color: #6b6b6b; font-size: 15px; margin-top: 8px;">
              We've received your <strong>${product.name}</strong> request and we're already on it!
              One of our team members will personally reach out within 1–2 business days to get your journey started.
            </p>
            <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
            <p style="color: #6b6b6b; font-size: 15px;">
              In the meantime, feel free to reply to this email if you have any questions — we're here for you every step of the way. 🌍
            </p>
            <p style="color: #aaaaaa; font-size: 12px;">– The Happy Voyager Team &nbsp;|&nbsp; hello@abiemaxey.com</p>
          </div>
        `
        : `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
            <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">Hey Fellow Voyager, you're in! 🎉</h2>
            <p style="color: #6b6b6b; font-size: 15px; margin-top: 8px;">
              Welcome to <strong>Playbook Pro</strong> — your gateway to navigating Spain's Digital Nomad Visa like a pro.
              Your access is live and ready for you right now.
            </p>
            <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
            <p style="color: #3a3a3a; font-size: 15px;">Jump in and start exploring your lessons:</p>
            <p>
              <a href="${siteUrl}/playbook/spain-dnv"
                 style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Start Your Journey &rarr;
              </a>
            </p>
            <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
            <p style="color: #aaaaaa; font-size: 12px;">
              Bookmark this email — use <strong>${email}</strong> to sign in on any device.<br />
              Questions? Just reply here or reach us at hello@abiemaxey.com — we love hearing from our voyagers. 🌟
            </p>
          </div>
        `,
    });
  } catch (err) {
    console.error("Post-purchase email error:", err);
  }
}
