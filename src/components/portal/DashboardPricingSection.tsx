"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star, Zap, ShieldCheck, Loader2, FileText } from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

const getPlaybookProPlan = (period: BillingPeriod) => ({
  name: "The Playbook Pro",
  description:
    "Start here ~ even if you're just exploring the visa. Get the full system so you know exactly what's ahead before you commit.",
  price: period === "monthly" ? "9" : "89",
  currency: "€",
  period: period === "monthly" ? "/mo" : "/yr",
  periodNote: period === "yearly" ? "That's ~€7.42/mo" : null,
  trialBadge: "14-day free trial",
  slug: period === "monthly" ? "playbook-monthly" : "playbook-yearly",
  features: [
    "14-day free trial ~ cancel anytime",
    "Complete step-by-step system",
    "Document templates & checklists",
    "Working UGE links & screenshots",
    "Apostille & translation guide",
    "AI guide ~ ask Abie anything, 24/7",
    "Full playbook library as it launches",
    "Self-paced, instant access",
  ],
  cta: "Start Free Trial",
  popular: false,
  color: "#bbcccd",
});

const accessPlans = [
  {
    name: "The Guided Navigator",
    description:
      "Expert eyes on your application before you submit. Perfect if you've already done the prep.",
    price: "199",
    originalPrice: "350",
    currency: "€",
    period: "one-time",
    slug: "guided-navigator",
    features: [
      "Everything in The Playbook Pro",
      "1-hour video consultation",
      "Full document review before submission",
      "Priority email support",
    ],
    cta: "Get the Guided Navigator",
    popular: false,
    color: "#e3a99c",
  },
  {
    name: "The VIP Concierge",
    description:
      "Skip the stress entirely ~ we handle everything from documents to appointments.",
    price: "599",
    originalPrice: "900",
    currency: "€",
    period: "one-time",
    slug: "vip-concierge",
    features: [
      "Everything in The Guided Navigator",
      "1on1 Strategy Calls & Chat Support",
      "Appointments Booked (NIE, DigiCert, TIE)",
      "Apostille & Translation Coordination",
      "Submission to UGE & Appeals",
      "Post-Approval Guide and Settling in Spain Survival Kit",
      "Bonus: Lifetime access to The Playbook Pro Library",
      "+ €149 / additional dependent",
    ],
    cta: "Apply for VIP Service",
    roiNote: "Most applicants spend 40–60 hrs figuring this out alone.",
    foundingNote: "Founding client spots available",
    popular: true,
    color: "#8fa38d",
  },
];

const serviceProducts = [
  {
    name: "NIE – Your Spanish Tax ID",
    description: "We handle your NIE application end-to-end so you can focus on the move.",
    price: "75",
    currency: "€",
    slug: "nie-spanish-tax-id",
    cta: "Get NIE Service",
    color: "#6b8cba",
    emoji: "🪪",
  },
  {
    name: "TIE – Physical Residency Card",
    description: "Your physical residency card appointment booked and guided by our team.",
    price: "75",
    currency: "€",
    slug: "tie-residency-card",
    cta: "Get TIE Service",
    color: "#6b8cba",
    emoji: "🏛️",
  },
  {
    name: "Regreso",
    description: "Re-entry permit so you can travel while your residency is being processed.",
    price: "75",
    currency: "€",
    slug: "regreso",
    cta: "Get Regreso Service",
    color: "#6b8cba",
    emoji: "✈️",
  },
  {
    name: "Schengen Visa for Filipino",
    description: "Full support for Filipino nationals applying for a Schengen visa.",
    price: "149",
    currency: "€",
    slug: "schengen-visa-filipino",
    cta: "Get Schengen Help",
    color: "#c9a84c",
    emoji: "🛂",
  },
];

interface Props {
  hasSubscription: boolean;
}

