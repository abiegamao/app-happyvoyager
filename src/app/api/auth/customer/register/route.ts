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
    const { email, name, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
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

    const { data: existing } = await supabase
      .from("customers")
      .select("id, password_hash")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      if (existing.password_hash) {
        return NextResponse.json(
          { error: "An account with this email already exists. Please log in." },
          { status: 409 }
        );
      }
      // Customer exists (created via Stripe) but has no password — set it now
      const passwordHash = await hashPassword(password);
      await supabase
        .from("customers")
        .update({
          password_hash: passwordHash,
          name: name?.trim() || undefined,
          reset_token: null,
          reset_token_expires_at: null,
        })
        .eq("id", existing.id);

      const token = await signCustomerToken(existing.id);
      const response = NextResponse.json({
        customerId: existing.id,
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
      });
      response.cookies.set(COOKIE_NAME, token, customerCookieOptions());
      return response;
    }

    const passwordHash = await hashPassword(password);

    const { data: customer, error: insertError } = await supabase
      .from("customers")
      .insert({
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        password_hash: passwordHash,
      })
      .select("id")
      .single();

    if (insertError || !customer) {
      console.error("Customer register error:", insertError);
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 }
      );
    }

    const token = await signCustomerToken(customer.id);

    const response = NextResponse.json({
      customerId: customer.id,
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
    });
    response.cookies.set(COOKIE_NAME, token, customerCookieOptions());
    return response;
  } catch (error) {
    console.error("Customer register error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
