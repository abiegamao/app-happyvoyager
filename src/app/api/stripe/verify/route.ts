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
        .select("id, email, name")
        .eq("id", customer.id)
        .single(),
    ]);

    // Get purchases
    const { data: purchases } = await supabase
      .from("purchases")
      .select("*")
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

    return NextResponse.json({
      customerId: customer.id,
      email: customerData.data?.email,
      name: customerData.data?.name,
      access: accessRows.map((a) => ({
        productSlug: a.product_slug,
        productName: a.product_name,
        accessSource: a.access_source,
        expiresAt: a.expires_at,
      })),
      serviceOrders: serviceOrders.map((o) => ({
        id: o.id,
        productSlug: o.product_slug,
        productName: o.product_name,
        status: o.status,
        createdAt: o.created_at,
      })),
      purchaseHistory: (purchases ?? []).map((p) => ({
        productSlug: p.product_slug,
        productName: p.product_name,
        amount: p.amount,
        currency: p.currency,
        purchasedAt: p.purchased_at,
      })),
      subscriptionStatus: subscription?.status ?? null,
      subscriptionInterval: subscription?.interval ?? null,
      trialEndsAt: subscription?.trial_end ?? null,
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
