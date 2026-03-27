"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PortalLogin from "@/components/portal/PortalLogin";
import type { PlaybookSession } from "@/lib/session";
import { getSession } from "@/lib/session";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const plan = searchParams.get("plan");
  const interval = searchParams.get("interval");
  const purchaseIntent = plan ? { slug: plan, interval } : undefined;

  // If already logged in (session in sessionStorage), redirect
  useEffect(() => {
    const session = getSession();
    if (session) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLoginSuccess = (session: PlaybookSession) => {
    void session; // session already saved by PortalLogin
    router.push("/dashboard");
  };

  return (
    <PortalLogin
      onLoginSuccess={handleLoginSuccess}
      purchaseIntent={purchaseIntent ?? undefined}
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
