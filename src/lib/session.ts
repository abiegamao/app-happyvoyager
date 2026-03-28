"use client";

const SESSION_KEY = "playbook_session";

export interface UserAccessEntry {
  productSlug: string;
  productName: string;
  productAccessType: string | null; // e.g. "playbook" — what the product grants access to
  accessSource: string;
  expiresAt: string | null;
}

export interface ServiceOrderEntry {
  id: string;
  productSlug: string;
  productName: string;
  status: string;
  createdAt: string;
}

export interface PurchaseHistoryEntry {
  productSlug: string;
  productName: string;
  amount: number | null;
  currency: string;
  purchasedAt: string;
  purchaseType: string | null;
}

export interface PlaybookSession {
  customerId: string;
  email: string;
  name: string | null;
  company: string | null;
  jobTitle: string | null;
  country: string | null;
  phone: string | null;
  memberSince: string | null;
  access: UserAccessEntry[];
  serviceOrders: ServiceOrderEntry[];
  purchaseHistory: PurchaseHistoryEntry[];
  subscriptionStatus: string | null;
  subscriptionInterval: string | null;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
}

export function getSession(): PlaybookSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlaybookSession;
  } catch {
    return null;
  }
}

export function setSession(session: PlaybookSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function hasAccessTo(session: PlaybookSession | null, slug: string): boolean {
  if (!session) return false;
  return session.access.some((a) => a.productSlug === slug);
}
