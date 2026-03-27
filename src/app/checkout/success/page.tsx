"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "needs_password" | "error">("loading");
  const [productName, setProductName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/dashboard");
      return;
    }

    fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.hasAccess) {
          setStatus("error");
          return;
        }
        setProductName(data.productName || "your purchase");
        setEmail(data.email || "");
        if (data.needsPassword) {
          setStatus("needs_password");
        } else {
          setStatus("success");
          // Redirect to dashboard after a short delay
          setTimeout(() => router.push("/dashboard"), 3000);
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#787774]">Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-[#3a3a3a] mb-3">Something went wrong</h1>
          <p className="text-[#787774] mb-6">We couldn&apos;t confirm your purchase. Please contact hello@happyvoyager.com with your order details.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3a3a3a] text-white rounded-xl font-semibold hover:bg-[#2a2a2a] transition-colors">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (status === "needs_password") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}>
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-[#8fa38d] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#3a3a3a] mb-2">Purchase confirmed! 🎉</h1>
          <p className="text-[#787774] mb-2">
            Thank you for getting <strong>{productName}</strong>.
          </p>
          <div className="bg-white/80 rounded-2xl border border-[#e7ddd3] p-6 mb-6">
            <p className="text-sm text-[#6b6b6b] leading-relaxed">
              We sent a <strong>set-password email</strong> to <span className="text-[#3a3a3a] font-semibold">{email}</span>.<br />
              Click the link in the email to set your password and access your playbook.
            </p>
          </div>
          <p className="text-xs text-[#b0a89e]">Already set your password?</p>
          <Link href="/login" className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-[#e3a99c] hover:text-[#d69586] transition-colors">
            Log in here <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}>
      <div className="text-center max-w-md">
        <CheckCircle2 className="w-16 h-16 text-[#8fa38d] mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[#3a3a3a] mb-2">You&apos;re in! 🎉</h1>
        <p className="text-[#787774] mb-6">
          <strong>{productName}</strong> is now in your account. Redirecting you to your dashboard...
        </p>
        <div className="w-6 h-6 border-3 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin mx-auto mb-6" />
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[#e3a99c] hover:text-[#d69586] transition-colors">
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
