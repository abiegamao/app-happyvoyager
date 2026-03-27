"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

function SetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/customer/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, token }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to set password. The link may have expired.");
      setLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}
    >
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="w-[140px] h-auto mx-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 p-8 shadow-xl shadow-[#e3a99c]/10">
          {done ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-[#8fa38d] mx-auto mb-4" />
              <h2 className="text-[20px] font-bold text-[#3a3a3a] mb-2">Password set!</h2>
              <p className="text-[14px] text-[#787774]">Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <>
              <h2 className="text-[22px] font-bold text-[#3a3a3a] mb-1">Set your password</h2>
              <p className="text-[13px] text-[#787774] mb-6">
                {email ? (
                  <>Setting password for <span className="font-semibold text-[#3a3a3a]">{email}</span></>
                ) : (
                  "Create a password for your account."
                )}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      minLength={8}
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d3d1cb] hover:text-[#787774] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#fdf2f2] border border-[#f5c6cc]">
                    <AlertCircle className="w-4 h-4 text-[#d83a52] flex-shrink-0 mt-0.5" />
                    <p className="text-[13px] text-[#d83a52]">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !token || !email}
                  className="w-full py-3.5 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] active:scale-[0.98] shadow-lg shadow-[#3a3a3a]/20"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                      Setting password...
                    </>
                  ) : (
                    "Set password & log in"
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-[12px] text-[#b0a89e]">
                Link expired?{" "}
                <Link href="/login" className="text-[#e3a99c] hover:underline font-semibold">
                  Request a new one
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9f5f2] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#e3a99c]/30 border-t-[#e3a99c] rounded-full animate-spin" />
        </div>
      }
    >
      <SetPasswordContent />
    </Suspense>
  );
}
