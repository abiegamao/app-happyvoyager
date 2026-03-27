export type ProductType = "subscription" | "one_time";
export type ProductCategory = "access" | "service";
export type AccessSource = "subscription" | "one_time_purchase" | "manual_grant";
export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";
export type ServiceOrderStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  category: ProductCategory;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  stripe_subscription_id: string;
  stripe_price_id: string;
  product_id: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  trial_end: string | null;
  cancel_at_period_end: boolean;
  interval: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAccess {
  id: string;
  customer_id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  access_source: AccessSource;
  granted_at: string;
  expires_at: string | null;
  revoked_at: string | null;
  stripe_subscription_id: string | null;
}

export interface Purchase {
  id: string;
  customer_id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  amount: number;
  currency: string;
  purchased_at: string;
}

export interface ServiceOrder {
  id: string;
  customer_id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  stripe_session_id: string | null;
  status: ServiceOrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccessCheckResult {
  hasAccess: boolean;
  accessSource: AccessSource | null;
  expiresAt: string | null;
  subscriptionStatus: SubscriptionStatus | null;
}
