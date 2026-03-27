/* ─────────────────────────────────────────────
   Playbook Registry
   To add a new playbook:
   1. Create /data/playbooks/your-slug.ts
   2. Import it here and add to PLAYBOOKS array
   3. Add STRIPE_PRICE_YOUR_SLUG to .env.local
   4. Create Supabase entry for new slug (auto)
───────────────────────────────────────────── */

import type { PlaybookConfig } from "./types";
import spainDnv from "./spain-dnv";
import visaRunner from "./visa-runner";
import softLanding from "./soft-landing";
import spanishPassport from "./spanish-passport";
import schengenFirst from "./schengen-first";
import deleA2 from "./dele-a2";

// ── Available playbooks (purchasable) ────────
export const PLAYBOOKS: PlaybookConfig[] = [spainDnv];

// ── Waitlist playbooks (preview + email capture) ──
export const WAITLIST_PLAYBOOKS: PlaybookConfig[] = [schengenFirst, visaRunner, softLanding, deleA2, spanishPassport];

// ── Coming-soon catalog entries (display only) ──
export const COMING_SOON = [
  {
    emoji: "🏡",
    title: "Spain NLV Playbook",
    tagline: "Non-Lucrative Visa for passive income & retirees",
    description:
      "The step-by-step guide for moving to Spain on passive income ~ pension, investments, or rental income. No work required.",
    status: "coming-soon" as const,
    accent: "#8fa38d",
    bg: "#d4e0d3",
  },
  {
    emoji: "💼",
    title: "Beckham Law Deep Dive",
    tagline: "Spain's expat flat-tax regime, fully explained",
    description:
      "Who qualifies, how to apply within the first 6 months, and whether the 24% flat rate actually saves you money compared to standard IRPF.",
    status: "coming-soon" as const,
    accent: "#c9a84c",
    bg: "#f5ecd7",
  },
];

// ── Lookup helpers ────────────────────────────
export function getPlaybook(slug: string): PlaybookConfig | undefined {
  return PLAYBOOKS.find((p) => p.slug === slug);
}

export function getWaitlistPlaybook(slug: string): PlaybookConfig | undefined {
  return WAITLIST_PLAYBOOKS.find((p) => p.slug === slug);
}

// ── Static params for Next.js generateStaticParams ──
export function getAvailableSlugs(): { slug: string }[] {
  return [
    ...PLAYBOOKS.map((p) => ({ slug: p.slug })),
    ...WAITLIST_PLAYBOOKS.map((p) => ({ slug: p.slug })),
  ];
}
