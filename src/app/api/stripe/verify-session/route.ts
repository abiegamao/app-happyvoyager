import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (
      session.payment_status !== "paid" &&
      session.status !== "complete" &&
      !(session.mode === "subscription")
    ) {
      return NextResponse.json({ hasAccess: false });
    }

    const email = session.customer_details?.email ?? session.customer_email;
    const name = session.customer_details?.name ?? null;

    const lineItem = session.line_items?.data?.[0];
    const product = lineItem?.price?.product;
    const productName =
      typeof product === "object" && product !== null
        ? (product as Stripe.Product).name
        : "Happy Voyager";

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Check if customer needs password setup
    let needsPassword = false;
    if (email) {
      const { data: customer } = await supabase
        .from("customers")
        .select("id, password_hash")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (customer && !customer.password_hash) {
        needsPassword = true;

        // Generate set-password token and send email
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        await supabase
          .from("customers")
          .update({ reset_token: token, reset_token_expires_at: expiresAt })
          .eq("id", customer.id);

        const appUrl =
          process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";
        const setPasswordUrl = `${appUrl}/set-password?token=${token}&email=${encodeURIComponent(email)}`;

        try {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: "Happy Voyager <hello@happyvoyager.com>",
            to: email,
            subject: `You're in! Set your password for ${productName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
                <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">Welcome${name ? `, ${name}` : ""}! 🎉</h2>
                <p style="color: #6b6b6b; font-size: 15px; margin-top: 0;">Your purchase of <strong>${productName}</strong> is confirmed. Set your password to access your account.</p>
                <p>
                  <a href="${setPasswordUrl}"
                     style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    Set Your Password &rarr;
                  </a>
                </p>
                <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
                <p style="color: #aaaaaa; font-size: 12px;">This link expires in 24 hours. If you didn't make this purchase, contact hello@happyvoyager.com</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Set-password email error:", emailErr);
        }
      }
    }

    return NextResponse.json({
      hasAccess: true,
      email,
      name,
      productName,
      needsPassword,
    });
  } catch (error) {
    console.error("Verify session error:", error);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}
