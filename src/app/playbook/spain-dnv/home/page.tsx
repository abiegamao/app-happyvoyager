"use client";

import { CheckCircle, Globe, Clock, ArrowRight, Sparkles, Mail, CalendarDays, Flag, LogIn } from "lucide-react";
import {
  IconTarget,
  IconClipboardList,
  IconFileText,
  IconPlane,
  IconRefresh,
  IconTrophy,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { phases, playbookMeta, totalLessons } from "../data";
import { WAITLIST_PLAYBOOKS } from "@/data/playbooks";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import AnimateIn from "@/components/ui/AnimateIn";

const phaseIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>> = {
  qualify: IconTarget,
  prepare: IconClipboardList,
  apply: IconFileText,
  arrive: IconPlane,
  maintain: IconRefresh,
  "become-spanish": IconTrophy,
};

const journeyChain = [
  { emoji: "🇪🇺", title: "Schengen First", slug: "schengen-first", accent: "#bbcccd", label: "Chapter 0" },
  { emoji: "🇪🇸", title: "Spain DNV", slug: "spain-dnv", accent: "#e3a99c", label: "You are here", current: true },
  { emoji: "🌞", title: "Soft Landing", slug: "soft-landing", accent: "#c47c5a", label: "Chapter 2" },
  { emoji: "🏆", title: "Spanish Passport", slug: "spanish-passport", accent: "#c9a84c", label: "Chapter 3" },
];

export default function PlaybookHome() {
  const [name, setName] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("playbook_session");
      if (raw) setName(JSON.parse(raw).name || "");
    } catch { /* ignore */ }

    const hasSession = sessionStorage.getItem("playbook_session");
    const hasAuthCookie = document.cookie.split(";").some((c) => c.trim().startsWith("hv_customer"));
    setIsAuthenticated(!!(hasSession || hasAuthCookie));

    // Check if they've completed any lessons yet
    try {
      const progress = localStorage.getItem("playbook_lesson_progress");
      const hasProgress = progress && Object.keys(JSON.parse(progress)).length > 0;
      setIsFirstVisit(!hasProgress);
    } catch {
      setIsFirstVisit(true);
    }
  }, []);

  return (
    <div className="flex w-full h-full font-sans" style={{ color: "var(--pb-text)" }}>
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">

          {/* Personalized welcome banner */}
          {name && (
            <AnimateIn delay={0}>
              <div className="mb-8 flex items-start gap-3 px-5 py-4 rounded-2xl glass-pb-elevated">
                <Sparkles className="w-4 h-4 text-[#e3a99c] mt-0.5 flex-shrink-0 drop-shadow-[0_0_6px_rgba(227,169,156,0.4)]" />
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: "var(--pb-text)" }}>
                    Welcome back, {name}!
                  </p>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--pb-text-secondary)" }}>
                    Pick up where you left off or jump into any phase below.
                  </p>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Start Here ~ first-time visitor callout */}
          {isFirstVisit && (
            <AnimateIn delay={0.05}>
              <div className="mb-8 flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#e3a99c]/15 to-[#c9a84c]/10 border border-[#e3a99c]/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Flag className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                  <p className="text-[14px]" style={{ color: "var(--pb-text-secondary)" }}>
                    <span className="font-semibold" style={{ color: "var(--pb-text)" }}>New here?</span> Start with Lesson 1 ~ check your eligibility in 2 minutes.
                  </p>
                </div>
                <Link
                  href="/playbook/spain-dnv/lessons/lesson-1"
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-[#e3a99c] hover:text-[#f2d6c9] flex-shrink-0 transition-colors"
                >
                  Start here
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimateIn>
          )}

          {/* Sign in prompt for guests */}
          {!isAuthenticated && (
            <AnimateIn delay={0.07}>
              <Link
                href="/login"
                className="mb-8 flex items-center justify-between gap-4 px-5 py-4 rounded-2xl glass-pb border border-[#e3a99c]/15 group hover:border-[#e3a99c]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <LogIn className="w-4 h-4 text-[#e3a99c] flex-shrink-0" />
                  <p className="text-[14px]" style={{ color: "var(--pb-text-secondary)" }}>
                    <span className="font-semibold" style={{ color: "var(--pb-text)" }}>Sign in</span> to save your progress and unlock step-by-step tracking ~ it&apos;s free.
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#e3a99c] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </AnimateIn>
          )}

          {/* Cover Image */}
          <AnimateIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden mb-10 shadow-2xl" style={{ border: "1px solid var(--pb-border)", boxShadow: "0 25px 50px -12px var(--pb-shadow-accent)" }}>
              <Image
                src="https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164761/AbieMaxey_s_Website_Spain_Digital_hoaw2f.png"
                alt="Spain Digital Nomad Visa Playbook"
                width={840}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </AnimateIn>

          {/* Hero */}
          <AnimateIn delay={0.15}>
            <div className="mb-10 pb-8" style={{ borderBottom: "1px solid var(--pb-border)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-2.5 py-1 text-[12px] font-semibold rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #e3a99c 0%, #d69586 100%)",
                    color: "#2a2a2a",
                  }}
                >
                  {playbookMeta.badge}
                </span>
                <span className="text-[12px] font-medium" style={{ color: "var(--pb-text-muted)" }}>
                  {playbookMeta.updatedLabel}
                </span>
              </div>
              <h1 className="text-[40px] leading-[1.1] font-bold tracking-tight mb-4" style={{ color: "var(--pb-text)" }}>
                Spain DNV <span className="font-script text-[#e3a99c] text-[44px]">Playbook Pro</span>
              </h1>
              <p className="text-[18px] leading-[1.6] font-medium" style={{ color: "var(--pb-text-secondary)" }}>
                {playbookMeta.heroDescription}
              </p>
              <div className="flex items-center gap-4 mt-5 text-[14px]" style={{ color: "var(--pb-text-muted)" }}>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#e3a99c]" />
                  {playbookMeta.totalTime} total
                </span>
                <span>{totalLessons} lessons</span>
                <span>{phases.length} phases</span>
              </div>
            </div>
          </AnimateIn>

          {/* How long will this take? */}
          <AnimateIn delay={0.2}>
            <div className="mb-12 rounded-2xl glass-pb overflow-hidden">
              <div className="px-6 py-4" style={{ borderBottom: "1px solid var(--pb-border)", backgroundColor: "var(--pb-surface)" }}>
                <h3 className="text-[15px] font-semibold" style={{ color: "var(--pb-text)" }}>How long will this take?</h3>
              </div>
              <div className="grid grid-cols-3" style={{ columnGap: 0 }}>
                {[
                  { label: "Read-only", time: "2–3 hours", note: "Just learning the path" },
                  { label: "Active research", time: "1–2 weeks", note: "Gathering documents" },
                  { label: "Full application", time: "4–6 weeks", note: "Start to submitted" },
                ].map((item, idx) => (
                  <div key={item.label} className="px-4 py-4 text-center" style={idx > 0 ? { borderLeft: "1px solid var(--pb-border)" } : undefined}>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--pb-text-muted)" }}>{item.label}</p>
                    <p className="text-[18px] font-bold leading-tight" style={{ color: "var(--pb-text)" }}>{item.time}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--pb-text-muted)" }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Author */}
          <AnimateIn delay={0.25}>
            <div className="mb-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden" style={{ border: "2px solid var(--pb-border)" }}>
                <Image
                  src="https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773164922/avatar_v3grgg.png"
                  alt="Abie Maxey"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold mb-1" style={{ color: "var(--pb-text)" }}>
                  Abie Maxey (Abz)
                </h2>
                <p className="text-[15px] mb-3" style={{ color: "var(--pb-text-secondary)" }}>
                  Systems engineer, content creator, and DNV holder based in Spain.
                </p>
                <div className="flex flex-wrap gap-3 text-[12px]" style={{ color: "var(--pb-text-muted)" }}>
                  <Link href="https://happyvoyager.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#e3a99c] transition-colors">
                    <Globe className="w-3.5 h-3.5" /> Web
                  </Link>
                  <Link href="https://instagram.com/happyvoyager" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a99c] transition-colors">Instagram</Link>
                  <Link href="https://youtube.com/@happyvoyager" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a99c] transition-colors">YouTube</Link>
                  <Link href="https://linkedin.com/in/abiemaxey" target="_blank" rel="noopener noreferrer" className="hover:text-[#e3a99c] transition-colors">LinkedIn</Link>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* What this playbook covers */}
          <AnimateIn delay={0.3}>
            <div className="glass-pb-elevated rounded-2xl p-8 mb-12">
              <h3 className="text-[18px] font-semibold mb-4" style={{ color: "var(--pb-text)" }}>
                What this playbook covers
              </h3>
              <ul className="space-y-2.5">
                {playbookMeta.modalFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#e3a99c] mt-0.5 shrink-0" />
                    <span className="text-[15px]" style={{ color: "var(--pb-text-secondary)" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>

          {/* Free Guides callout */}
          <AnimateIn delay={0.32}>
            <Link
              href="/playbook/spain-dnv/guides"
              className="block rounded-2xl glass-pb overflow-hidden playbook-card group"
            >
              <div className="h-0.5 bg-[#8fa38d]" />
              <div className="p-6 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8fa38d] bg-[#8fa38d]/15 px-2 py-0.5 rounded">
                      Free
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold mb-1" style={{ color: "var(--pb-text)" }}>
                    Reference Guides
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--pb-text-secondary)" }}>
                    Visa basics, eligibility, document checklist, application process ~ browse free reference material before starting the course.
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[13px] font-medium flex-shrink-0 transition-all text-[#8fa38d] group-hover:gap-2.5">
                  Browse
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </AnimateIn>

          {/* Roadmap ~ Premium Timeline */}
          <div className="mt-4">
            <AnimateIn delay={0.35}>
              <div className="mb-8">
                <h2 className="text-[28px] font-bold tracking-tight" style={{ color: "var(--pb-text)" }}>
                  Your <span className="font-script text-[#e3a99c] text-[32px]">Roadmap</span>
                </h2>
                <p className="text-[14px] mt-1" style={{ color: "var(--pb-text-muted)" }}>
                  6 phases. Application to citizenship.
                </p>
              </div>
            </AnimateIn>

            <div className="relative">
              {/* Animated timeline line */}
              <motion.div
                className="absolute left-[19px] top-0 bottom-0 w-px origin-top"
                style={{ background: "linear-gradient(180deg, #e3a99c, #8fa38d, #c9a84c, #e3a99c)" }}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              />

              <div className="space-y-1">
                {phases.map((phase, idx) => {
                  const firstLesson = parseInt(phase.lessons[0]?.number ?? "1");
                  const PhaseIcon = phaseIcons[phase.id] ?? IconTarget;
                  const freeCount = phase.lessons.filter((l: any) => l.free).length;

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.15 * idx, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link
                        href={`/playbook/spain-dnv/lessons/lesson-${firstLesson}`}
                        className="group flex items-center gap-4 py-3.5 px-2 -mx-2 rounded-xl transition-colors"
                        style={{ backgroundColor: "transparent" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--pb-surface-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        {/* Icon node */}
                        <motion.div
                          className="relative z-[1] w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: `${phase.accent}18`, border: `1px solid ${phase.accent}30` }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <PhaseIcon className="w-[18px] h-[18px]" style={{ color: phase.accent }} strokeWidth={2} />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: phase.accent }}>
                              {phase.phase}
                            </span>
                            <span className="text-[11px]" style={{ color: "var(--pb-text-muted)" }}>
                              {phase.lessons.length} lessons
                              {freeCount > 0 && (
                                <span className="text-[#8fa38d] ml-1">· {freeCount} free</span>
                              )}
                            </span>
                          </div>
                          <h3 className="text-[16px] font-bold leading-tight" style={{ color: "var(--pb-text)" }}>
                            {phase.title}
                          </h3>
                        </div>

                        {/* Arrow */}
                        <ArrowRight
                          className="w-4 h-4 flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          style={{ color: phase.accent }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Connected Playbooks ─── */}
          <div className="mt-16">
            <AnimateIn delay={0.85}>
              <div className="mb-8">
                <h2 className="text-[28px] font-bold tracking-tight" style={{ color: "var(--pb-text)" }}>
                  The <span className="font-script text-[#c9a84c] text-[32px]">Journey</span>
                </h2>
                <p className="text-[14px] mt-1" style={{ color: "var(--pb-text-muted)" }}>
                  This playbook is one chapter. Here&apos;s the full picture.
                </p>
              </div>
            </AnimateIn>

            {/* Journey Chain */}
            <AnimateIn delay={0.88}>
              <div className="rounded-2xl glass-pb overflow-hidden mb-8">
                <div className="p-5 flex items-center justify-between gap-1 overflow-x-auto">
                  {journeyChain.map((step, idx) => (
                    <div key={step.slug} className="flex items-center gap-1 flex-shrink-0">
                      <Link
                        href={`/playbook/${step.slug}`}
                        className={`relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all group ${
                          step.current ? "" : "hover:opacity-80"
                        }`}
                        style={step.current ? {
                          backgroundColor: `${step.accent}15`,
                          border: `1px solid ${step.accent}40`,
                        } : undefined}
                      >
                        <span className="text-2xl">{step.emoji}</span>
                        <span
                          className="text-[11px] font-bold leading-tight text-center max-w-[80px]"
                          style={{ color: step.current ? step.accent : "var(--pb-text-muted)" }}
                        >
                          {step.title}
                        </span>
                        {step.current && (
                          <span
                            className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${step.accent}20`, color: step.accent }}
                          >
                            You are here
                          </span>
                        )}
                      </Link>
                      {idx < journeyChain.length - 1 && (
                        <motion.div
                          className="text-[14px] font-light mx-1"
                          style={{ color: "var(--pb-text-muted)" }}
                          initial={{ opacity: 0, x: -4 }}
                          whileInView={{ opacity: 0.4, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 * idx, duration: 0.4 }}
                        >
                          →
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Playbook Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {WAITLIST_PLAYBOOKS.map((playbook, idx) => {
                const lessonCount = playbook.phases.reduce((acc, p) => acc + p.lessons.length, 0);
                return (
                  <motion.div
                    key={playbook.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: 0.1 * idx, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <Link
                      href={`/playbook/${playbook.slug}`}
                      className="block rounded-2xl glass-pb overflow-hidden group playbook-card h-full"
                    >
                      <div className="h-0.5" style={{ backgroundColor: playbook.catalog.accent }} />
                      <div className="p-5">
                        <div className="flex items-start gap-3.5">
                          <span className="text-2xl flex-shrink-0 mt-0.5">{playbook.catalog.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-[15px] font-bold leading-tight" style={{ color: "var(--pb-text)" }}>
                                {playbook.heroTitle}
                              </h3>
                              <span
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                                style={{
                                  color: playbook.catalog.accent,
                                  backgroundColor: `${playbook.catalog.accent}15`,
                                  border: `1px solid ${playbook.catalog.accent}30`,
                                }}
                              >
                                Early Access
                              </span>
                            </div>
                            <p className="text-[13px] leading-relaxed line-clamp-2 mb-3" style={{ color: "var(--pb-text-muted)" }}>
                              {playbook.catalog.tagline}
                            </p>
                            <div className="flex items-center gap-4 text-[11px]" style={{ color: "var(--pb-text-muted)" }}>
                              <span className="font-semibold">{lessonCount} lessons</span>
                              <span>{playbook.phases.length} phases</span>
                              <span>{playbook.totalTime}</span>
                            </div>
                          </div>
                          <ArrowRight
                            className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            style={{ color: playbook.catalog.accent }}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Final CTA */}
          <AnimateIn delay={0.9}>
            <div
              className="mt-16 rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #e3a99c 0%, #c9a84c 100%)",
              }}
            >
              <h3 className="text-[22px] font-bold text-white mb-2">
                {playbookMeta.finalCtaTitle}
              </h3>
              <p className="text-[15px] text-white/70 mb-6">
                {playbookMeta.finalCtaDescription}
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] text-white rounded-xl text-[14px] font-semibold hover:bg-[#1e1e1e] transition-colors border border-white/10 shadow-lg"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateIn>

          {/* Need help footer strip */}
          <AnimateIn delay={0.95}>
            <div className="mt-8 rounded-2xl glass-pb px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-semibold" style={{ color: "var(--pb-text)" }}>Need help?</p>
                <p className="text-[13px] mt-0.5" style={{ color: "var(--pb-text-muted)" }}>
                  Questions about your application or the playbook content?
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href="mailto:hello@happyvoyager.com"
                  className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#e3a99c] transition-colors"
                  style={{ color: "var(--pb-text-muted)" }}
                >
                  <Mail className="w-4 h-4" />
                  Email us
                </Link>
                <span style={{ color: "var(--pb-border)" }}>·</span>
                <Link
                  href="/booking"
                  className="flex items-center gap-1.5 text-[13px] font-medium hover:text-[#e3a99c] transition-colors"
                  style={{ color: "var(--pb-text-muted)" }}
                >
                  <CalendarDays className="w-4 h-4" />
                  Book a consult
                </Link>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </div>
  );
}
