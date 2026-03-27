"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PortalLogin from "@/components/portal/PortalLogin";
import { getSession, setSession } from "@/lib/session";
import type { PlaybookSession } from "@/lib/session";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);

  const plan = searchParams.get("plan");
  const interval = searchParams.get("interval");

  // If already logged in, create checkout session directly
  useEffect(() => {
    const session = getSession();
    if (session && plan) {
      setRedirecting(true);
      fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: plan }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            setRedirecting(false);
          }
        })
        .catch(() => setRedirecting(false));
    }
  }, [plan]);

  const handleLoginSuccess = (session: PlaybookSession) => {
    setSession(session);
    // After login, the PortalLogin will already redirect to Stripe via purchaseIntent
    // If no plan, go to dashboard
    if (!plan) router.push("/dashboard");
  };

  if (redirecting) {
    return (
      <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#787774]">Preparing checkout...</p>
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
