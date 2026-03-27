import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  comparePassword,
  signCustomerToken,
  customerCookieOptions,
  COOKIE_NAME,
} from "@/lib/customer-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data: customer } = await supabase
      .from("customers")
      .select("id, email, name, password_hash")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!customer.password_hash) {
      return NextResponse.json({ error: "no_password" }, { status: 401 });
    }

    const valid = await comparePassword(password, customer.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signCustomerToken(customer.id);

    const response = NextResponse.json({
      customerId: customer.id,
      email: customer.email,
      name: customer.name,
    });

    response.cookies.set(COOKIE_NAME, token, customerCookieOptions());
    return response;
  } catch (error) {
    console.error("Customer login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
