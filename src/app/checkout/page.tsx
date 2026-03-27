"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PortalLogin from "@/components/portal/PortalLogin";
import { getSession, setSession } from "@/lib/session";
import type { PlaybookSession } from "@/lib/session";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan");
  const interval = searchParams.get("interval");

  const [status, setStatus] = useState<"loading" | "redirecting" | "show_login">("loading");

  useEffect(() => {
    async function init() {
      // 1. Try sessionStorage first (fast path)
      let session = getSession();

      // 2. If no session, try to restore from JWT cookie via verify API
      if (!session) {
        try {
          const res = await fetch("/api/stripe/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          });
          const data = await res.json();
          if (data.customerId) {
            session = {
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
            setSession(session);
          }
        } catch {
          // Not logged in
        }
      }

      // 3. If still no session, show login form
      if (!session) {
        setStatus("show_login");
        return;
      }

      // 4. Logged in — go straight to Stripe checkout if there's a plan
      if (plan) {
        setStatus("redirecting");
        try {
          const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: plan }),
          });
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url;
            return;
          }
          if (!res.ok) {
            console.error("Checkout API error:", data);
          }
        } catch (err) {
          console.error("Checkout fetch error:", err);
        }
        setStatus("show_login");
      } else {
        // No plan — just go to dashboard
        router.replace("/dashboard");
      }
    }

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const handleLoginSuccess = (session: PlaybookSession) => {
    setSession(session);
    // After login, PortalLogin already redirects to Stripe when purchaseIntent is set
    if (!plan) router.push("/dashboard");
  };

  if (status === "loading" || status === "redirecting") {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#787774]">
            {status === "redirecting" ? "Preparing checkout..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <PortalLogin
      onLoginSuccess={handleLoginSuccess}
      purchaseIntent={plan ? { slug: plan, interval } : undefined}
    />
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
