/* ─────────────────────────────────────────────
   Shared types for the Playbook system
   Add a new playbook by creating a data file
   in this directory and registering it in index.ts
───────────────────────────────────────────── */

export interface Lesson {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  time: string;
  tag: string;
  free: boolean;
  link: string | null;
}

export interface Phase {
  id: string;
  phase: string;       // e.g. "Phase 0"
  title: string;       // e.g. "Qualify"
  emoji: string;
  description: string;
  accent: string;      // hex color for accents & bullet dots
  bg: string;          // hex color for phase header background
  lessons: Lesson[];
}

export interface PlaybookCatalogMeta {
  emoji: string;
  tagline: string;           // 1-line hook shown on catalog card
  description: string;       // 2-sentence description for catalog card
  status: "available" | "waitlist" | "coming-soon";
  accent: string;            // accent color for catalog card
  bg: string;                // bg color for catalog card header chip
  coverImage?: string;       // optional cover image URL for catalog card
  hasAiGuide?: boolean;      // show "AI Guide" badge on catalog card
}

export interface NextPlaybookPreview {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  accent: string;
  bg: string;
  chapterLabel: string;        // e.g. "Chapter 2", "Chapter 3"
  phasePreview: Array<{ emoji: string; title: string }>;
}

export interface PlaybookConfig {
  slug: string;              // URL slug — e.g. "spain-dnv"
  badge: string;             // e.g. "Playbook Pro"
  badgeLabel: string;        // e.g. "Application → Citizenship"
  updatedLabel: string;      // e.g. "Updated 2026"
  heroTitle: string;
  heroDescription: string;
  totalTime: string;         // e.g. "~2.5 hrs"
  modalFeatures: string[];   // bullet list in UnlockModal
  finalCtaTitle: string;
  finalCtaDescription: string;
  freeVersion?: {            // optional link to a free/lite version
    label: string;
    link: string;
  };
  catalog: PlaybookCatalogMeta;
  phases: Phase[];
  nextPlaybook?: NextPlaybookPreview; // "What's Next" chapter reveal
}
