import { createClient } from "@supabase/supabase-js";
import type { AccessSource, UserAccess } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUserAccess(row: any): UserAccess {
  return {
    id: row.id,
    customer_id: row.customer_id,
    granted_by_product_id: row.granted_by_product_id,
    product_slug: row.products?.slug ?? "",
    product_name: row.products?.name ?? "",
    product_access_type: row.products?.access_type ?? null,
    access_type: row.access_type,
    source: row.source ?? null,
    expires_at: row.expires_at ?? null,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function grantUserAccess(params: {
  customerId: string;
  productId: string;
  accessType: AccessSource;
  expiresAt?: string | null;
  source?: string | null;
}): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("user_access").upsert(
    {
      customer_id: params.customerId,
      granted_by_product_id: params.productId,
      access_type: params.accessType,
      expires_at: params.expiresAt ?? null,
      source: params.source ?? null,
      is_active: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "customer_id,granted_by_product_id" }
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
    .select("*, products:granted_by_product_id!inner(slug, name)")
    .eq("customer_id", customerId)
    .eq("is_active", true)
    .eq("products.slug", productSlug)
    .maybeSingle();
  if (!data) return null;
  return mapUserAccess(data);
}

export async function revokeSubscriptionAccess(
  stripeSubscriptionId: string
): Promise<void> {
  const supabase = getClient();
  await supabase
    .from("user_access")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("source", stripeSubscriptionId);
}

export async function getAllUserAccess(
  customerId: string
): Promise<UserAccess[]> {
  const supabase = getClient();
  const { data } = await supabase
    .from("user_access")
    .select("*, products:granted_by_product_id(slug, name, access_type)")
    .eq("customer_id", customerId)
    .eq("is_active", true);
  return (data ?? []).map(mapUserAccess);
}
