import { createClient } from "@supabase/supabase-js";
import type { ServiceOrder, ServiceOrderStatus } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export async function createServiceOrder(params: {
  customerId: string;
  productId: string;
  productSlug: string;
  productName: string;
  stripeSessionId?: string | null;
}): Promise<ServiceOrder | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("service_orders")
    .insert({
      customer_id: params.customerId,
      product_id: params.productId,
      product_slug: params.productSlug,
      product_name: params.productName,
      stripe_session_id: params.stripeSessionId ?? null,
      status: "pending",
    })
    .select()
    .single();
  return data ?? null;
}

export async function getServiceOrdersByCustomer(
  customerId: string
): Promise<ServiceOrder[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("service_orders")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return data ?? [];
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
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}
