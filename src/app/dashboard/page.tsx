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
    if (cached) {
      setSessionState(cached);
      setLoading(false);
      return;
    }

    // No session in storage — try to restore from cookie via verify
    fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.customerId) {
          const restored: PlaybookSession = {
            customerId: data.customerId,
            email: data.email,
            name: data.name,
            access: data.access || [],
            serviceOrders: data.serviceOrders || [],
            purchaseHistory: data.purchaseHistory || [],
            subscriptionStatus: data.subscriptionStatus || null,
            subscriptionInterval: data.subscriptionInterval || null,
            trialEndsAt: data.trialEndsAt || null,
            currentPeriodEnd: data.currentPeriodEnd || null,
          };
          setSession(restored);
          setSessionState(restored);
        } else {
          router.replace("/login");
        }
      })
      .catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
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
