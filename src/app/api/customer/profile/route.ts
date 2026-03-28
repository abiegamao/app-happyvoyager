import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCustomerFromRequest } from "@/lib/customer-auth";

export async function PATCH(request: NextRequest) {
  try {
    const customer = await getCustomerFromRequest(request);
    if (!customer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Only allow these fields
    const allowed = ["name", "company", "job_title", "country", "phone"] as const;
    type AllowedKey = (typeof allowed)[number];
    const updates: Partial<Record<AllowedKey, string>> = {};

    for (const key of allowed) {
      if (key in body && typeof body[key] === "string") {
        updates[key] = body[key].trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data, error } = await supabase
      .from("customers")
      .update(updates)
      .eq("id", customer.id)
      .select("id, email, name, company, job_title, country, phone")
      .single();

    if (error) {
      console.error("Profile update error:", error);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      name: data.name ?? null,
      company: data.company ?? null,
      jobTitle: data.job_title ?? null,
      country: data.country ?? null,
      phone: data.phone ?? null,
    });
  } catch (error) {
    console.error("Profile patch error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
