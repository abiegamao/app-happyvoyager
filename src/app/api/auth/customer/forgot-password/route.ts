import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { transporter, MAIL_FROM } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ ok: true });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data: customer } = await supabase
      .from("customers")
      .select("id, email, name")
      .eq("email", email.toLowerCase().trim())
      .single();

    // Always return ok — don't reveal whether the email exists
    if (!customer) {
      return NextResponse.json({ ok: true });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    await supabase
      .from("customers")
      .update({ reset_token: token, reset_token_expires_at: expiresAt })
      .eq("id", customer.id);

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://app.happyvoyager.com";
    const resetUrl = `${appUrl}/set-password?token=${token}&email=${encodeURIComponent(customer.email)}`;

    try {
      await transporter.sendMail({
        from: `Happy Voyager <${MAIL_FROM}>`,
        to: customer.email,
        subject: "Reset your Happy Voyager password",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f5f2; border-radius: 16px;">
            <h2 style="color: #3a3a3a; margin-bottom: 4px; font-size: 24px;">Reset your password</h2>
            <p style="color: #6b6b6b; font-size: 15px; margin-top: 0;">Click below to set a new password for your Happy Voyager account. This link expires in 1 hour.</p>
            <p>
              <a href="${resetUrl}"
                 style="display: inline-block; padding: 14px 28px; background: #3a3a3a; color: white; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Set New Password &rarr;
              </a>
            </p>
            <hr style="border: none; border-top: 1px solid #e7ddd3; margin: 24px 0;" />
            <p style="color: #aaaaaa; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Forgot password email error:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ ok: true });
  }
}
