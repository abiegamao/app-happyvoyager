"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Lock,
  ArrowRight,
  LogOut,
  Sparkles,
  Clock,
  Bell,
  Plane,
  CreditCard,
  FileText,
} from "lucide-react";
import { clearSession } from "@/lib/session";
import type {
  PlaybookSession,

  ServiceOrderEntry,
  PurchaseHistoryEntry,
} from "@/lib/session";
import { PLAYBOOKS, WAITLIST_PLAYBOOKS, COMING_SOON } from "@/data/playbooks";
import type { PlaybookConfig } from "@/data/playbooks/types";
import WaitlistCardButton from "./WaitlistCardButton";

const SERVICE_ORDER_STATUS: Record<string, { label: string; color: string }> = {
  pending:     { label: "Received",    color: "#c9a84c" },
  in_progress: { label: "In Progress", color: "#6b8cba" },
  completed:   { label: "Completed",   color: "#8fa38d" },
  cancelled:   { label: "Cancelled",   color: "#d83a52" },
};

interface DashboardProps {
  session: PlaybookSession;
  onLogout: () => void;
}

type DashboardTab = "overview" | "playbooks" | "services" | "history";

export default function Dashboard({ session, onLogout }: DashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  useEffect(() => { setMounted(true); }, []);

  const firstName = session.name?.split(" ")[0] || "Voyager";

  // Access derived from session (new shape)
  const playbookSlugs = new Set(PLAYBOOKS.map((p) => p.slug));
  const playbookAccess = session.access.find((a) => playbookSlugs.has(a.productSlug)) ?? null;

  const hasSubscription =
    session.subscriptionStatus != null &&
    ["active", "trialing", "past_due"].includes(session.subscriptionStatus);
  // Subscription itself = playbook access, even if user_access table not yet populated by webhook
  const hasOwnedPlaybook = Boolean(playbookAccess) || hasSubscription;
  const hasServices = session.serviceOrders.length > 0;
  const hasHistory = session.purchaseHistory.length > 0;

  const tabItems: Array<{ key: DashboardTab; label: string; count?: number }> = useMemo(
    () => [
      { key: "overview",  label: "Overview"  },
      { key: "playbooks", label: "Playbooks" },
      ...(hasServices ? [{ key: "services" as const, label: "Services", count: session.serviceOrders.length }] : []),
      ...(hasHistory  ? [{ key: "history"  as const, label: "History",  count: session.purchaseHistory.length }] : []),
    ],
    [hasHistory, hasServices, session.serviceOrders.length, session.purchaseHistory.length]
  );

  useEffect(() => {
    if (!tabItems.some((t) => t.key === activeTab)) setActiveTab("overview");
  }, [activeTab, tabItems]);

  const handleLogout = async () => {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    clearSession();
    onLogout();
  };

  const handleManageSubscription = async () => {
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Failed to open billing portal:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#f9f5f2]">
      <header className="sticky top-0 z-20 border-b border-[#e7ddd3] bg-[#f9f5f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/" className="inline-block group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt="Happy Voyager"
                className="w-[132px] sm:w-[140px] h-auto group-hover:opacity-80 transition-opacity"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              {hasSubscription && (
                <button
                  onClick={handleManageSubscription}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#e7ddd3] bg-white text-[12px] sm:text-[13px] text-[#787774] hover:text-[#3a3a3a] hover:border-[#d8ccbf] transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Manage Subscription</span>
                  <span className="sm:hidden">Billing</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#e7ddd3] bg-white text-[12px] sm:text-[13px] text-[#787774] hover:text-[#3a3a3a] hover:border-[#d8ccbf] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Plane className="w-4 h-4 text-[#e3a99c]" />
              <span className="text-[12px] font-semibold text-[#e3a99c] uppercase tracking-wide">
                Playbook Portal
              </span>
            </div>
            <h1 className="text-[27px] md:text-[32px] font-bold text-[#3a3a3a] tracking-tight leading-tight">
              Welcome back, {firstName}!
            </h1>
            <p className="text-[14px] text-[#787774] mt-1">
              Here&apos;s everything in your travel toolkit.
            </p>
          </div>

          <nav className="mt-4 pt-3 border-t border-[#eee5dc]" aria-label="Dashboard sections">
            <div className="inline-flex gap-1 p-1 rounded-xl bg-white border border-[#e7ddd3] w-full md:w-auto overflow-x-auto">
              {tabItems.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  aria-pressed={activeTab === tab.key}
                  className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[12px] sm:text-[13px] font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-[#3a3a3a] text-white shadow-sm"
                      : "text-[#787774] hover:text-[#3a3a3a] hover:bg-[#f9f5f2]"
                  }`}
                >
                  {tab.label}
                  {tab.count != null && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20 text-white" : "bg-[#f2d6c9] text-[#8f6a62]"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {activeTab === "overview" && (
          <div className={`space-y-10 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {hasOwnedPlaybook && (
              <section>
                <SectionHeader title="Your Playbooks" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {PLAYBOOKS.map((config) => (
                    <OwnedPlaybookCard key={config.slug} config={config} session={session} />
                  ))}
                </div>
              </section>
            )}

            {hasServices && (
              <section>
                <SectionHeader title="Your Services" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {session.serviceOrders.map((order) => (
                    <OwnedServiceCard key={order.id} order={order} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <SectionHeader title={hasOwnedPlaybook ? "Explore More" : "Start Your Journey"} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {!hasOwnedPlaybook && PLAYBOOKS.map((p) => <AvailableCard key={p.slug} playbook={p} />)}
                {WAITLIST_PLAYBOOKS.slice(0, hasOwnedPlaybook ? 2 : 1).map((p) => (
                  <WaitlistCard key={p.slug} playbook={p} />
                ))}
                {COMING_SOON.slice(0, 2).map((item) => <ComingSoonCard key={item.title} item={item} />)}
              </div>
            </section>

            {hasHistory && (
              <section>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <SectionHeader title="Recent Purchases" className="mb-0" />
                  <button type="button" onClick={() => setActiveTab("history")} className="text-[12px] font-semibold text-[#e3a99c] hover:text-[#d69586] transition-colors">
                    View all
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden">
                  {session.purchaseHistory.slice(0, 3).map((purchase, i, arr) => (
                    <PurchaseRow key={`${purchase.productSlug}-${purchase.purchasedAt}`} purchase={purchase} isLast={i === arr.length - 1} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === "playbooks" && (
          <div className={`space-y-10 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {hasOwnedPlaybook ? (
              <section>
                <SectionHeader title="Your Playbooks" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {PLAYBOOKS.map((config) => (
                    <OwnedPlaybookCard key={config.slug} config={config} session={session} />
                  ))}
                </div>
              </section>
            ) : (
              <section className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
                <p className="text-[14px] text-[#6b6b6b]">
                  You don&apos;t have an active playbook yet. Start with a 14-day free trial.
                </p>
              </section>
            )}

            <section>
              <SectionHeader title={hasOwnedPlaybook ? "Expand Your Toolkit" : "Start Your Journey"} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {!hasOwnedPlaybook && PLAYBOOKS.map((p) => <AvailableCard key={p.slug} playbook={p} />)}
                {WAITLIST_PLAYBOOKS.map((p) => <WaitlistCard key={p.slug} playbook={p} />)}
                {COMING_SOON.map((item) => <ComingSoonCard key={item.title} item={item} />)}
              </div>
            </section>
          </div>
        )}

        {activeTab === "services" && (
          <section className={`transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {hasServices ? (
              <>
                <SectionHeader title="Your Services" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {session.serviceOrders.map((order) => (
                    <OwnedServiceCard key={order.id} order={order} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
                <p className="text-[14px] text-[#6b6b6b]">No service orders yet.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === "history" && (
          <section className={`transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {hasHistory ? (
              <>
                <SectionHeader title="Purchase History" />
                <div className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden">
                  {session.purchaseHistory.map((purchase, i) => (
                    <PurchaseRow
                      key={`${purchase.productSlug}-${purchase.purchasedAt}`}
                      purchase={purchase}
                      isLast={i === session.purchaseHistory.length - 1}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white border border-[#e7ddd3] rounded-2xl p-5">
                <p className="text-[14px] text-[#6b6b6b]">No purchases yet.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────

function SectionHeader({ title, className = "mb-4" }: { title: string; className?: string }) {
  return (
    <h2 className={`text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] ${className}`}>
      {title}
    </h2>
  );
}

function getStatusLabel(session: PlaybookSession): string {
  if (session.subscriptionStatus === "trialing") return "Free Trial";
  if (session.subscriptionStatus === "canceled")  return "Canceling";
  if (session.subscriptionStatus === "active")    return "Active";
  return "Active";
}

function getStatusColor(session: PlaybookSession): string {
  if (session.subscriptionStatus === "trialing") return "#c9a84c";
  if (session.subscriptionStatus === "canceled") return "#d83a52";
  return "#8fa38d";
}

function getStatusDetail(session: PlaybookSession): string | null {
  if (session.subscriptionStatus === "trialing" && session.trialEndsAt) {
    const trialEnd = new Date(session.trialEndsAt);
    const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000));
    return `Trial ends ${trialEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })} (${daysLeft} day${daysLeft !== 1 ? "s" : ""} left)`;
  }
  if (session.currentPeriodEnd) {
    const end = new Date(session.currentPeriodEnd);
    if (session.subscriptionStatus === "active") {
      return `Renews ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
  }
  return null;
}

function OwnedPlaybookCard({
  config,
  session,
}: {
  config: PlaybookConfig;
  session: PlaybookSession;
}) {
  const statusLabel = getStatusLabel(session);
  const statusColor = getStatusColor(session);
  const detailText = getStatusDetail(session);

  return (
    <Link
      href={`/playbook/${config.slug}/home`}
      className="group block bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden hover:border-[#e3a99c] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {config.catalog.coverImage && (
        <div className="h-40 overflow-hidden bg-[#f2d6c9]/30">
          <Image
            src={config.catalog.coverImage}
            alt={config.heroTitle}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{config.catalog.emoji}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ color: statusColor, backgroundColor: `${statusColor}20` }}
          >
            {statusLabel}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-[#3a3a3a] mb-1 group-hover:text-[#e3a99c] transition-colors">
          {config.heroTitle}
        </h3>
        <p className="text-[13px] text-[#787774] line-clamp-2 mb-1">{config.catalog.tagline}</p>
        {detailText && <p className="text-[11px] text-[#b0a89e] mb-3">{detailText}</p>}
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#e3a99c]">
          <BookOpen className="w-4 h-4" />
          Continue Learning
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function OwnedServiceCard({ order }: { order: ServiceOrderEntry }) {
  const meta = SERVICE_ORDER_STATUS[order.status] ?? { label: order.status, color: "#b0a89e" };

  return (
    <div className="bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#e7ddd3]/50">
            <FileText className="w-5 h-5 text-[#787774]" />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ color: meta.color, backgroundColor: `${meta.color}20` }}
          >
            {meta.label}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-[#3a3a3a] mb-1">{order.productName}</h3>
        <p className="text-[11px] text-[#b0a89e]">
          Ordered {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}

function AvailableCard({ playbook }: { playbook: PlaybookConfig }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e3a99c]/30 overflow-hidden hover:shadow-md hover:border-[#e3a99c]/60 transition-all group">
      {playbook.catalog.coverImage && (
        <div className="h-32 overflow-hidden bg-[#f2d6c9]/20 relative">
          <Image
            src={playbook.catalog.coverImage}
            alt={playbook.heroTitle}
            width={600}
            height={300}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
          <div className="absolute top-2 right-2 bg-[#e3a99c] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
            14-day free trial
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{playbook.catalog.emoji}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#e3a99c] bg-[#e3a99c]/10 px-2 py-0.5 rounded-full">
            Try Free
          </span>
        </div>
        <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{playbook.heroTitle}</h3>
        <p className="text-[12px] text-[#787774] line-clamp-2 mb-3">{playbook.catalog.description}</p>
        <Link
          href="/checkout?plan=playbook-monthly"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#e3a99c] hover:bg-[#d69586] px-4 py-2 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Start Free Trial
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

function WaitlistCard({ playbook }: { playbook: PlaybookConfig }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e7ddd3] p-4 hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{playbook.catalog.emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">
          <Bell className="w-3 h-3 inline mr-0.5" />
          Waitlist
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{playbook.heroTitle}</h3>
      <p className="text-[12px] text-[#787774] line-clamp-2 mb-3">{playbook.catalog.tagline}</p>
      <WaitlistCardButton playbook={playbook} />
    </div>
  );
}

function ComingSoonCard({ item }: { item: { emoji: string; title: string; tagline: string; accent: string; bg: string } }) {
  return (
    <div className="bg-white/60 rounded-2xl border border-dashed border-[#e7ddd3] p-4 opacity-70">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{item.emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#b0a89e] bg-[#e7ddd3]/50 px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3 inline mr-0.5" />
          Coming Soon
        </span>
      </div>
      <h3 className="text-[15px] font-bold text-[#3a3a3a] mb-1">{item.title}</h3>
      <p className="text-[12px] text-[#787774] line-clamp-2">{item.tagline}</p>
      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#b0a89e]">
        <Clock className="w-3.5 h-3.5" />
        We&apos;ll let you know when it&apos;s ready
      </div>
    </div>
  );
}

function PurchaseRow({ purchase, isLast }: { purchase: PurchaseHistoryEntry; isLast: boolean }) {
  const symbol = purchase.currency?.toUpperCase() === "EUR" ? "€" : purchase.currency?.toUpperCase() ?? "";
  const amount = purchase.amount != null ? `${symbol}${purchase.amount}` : null;

  return (
    <div className={`flex items-center justify-between px-5 py-4 ${!isLast ? "border-b border-[#e7ddd3]" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#f2d6c9]/50 flex items-center justify-center flex-shrink-0">
          <CreditCard className="w-4 h-4 text-[#e3a99c]" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#3a3a3a]">{purchase.productName}</p>
          <p className="text-[12px] text-[#b0a89e]">
            {new Date(purchase.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
      {amount && <span className="text-[14px] font-semibold text-[#3a3a3a]">{amount}</span>}
    </div>
  );
}
