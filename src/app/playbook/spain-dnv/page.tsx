"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";

/**
 * Spain DNV gate — redirect authenticated users to the playbook home,
 * send everyone else to login with a purchase intent.
 */
export default function SpainDnvGatePage() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session) {
      router.replace("/playbook/spain-dnv/home");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
    </div>
  );
}
