"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/portal/Dashboard";
import { getSession, setSession, clearSession } from "@/lib/session";
import type { PlaybookSession } from "@/lib/session";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSessionState] = useState<PlaybookSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getSession();

    // Show cached data instantly — no loading flash for returning users
    if (cached) {
      setSessionState(cached);
      setLoading(false);
    }

    // Always re-verify against DB to get fresh subscription/access data
    fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.customerId) {
          const fresh: PlaybookSession = {
            customerId: data.customerId,
            email: data.email,
            name: data.name,
            company: data.company ?? null,
            jobTitle: data.jobTitle ?? null,
            country: data.country ?? null,
            phone: data.phone ?? null,
            memberSince: data.memberSince ?? null,
            access: data.access || [],
            serviceOrders: data.serviceOrders || [],
            purchaseHistory: data.purchaseHistory || [],
            subscriptionStatus: data.subscriptionStatus || null,
            subscriptionInterval: data.subscriptionInterval || null,
            trialEndsAt: data.trialEndsAt || null,
            currentPeriodEnd: data.currentPeriodEnd || null,
          };
          setSession(fresh);
          setSessionState(fresh);
        } else {
          // JWT expired or access revoked — boot them out
          clearSession();
          router.replace("/login");
        }
      })
      .catch(() => {
        // On network error: keep cached data if available, otherwise redirect
        if (!cached) router.replace("/login");
      })
      .finally(() => {
        if (!cached) setLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return <Dashboard session={session} onLogout={handleLogout} />;
}
