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
  access_type: string | null;   // e.g. "playbook"
  duration_days: number | null; // null = lifetime access
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  customer_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string | null;
  product_id: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  trial_ends_at: string | null;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

// Reflects actual DB columns + product slug/name populated via join
export interface UserAccess {
  id: string;
  customer_id: string;
  granted_by_product_id: string;
  product_slug: string;         // joined from products
  product_name: string;         // joined from products
  product_access_type: string | null; // joined from products.access_type e.g. "playbook"
  access_type: AccessSource;
  source: string | null;        // stores stripe_subscription_id when applicable
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  customer_id: string;
  product_id: string;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  purchase_type: string | null;
  purchased_at: string;
}

export interface ServiceOrder {
  id: string;
  customer_id: string;
  product_id: string;
  product_slug: string;    // joined from products
  product_name: string;    // joined from products
  stripe_payment_intent_id: string | null;
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
