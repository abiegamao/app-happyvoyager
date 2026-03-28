import { createClient } from "@supabase/supabase-js";
import type { Subscription, SubscriptionStatus } from "./types";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export async function upsertSubscription(params: {
  customerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  productId: string;
  status: SubscriptionStatus;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  trialEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  interval?: string | null;
}): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("subscriptions").upsert(
    {
      customer_id: params.customerId,
      stripe_subscription_id: params.stripeSubscriptionId,
      stripe_price_id: params.stripePriceId,
      product_id: params.productId,
      status: params.status,
      current_period_start: params.currentPeriodStart ?? null,
      current_period_end: params.currentPeriodEnd ?? null,
      trial_end: params.trialEnd ?? null,
      cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
      interval: params.interval ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );
  if (error) {
    throw new Error(`upsertSubscription failed: ${error.message} (code: ${error.code})`);
  }
}

export async function updateSubscriptionStatus(
  stripeSubscriptionId: string,
  status: SubscriptionStatus,
  extra?: Partial<Subscription>
): Promise<void> {
  const supabase = getClient();
  await supabase
    .from("subscriptions")
    .update({ status, ...extra, updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", stripeSubscriptionId);
}

export async function cancelSubscription(
  stripeSubscriptionId: string
): Promise<void> {
  const supabase = getClient();
  await supabase
    .from("subscriptions")
    .update({ status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", stripeSubscriptionId);
}

export async function getSubscriptionByStripeId(
  stripeSubscriptionId: string
): Promise<Subscription | null> {
  const supabase = getClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("stripe_subscription_id", stripeSubscriptionId)
    .single();
  return data ?? null;
}
