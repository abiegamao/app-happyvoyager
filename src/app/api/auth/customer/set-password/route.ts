import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  hashPassword,
  signCustomerToken,
  customerCookieOptions,
  COOKIE_NAME,
} from "@/lib/customer-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password, token } = await request.json();

    if (!email || !password || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data: customer } = await supabase
      .from("customers")
      .select("id, email, reset_token, reset_token_expires_at")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (!customer) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (customer.reset_token !== token) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (
      !customer.reset_token_expires_at ||
      new Date(customer.reset_token_expires_at) < new Date()
    ) {
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await supabase
      .from("customers")
      .update({
        password_hash: passwordHash,
        reset_token: null,
        reset_token_expires_at: null,
      })
      .eq("id", customer.id);

    const jwtToken = await signCustomerToken(customer.id);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, jwtToken, customerCookieOptions());
    return response;
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json(
      { error: "Failed to set password" },
      { status: 500 }
    );
  }
}
