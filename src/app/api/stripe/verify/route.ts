import { NextRequest, NextResponse } from "next/server";
import { getCustomerFromRequest } from "@/lib/customer-auth";
import {
  getAllUserAccess,
  getServiceOrdersByCustomer,
} from "@/lib/billing";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const customer = await getCustomerFromRequest(request);
    if (!customer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { slug } = await request.json().catch(() => ({}));

    // Single access check
    if (slug) {
      const access = await getAllUserAccess(customer.id);
      const hasAccess = access.some((a) => a.product_slug === slug);
      return NextResponse.json({ hasAccess });
    }

    // Full account summary
    const [accessRows, serviceOrders, customerData] = await Promise.all([
      getAllUserAccess(customer.id),
      getServiceOrdersByCustomer(customer.id),
      supabase
        .from("customers")
        .select("id, email, name, company, job_title, country, phone, created_at")
        .eq("id", customer.id)
        .single(),
    ]);

    // Get purchases joined with products for name/slug/price
    const { data: purchases } = await supabase
      .from("purchases")
      .select("*, products(name, slug, price_cents, currency)")
      .eq("customer_id", customer.id)
      .order("purchased_at", { ascending: false });

    // Get active subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("customer_id", customer.id)
      .in("status", ["active", "trialing", "past_due"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const cd = customerData.data;
    return NextResponse.json({
      customerId: customer.id,
      email: cd?.email,
      name: cd?.name ?? null,
      company: cd?.company ?? null,
      jobTitle: cd?.job_title ?? null,
      country: cd?.country ?? null,
      phone: cd?.phone ?? null,
      memberSince: cd?.created_at ?? null,
      access: accessRows.map((a) => ({
        productSlug: a.product_slug,
        productName: a.product_name,
        productAccessType: a.product_access_type,
        accessSource: a.access_type,
        expiresAt: a.expires_at,
      })),
      serviceOrders: serviceOrders.map((o) => ({
        id: o.id,
        productSlug: o.product_slug ?? "",
        productName: o.product_name ?? "",
        status: o.status,
        createdAt: o.created_at,
      })),
      purchaseHistory: (purchases ?? []).map((p) => ({
        productSlug: (p.products as { slug?: string } | null)?.slug ?? "",
        productName: (p.products as { name?: string } | null)?.name ?? "",
        amount: (p.products as { price_cents?: number } | null)?.price_cents != null
          ? ((p.products as { price_cents: number }).price_cents / 100)
          : null,
        currency: (p.products as { currency?: string } | null)?.currency ?? "usd",
        purchasedAt: p.purchased_at,
        purchaseType: p.purchase_type ?? null,
      })),
      subscriptionStatus: subscription?.status ?? null,
      subscriptionInterval: null,
      trialEndsAt: subscription?.trial_ends_at ?? null,
      currentPeriodEnd: subscription?.current_period_end ?? null,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