export default function DashboardPricingSection({ hasSubscription }: Props) {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  async function handleCheckout(slug: string) {
    if (loadingSlug) return;
    setLoadingSlug(slug);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (res.status === 409 && data.error === "already_subscribed") {
        router.replace("/dashboard");
        return;
      }
      console.error("Checkout error:", data);
    } catch (err) {
      console.error("Checkout fetch error:", err);
    } finally {
      setLoadingSlug(null);
    }
  }

  const playbookPro = getPlaybookProPlan(billingPeriod);

  return (
    <div className="space-y-10">

      {/* ── Subscription plans (hidden for active subscribers) ─────────────── */}
      {!hasSubscription && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-0.5">Playbook Access</p>
              <h2 className="text-[20px] font-bold text-[#3a3a3a]">Start your Spain DNV journey</h2>
            </div>
            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1.5 px-1.5 py-1.5 rounded-full bg-white border border-[#e7ddd3] shadow-sm self-start sm:self-auto">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                  billingPeriod === "monthly"
                    ? "bg-[#3a3a3a] text-white shadow-sm"
                    : "text-[#787774] hover:text-[#3a3a3a]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  billingPeriod === "yearly"
                    ? "bg-[#3a3a3a] text-white shadow-sm"
                    : "text-[#787774] hover:text-[#3a3a3a]"
                }`}
              >
                Yearly
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#e3a99c]/15 text-[#e3a99c]">
                  SAVE 17%
                </span>
              </button>
            </div>
          </div>

          {/* Playbook Pro + access upsells in 3-col grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 items-start">
            {/* Playbook Pro card */}
            <PricingCard
              plan={playbookPro}
              isSubscription
              loadingSlug={loadingSlug}
              onCheckout={handleCheckout}
            />
            {/* Guided Navigator & VIP Concierge */}
            {accessPlans.map((plan) => (
              <PricingCard
                key={plan.slug}
                plan={plan}
                loadingSlug={loadingSlug}
                onCheckout={handleCheckout}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Access upsells for existing subscribers ─────────────────────────── */}
      {hasSubscription && (
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-0.5">Expert Services</p>
            <h2 className="text-[20px] font-bold text-[#3a3a3a]">Take your application further</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 items-start">
            {accessPlans.map((plan) => (
              <PricingCard
                key={plan.slug}
                plan={plan}
                loadingSlug={loadingSlug}
                onCheckout={handleCheckout}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Document services (always visible) ──────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#b0a89e] mb-0.5">Document Services</p>
          <h2 className="text-[20px] font-bold text-[#3a3a3a]">We handle the paperwork</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceProducts.map((svc) => (
            <ServiceCard
              key={svc.slug}
              service={svc}
              loadingSlug={loadingSlug}
              onCheckout={handleCheckout}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Pricing card (subscription plans + access upsells) ────────────────────────

interface PricingCardProps {
  plan: {
    name: string;
    description: string;
    price: string;
    currency: string;
    period: string;
    slug: string;
    features: string[];
    cta: string;
    popular: boolean;
    color: string;
    originalPrice?: string;
    periodNote?: string | null;
    trialBadge?: string;
    roiNote?: string;
    foundingNote?: string;
  };
  isSubscription?: boolean;
  loadingSlug: string | null;
  onCheckout: (slug: string) => void;
}

function PricingCard({ plan, isSubscription, loadingSlug, onCheckout }: PricingCardProps) {
  const isLoading = loadingSlug === plan.slug;

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 ${
        plan.popular
          ? "bg-white shadow-xl border border-[#e3a99c] scale-[1.02]"
          : "bg-white border border-[#e7ddd3] hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3a3a3a] text-white text-[11px] font-bold shadow-md">
            <Star className="w-3 h-3 fill-[#e3a99c] text-[#e3a99c]" />
            Most Popular
          </div>
        </div>
      )}
      {isSubscription && plan.trialBadge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8fa38d] text-white text-[11px] font-bold shadow-md">
            <ShieldCheck className="w-3 h-3" />
            {plan.trialBadge}
          </div>
        </div>
      )}

      <div className="text-center mb-5 mt-2">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 bg-[#f9f5f2]">
          <Zap className="w-5 h-5" style={{ color: plan.color }} />
        </div>
        <h3 className="text-[16px] font-bold text-[#3a3a3a] mb-1">{plan.name}</h3>
        <p className="text-[12px] text-[#787774] min-h-[32px]">{plan.description}</p>
      </div>

      <div className="text-center mb-5 pb-5 border-b border-[#e7ddd3]">
        {plan.originalPrice && (
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[12px] text-[#aaaaaa] line-through">
              {plan.currency}{plan.originalPrice}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e3a99c]/15 text-[#e3a99c]">
              SAVE {plan.currency}{Number(plan.originalPrice) - Number(plan.price)}
            </span>
          </div>
        )}
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-[16px] text-[#6b6b6b] font-medium">{plan.currency}</span>
          <span className="text-[44px] font-bold text-[#3a3a3a] leading-none">{plan.price}</span>
        </div>
        <span className="text-[11px] text-[#e3a99c] font-semibold uppercase tracking-wider">
          {plan.period}
        </span>
        {plan.periodNote && (
          <p className="text-[11px] text-[#aaaaaa] mt-0.5">{plan.periodNote}</p>
        )}
      </div>

      <div className="space-y-2.5 mb-5">
        {plan.features.map((feature, i) => {
          const isAddon = feature.startsWith("+ €");
          return isAddon ? (
            <div key={i} className="pt-2 border-t border-dashed border-[#e7ddd3]">
              <span className="text-[11px] text-[#aaaaaa] italic">{feature}</span>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-shrink-0 w-4.5 h-4.5 rounded-full bg-[#f9f5f2] flex items-center justify-center mt-0.5">
                <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
              </div>
              <span className="text-[12px] text-[#6b6b6b] leading-relaxed">{feature}</span>
            </div>
          );
        })}
      </div>

      {plan.roiNote && (
        <p className="text-[11px] text-[#787774] text-center italic mb-3">{plan.roiNote}</p>
      )}
      {plan.foundingNote && (
        <div className="flex items-center justify-center gap-2 mb-3 px-3 py-1.5 rounded-xl bg-[#8fa38d]/10 border border-[#8fa38d]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d] animate-pulse flex-shrink-0" />
          <span className="text-[11px] text-[#6b6b6b]">{plan.foundingNote}</span>
        </div>
      )}

      <button
        onClick={() => onCheckout(plan.slug)}
        disabled={!!loadingSlug}
        className={`w-full py-3 rounded-xl text-[13px] font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
          plan.popular
            ? "bg-[#3a3a3a] text-white hover:bg-[#e3a99c] disabled:opacity-60"
            : "bg-white border-2 border-[#e7ddd3] text-[#3a3a3a] hover:border-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white disabled:opacity-60"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Preparing checkout...
          </>
        ) : (
          plan.cta
        )}
      </button>
    </div>
  );
}

