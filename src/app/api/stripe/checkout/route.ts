import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { getCustomerFromRequest } from "@/lib/customer-auth";

// Direct env-var mapping — no Supabase lookup needed for checkout
const PLAN_MAP: Record<
  string,
  { priceId: () => string | undefined; mode: "subscription" | "payment"; trial?: boolean }
> = {
  "playbook-monthly": {
    priceId: () => process.env.STRIPE_PRICE_SPAIN_DNV_MONTHLY,
    mode: "subscription",
    trial: true,
  },
  "playbook-yearly": {
    priceId: () => process.env.STRIPE_PRICE_SPAIN_DNV_YEARLY,
    mode: "subscription",
    trial: true,
  },
  "guided-navigator": {
    priceId: () => process.env.STRIPE_PRICE_GUIDED_NAVIGATOR,
    mode: "payment",
  },
  "vip-concierge": {
    priceId: () => process.env.STRIPE_PRICE_VIP_CONCIERGE,
    mode: "payment",
  },
};

export async function POST(request: NextRequest) {
  try {
    const customer = await getCustomerFromRequest(request);
    if (!customer) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const slug: string = body.slug;

    if (!slug) {
      return NextResponse.json({ error: "Plan slug is required" }, { status: 400 });
    }

    const plan = PLAN_MAP[slug];
    if (!plan) {
      return NextResponse.json({ error: `Unknown plan: ${slug}` }, { status: 400 });
    }

    const priceId = plan.priceId();
    if (!priceId) {
      return NextResponse.json(
        { error: `No Stripe price configured for plan: ${slug}` },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Fetch customer email to pre-fill Stripe checkout
    const { data: customerRow } = await supabase
      .from("customers")
      .select("email")
      .eq("id", customer.id)
      .single();
    const customerEmail = customerRow?.email ?? undefined;

    // Block duplicate subscriptions
    if (plan.mode === "subscription") {
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("customer_id", customer.id)
        .in("status", ["active", "trialing", "past_due"])
        .limit(1)
        .maybeSingle();
      if (existing) {
        return NextResponse.json(
          { error: "already_subscribed", redirectTo: `${appUrl}/dashboard` },
          { status: 409 }
        );
      }
    }

    const metadata: Record<string, string> = {
      customer_id: customer.id,
      product_slug: slug,
    };

    if (plan.mode === "subscription") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        client_reference_id: customer.id,
        customer_email: customerEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: {
          trial_period_days: plan.trial ? 14 : undefined,
          metadata,
        },
        payment_method_collection: "always",
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard`,
        metadata,
      });
      return NextResponse.json({ url: session.url });
    } else {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        client_reference_id: customer.id,
        customer_email: customerEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard`,
        metadata,
      });
      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
