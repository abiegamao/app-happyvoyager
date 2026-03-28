import { createClient } from "@supabase/supabase-js";
import type { ServiceOrder, ServiceOrderStatus } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapServiceOrder(row: any): ServiceOrder {
  return {
    id: row.id,
    customer_id: row.customer_id,
    product_id: row.product_id,
    product_slug: row.products?.slug ?? "",
    product_name: row.products?.name ?? "",
    stripe_payment_intent_id: row.stripe_payment_intent_id ?? null,
    status: row.status,
    notes: row.notes ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function createServiceOrder(params: {
  customerId: string;
  productId: string;
  stripePaymentIntentId?: string | null;
}): Promise<ServiceOrder | null> {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("service_orders")
    .insert({
      customer_id: params.customerId,
      product_id: params.productId,
      stripe_payment_intent_id: params.stripePaymentIntentId ?? null,
      status: "pending",
    })
    .select("*, products:product_id(slug, name)")
    .single();
  if (error) {
    throw new Error(`createServiceOrder failed: ${error.message} (code: ${error.code})`);
  }
  return data ? mapServiceOrder(data) : null;
}

export async function getServiceOrdersByCustomer(
  customerId: string
): Promise<ServiceOrder[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("service_orders")
    .select("*, products:product_id(slug, name)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapServiceOrder);
}

export async function updateServiceOrderStatus(
  orderId: string,
  status: ServiceOrderStatus,
  notes?: string
): Promise<void> {
  const supabase = getClient();
  await supabase
    .from("service_orders")
    .update({ status, notes: notes ?? null, updated_at: new Date().toISOString() })
    .eq("id", orderId);
}

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("service_orders")
    .select("*, products:product_id(slug, name)")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapServiceOrder);
}