// ── Service card (NIE, TIE, Regreso, Schengen) ───────────────────────────────

interface ServiceCardProps {
  service: {
    name: string;
    description: string;
    price: string;
    currency: string;
    slug: string;
    cta: string;
    color: string;
    emoji: string;
  };
  loadingSlug: string | null;
  onCheckout: (slug: string) => void;
}

function ServiceCard({ service, loadingSlug, onCheckout }: ServiceCardProps) {
  const isLoading = loadingSlug === service.slug;

  return (
    <div className="bg-white rounded-2xl border border-[#e7ddd3] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f5f0ec] text-lg flex-shrink-0">
          {service.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="text-[14px] font-bold text-[#3a3a3a] leading-tight">{service.name}</h3>
          <span
            className="text-[10px] font-bold"
            style={{ color: service.color }}
          >
            {service.currency}{service.price} one-time
          </span>
        </div>
      </div>
      <p className="text-[12px] text-[#787774] mb-4 leading-relaxed">{service.description}</p>
      <button
        onClick={() => onCheckout(service.slug)}
        disabled={!!loadingSlug}
        className="w-full py-2.5 rounded-xl text-[12px] font-bold border-2 border-[#e7ddd3] text-[#3a3a3a] hover:border-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            Preparing...
          </>
        ) : (
          <>
            <FileText className="w-3.5 h-3.5" />
            {service.cta}
          </>
        )}
      </button>
    </div>
  );
}
