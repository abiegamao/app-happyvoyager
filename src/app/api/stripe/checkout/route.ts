import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import { getProductBySlug, getStripePriceId } from "@/lib/billing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const customer = await getCustomerFromRequest(request);
    if (!customer) {
      return NextResponse.json(
        { error: "You must be logged in to make a purchase" },
        { status: 401 }
      );
    }

    const { slug } = await request.json();
    if (!slug) {
      return NextResponse.json(
        { error: "Product slug is required" },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const priceId = await getStripePriceId(product.id);
    if (!priceId) {
      return NextResponse.json(
        { error: "No Stripe price configured for this product" },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";

    const metadata: Record<string, string> = {
      customer_id: customer.id,
      product_id: product.id,
      product_slug: product.slug,
    };

    if (product.type === "subscription") {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: undefined, // customer already authenticated
        client_reference_id: customer.id,
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: {
          trial_period_days: 14,
          metadata,
        },
        payment_method_collection: "always",
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard`,
        metadata,
      });
      return NextResponse.json({ url: session.url });
    } else {
      const successUrl =
        product.category === "service"
          ? `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=service`
          : `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;

      const cancelUrl =
        product.category === "service"
          ? `${appUrl}/dashboard`
          : `${appUrl}/dashboard`;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        client_reference_id: customer.id,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata,
      });
      return NextResponse.json({ url: session.url });
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
