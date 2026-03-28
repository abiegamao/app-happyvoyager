import { createClient } from "@supabase/supabase-js";
import type { AccessSource, UserAccess } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export async function grantUserAccess(params: {
  customerId: string;
  productId: string;
  productSlug: string;
  productName: string;
  accessSource: AccessSource;
  expiresAt?: string | null;
  stripeSubscriptionId?: string | null;
}): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("user_access").upsert(
    {
      customer_id: params.customerId,
      product_id: params.productId,
      product_slug: params.productSlug,
      product_name: params.productName,
      access_source: params.accessSource,
      expires_at: params.expiresAt ?? null,
      stripe_subscription_id: params.stripeSubscriptionId ?? null,
      revoked_at: null,
    },
    { onConflict: "customer_id,product_id" }
  );
  if (error) {
    throw new Error(`grantUserAccess failed: ${error.message} (code: ${error.code})`);
  }
}

export async function checkUserAccess(
  customerId: string,
  productSlug: string
): Promise<UserAccess | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("user_access")
    .select("*")
    .eq("customer_id", customerId)
    .eq("product_slug", productSlug)
    .is("revoked_at", null)
    .single();
  return data ?? null;
}

export async function revokeSubscriptionAccess(
  stripeSubscriptionId: string
): Promise<void> {
  const supabase = getClient();
  await supabase
    .from("user_access")
    .update({ revoked_at: new Date().toISOString() })
    .eq("stripe_subscription_id", stripeSubscriptionId);
}

export async function getAllUserAccess(
  customerId: string
): Promise<UserAccess[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("user_access")
    .select("*")
    .eq("customer_id", customerId)
    .is("revoked_at", null);
  return data ?? [];
}
