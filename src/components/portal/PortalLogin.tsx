"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Shield,
  Clock,
  Star,
  Plane,
  Eye,
  EyeOff,
  Mail,
  Globe,
  BookOpen,
  Sun,
  Navigation,
  GraduationCap,
  Award,
  CheckCircle2,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { setSession } from "@/lib/session";
import type { PlaybookSession } from "@/lib/session";

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || "https://happyvoyager.com";

const JOURNEY_STEPS = [
  { icon: Globe, title: "Schengen First", tagline: "Get into Europe before applying for the DNV", status: "soon" as const },
  { icon: BookOpen, title: "Spain DNV Playbook", tagline: "DNV application to Spanish citizenship", status: "available" as const },
  { icon: Sun, title: "Soft Landing", tagline: "Life in Spain, from day one", status: "soon" as const },
  { icon: Navigation, title: "Visa Runner", tagline: "90/180 decoded — travel freely", status: "soon" as const },
  { icon: GraduationCap, title: "DELE A2", tagline: "Pass the exam on the citizenship track", status: "soon" as const },
  { icon: Award, title: "Spanish Passport", tagline: "Residency to EU passport, step by step", status: "soon" as const },
];

interface PortalLoginProps {
  onLoginSuccess: (session: PlaybookSession) => void;
  purchaseIntent?: { slug: string; interval?: string | null };
}

