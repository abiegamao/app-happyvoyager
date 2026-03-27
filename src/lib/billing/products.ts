import { createClient } from "@supabase/supabase-js";
import type { Product } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export async function getProductByStripePriceId(
  priceId: string
): Promise<Product | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("stripe_prices")
    .select("product_id, products(*)")
    .eq("stripe_price_id", priceId)
    .single();

  if (!data) return null;
  return (data as unknown as { products: Product }).products ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  return data ?? null;
}

export async function getStripePriceId(
  productId: string
): Promise<string | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("stripe_prices")
    .select("stripe_price_id")
    .eq("product_id", productId)
    .eq("active", true)
    .single();
  return data?.stripe_price_id ?? null;
}

export function getAccessSource(product: Product) {
  return product.type === "subscription" ? "subscription" : "one_time_purchase";
}