export default function PortalLogin({ onLoginSuccess, purchaseIntent }: PortalLoginProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // If there's a purchase intent, default to signup
  useEffect(() => {
    if (purchaseIntent) setMode("signup");
  }, [purchaseIntent]);

  const fetchSessionAndLogin = async (userEmail: string, userName?: string | null, customerId?: string) => {
    const res = await fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();

    const session: PlaybookSession = {
      customerId: customerId || data.customerId || "",
      email: userEmail,
      name: userName || data.name || null,
      company: data.company || null,
      jobTitle: data.jobTitle || null,
      country: data.country || null,
      phone: data.phone || null,
      memberSince: data.memberSince || null,
      access: data.access || [],
      serviceOrders: data.serviceOrders || [],
      purchaseHistory: data.purchaseHistory || [],
      subscriptionStatus: data.subscriptionStatus || null,
      subscriptionInterval: data.subscriptionInterval || null,
      trialEndsAt: data.trialEndsAt || null,
      currentPeriodEnd: data.currentPeriodEnd || null,
    };
    setSession(session);

    // If there's a purchase intent, create a Stripe checkout session and redirect
    if (purchaseIntent) {
      const checkoutRes = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: purchaseIntent.slug }),
      });
      const checkoutData = await checkoutRes.json();
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
        return;
      }
      if (checkoutRes.status === 409 && checkoutData.error === "already_subscribed") {
        onLoginSuccess(session);
        return;
      }
      toast.error("Could not create checkout session. Please try again.");
      return;
    }

    onLoginSuccess(session);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/customer/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
    });
    const data = await res.json();

    if (!res.ok) {
      if (data.error === "no_password") {
        toast.error("No password set yet. Use 'Forgot password?' to receive a setup link.");
      } else {
        toast.error(data.error || "Invalid email or password. Please try again.");
      }
      setLoading(false);
      return;
    }

    await fetchSessionAndLogin(data.email, data.name, data.customerId);
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/customer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
        name: name.trim(),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to create account. Please try again.");
      setLoading(false);
      return;
    }

    await fetchSessionAndLogin(data.email, data.name, data.customerId);
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/auth/customer/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.toLowerCase().trim() }),
    });

    setSuccess("If an account exists for that email, you'll receive a password reset link shortly.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left: Dark Journey Panel ── */}
      <div className="lg:w-[45%] bg-[#2e2e2e] flex flex-col justify-center px-8 py-14 lg:px-14 lg:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#e3a99c]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#bbcccd]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <a href={LANDING_URL} className="inline-block mb-10 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Happy Voyager"
              className="w-[150px] h-auto brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </a>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e3a99c] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e3a99c]">
                Playbook Library
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-white mb-2 tracking-tight leading-snug">
              Your Spain Journey,<br />step by step.
            </h2>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Six playbooks. One path — from visa to EU passport.
            </p>
          </div>

          <div className="space-y-0">
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon;
              const isAvailable = step.status === "available";
              return (
                <div key={step.title}>
                  {isAvailable ? (
                    <div className="flex items-start gap-3.5 my-1">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#e3a99c] shadow-lg shadow-[#e3a99c]/25">
                          <Icon className="w-4.5 h-4.5 text-[#3a3a3a]" style={{ width: 18, height: 18 }} />
                        </div>
                        {i < JOURNEY_STEPS.length - 1 && (
                          <div className="w-px h-5 bg-gradient-to-b from-[#e3a99c]/40 to-white/5 my-1" />
                        )}
                      </div>
                      <div className="flex-1 bg-white/5 border border-[#e3a99c]/20 rounded-xl px-3.5 py-3 my-0.5">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[13px] font-bold text-white">{step.title}</h3>
                          <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-[#e3a99c]/15 text-[#e3a99c] border border-[#e3a99c]/25">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Live
                          </span>
                        </div>
                        <p className="text-[11px] text-white/60 leading-relaxed">{step.tagline}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3.5">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/8">
                          <Icon className="w-4 h-4 text-white/25" />
                        </div>
                        {i < JOURNEY_STEPS.length - 1 && (
                          <div className="w-px h-5 bg-white/8 my-1" />
                        )}
                      </div>
                      <div className="pt-2.5 pb-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-[13px] font-semibold text-white/45">{step.title}</h3>
                          <span className="text-[8px] font-medium text-white/20 uppercase tracking-wider">Soon</span>
                        </div>
                        <p className="text-[11px] text-white/30">{step.tagline}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
            <div className="flex gap-6">
              {[
                { icon: BookOpen, value: "6", label: "Playbooks" },
                { icon: Layers, value: "100+", label: "Lessons" },
              ].map(({ icon: StatIcon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <StatIcon className="w-3.5 h-3.5 text-white/25" />
                  <div>
                    <span className="text-[15px] font-bold text-white">{value}</span>
                    <span className="text-[11px] text-white/35 ml-1">{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/playbook"
              className="flex items-center gap-1 text-[12px] text-white/35 hover:text-[#e3a99c] transition-colors group"
            >
              Browse
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right: Auth Form ── */}
      <div
        className="lg:w-[55%] flex items-center justify-center px-6 py-14 lg:px-16 lg:py-16 relative"
        style={{ background: "linear-gradient(160deg, #f9f5f2 0%, #f2d6c9 50%, #e7ddd3 100%)" }}
      >
        <div className="w-full max-w-[420px]">
          {purchaseIntent && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[#e3a99c]/10 border border-[#e3a99c]/30 text-center">
              <p className="text-[13px] text-[#3a3a3a] font-semibold">
                Create a free account to start your trial
              </p>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 p-8 shadow-xl shadow-[#e3a99c]/10">
            {mode !== "forgot" && (
              <div className="flex gap-1 bg-[#f9f5f2]/80 rounded-lg p-1 mb-6">
                <button
                  onClick={() => { setMode("login"); setSuccess(""); }}
                  className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
                    mode === "login" ? "bg-white text-[#3a3a3a] shadow-sm" : "text-[#b0a89e] hover:text-[#787774]"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => { setMode("signup"); setSuccess(""); }}
                  className={`flex-1 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
                    mode === "signup" ? "bg-white text-[#3a3a3a] shadow-sm" : "text-[#b0a89e] hover:text-[#787774]"
                  }`}
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {mode === "signup" && !purchaseIntent && (
              <p className="text-[12px] text-[#787774] text-center -mt-3 mb-5">
                Free to sign up ~ start a 14-day trial of any playbook
              </p>
            )}

            {mode === "forgot" && (
              <div className="mb-6">
                <button
                  onClick={() => { setMode("login"); setSuccess(""); }}
                  className="text-[13px] text-[#787774] hover:text-[#3a3a3a] transition-colors mb-4"
                >
                Back to login
                </button>
                <h3 className="text-[20px] font-bold text-[#3a3a3a]">Reset password</h3>
                <p className="text-[13px] text-[#787774] mt-1">
                  We&apos;ll send you a link to reset your password.
                </p>
              </div>
            )}

            <form
              onSubmit={
                mode === "login" ? handleLogin
                : mode === "signup" ? handleSignup
                : handleForgotPassword
              }
              className="space-y-4"
            >
              {mode === "signup" && (
                <div>
                  <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abie"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[12px] font-semibold text-[#787774] mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-[15px] text-[#3a3a3a] placeholder-[#d3d1cb] focus:outline-none focus:border-[#e3a99c] focus:ring-2 focus:ring-[#e3a99c]/20 transition-all pr-10"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d3d1cb]" />
                </div>
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] font-semibold text-[#787774] uppercase tracking-wide">
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => { setMode("forgot"); setSuccess(""); }}
                        className="text-[11px] text-[#e3a99c] hover:text-[#d69586] font-semibold transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === "signup" ? "Min 8 characters" : "••••••••"}
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
              )}

              {success && (
                <div className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#f0f9f4] border border-[#b5dfc5]">
                  <Mail className="w-4 h-4 text-[#8fa38d] flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#3a7a52]">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed bg-[#3a3a3a] text-white hover:bg-[#2a2a2a] active:scale-[0.98] shadow-lg shadow-[#3a3a3a]/20"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
                    {mode === "forgot" ? "Sending..." : mode === "signup" ? "Creating account..." : "Logging in..."}
                  </>
                ) : (
                  <>
                    {mode === "forgot" ? "Send reset link" : mode === "signup" ? "Create free account" : "Log in"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-[13px] text-[#787774] text-center">
            Sign up is free ~ try the playbook with a{" "}
            <a href={`${LANDING_URL}/#pricing`} className="text-[#e3a99c] font-semibold hover:underline">
              14-day free trial →
            </a>
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            {[
              { icon: Shield, label: "Secure access" },
              { icon: Clock, label: "Instant unlock" },
              { icon: Star, label: "Lifetime updates" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[12px] text-[#b0a89e]">
                <Icon className="w-3.5 h-3.5 text-[#e3a99c]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
