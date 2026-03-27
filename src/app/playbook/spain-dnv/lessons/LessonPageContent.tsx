"use client";

import Link from "next/link";
import {
  Clock,
  Lock,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  LogIn,
} from "lucide-react";
import { useProgress } from "../progress-context";
import { phases } from "../data";
import AnimateIn from "@/components/ui/AnimateIn";
import { motion } from "motion/react";

// Build a lookup from lesson folder number → lesson id using data.ts as source of truth
const lessonFolderToId: Record<number, string> = {};
phases.forEach((p) => {
  p.lessons.forEach((l) => {
    lessonFolderToId[parseInt(l.number)] = l.id;
  });
});

interface LessonNav {
  number: string;
  title: string;
  path: string;
}

interface LessonPageProps {
  lessonId: string;
  number: string;
  title: string;
  description: string;
  bullets: string[];
  time: string;
  tag: string;
  free: boolean;
  link?: string | null;
  phase: {
    phase: string;
    title: string;
    accent: string;
    bg: string;
  };
  prev: LessonNav | null;
  next: LessonNav | null;
}

export default function LessonPageContent({
  lessonId,
  number,
  title,
  description,
  bullets,
  time,
  tag,
  free,
  link,
  phase,
  prev,
  next,
}: LessonPageProps) {
  const { completedLessonIds, markComplete, isAuthenticated } = useProgress();

  const isDone = completedLessonIds.includes(lessonId);

  // Derive prev lesson's id from its path
  const prevFolderNum = prev?.path ? parseInt(prev.path.split("/lesson-")[1]) : null;
  const prevLessonId = prevFolderNum != null ? lessonFolderToId[prevFolderNum] : null;

  // Only lock lessons sequentially for authenticated users ~ guests can browse freely
  const isLocked =
    isAuthenticated &&
    number !== "01" &&
    prevLessonId != null &&
    !completedLessonIds.includes(prevLessonId);

  const toggleComplete = () => {
    if (isLocked) return;
    markComplete(lessonId, !isDone);
  };

  return (
    <div className="flex w-full h-full font-sans" style={{ color: "var(--pb-text)" }}>
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[13px] mb-8 flex-wrap" style={{ color: "var(--pb-text-muted)" }}>
            <Link
              href="/playbook/spain-dnv/home"
              className="hover:opacity-70 transition-opacity"
            >
              Playbook
            </Link>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span>
              {phase.phase}: {phase.title}
            </span>
            <ChevronRight className="w-3 h-3 opacity-60" />
            <span className="font-medium" style={{ color: "var(--pb-text)" }}>Lesson {number}</span>
          </nav>

          {/* Lesson Header */}
          <AnimateIn delay={0}>
            <div className="mb-10 pb-8" style={{ borderBottom: "1px solid var(--pb-border)" }}>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ color: phase.accent, backgroundColor: `${phase.accent}15` }}
                >
                  {phase.phase}
                </span>
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${phase.accent}15`, color: phase.accent }}
                >
                  {tag}
                </span>
                <span className="text-[12px] flex items-center gap-1" style={{ color: "var(--pb-text-muted)" }}>
                  <Clock className="w-3 h-3" />
                  {time}
                </span>
                {free ? (
                  <span className="text-[11px] font-semibold text-[#8fa38d] bg-[#8fa38d]/15 px-2 py-0.5 rounded-full">
                    Free
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--pb-text-muted)" }}>
                    <Lock className="w-3 h-3" />
                    Pro
                  </span>
                )}
              </div>

              <h1 className="text-[36px] leading-[1.15] font-bold tracking-tight mb-4" style={{ color: "var(--pb-text)" }}>
                {title}
              </h1>

              <p className="text-[17px] leading-[1.7]" style={{ color: "var(--pb-text-secondary)" }}>
                {description}
              </p>
            </div>
          </AnimateIn>

          {/* Locked banner */}
          {isLocked && prev && (
            <div className="mb-8 p-5 rounded-2xl glass-pb border border-[#e3a99c]/15 flex items-start gap-3">
              <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--pb-text-muted)" }} />
              <div>
                <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--pb-text)" }}>
                  Complete the previous lesson to unlock this one
                </p>
                <Link
                  href={prev.path}
                  className="text-[13px] font-semibold hover:underline"
                  style={{ color: phase.accent }}
                >
                  Go to Lesson {prev.number}: {prev.title} →
                </Link>
              </div>
            </div>
          )}

          {/* Key Points */}
          <AnimateIn delay={0.1}>
            <div className="mb-10">
              <h2 className="text-[20px] font-semibold mb-5" style={{ color: "var(--pb-text)" }}>
                What you&apos;ll <span className="font-script text-[#e3a99c] text-[24px]">learn</span>
              </h2>
              <div className="space-y-3">
                {bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl glass-pb"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${phase.accent}15`, color: phase.accent }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-[14px] leading-relaxed" style={{ color: "var(--pb-text-secondary)" }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Companion Guide */}
          {link && (
            <AnimateIn delay={0.15}>
              <div className="mb-10 p-5 rounded-2xl glass-pb-elevated flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium mb-0.5 uppercase tracking-wide" style={{ color: "var(--pb-text-muted)" }}>
                    Companion Guide
                  </p>
                  <p className="text-[14px] font-semibold" style={{ color: "var(--pb-text)" }}>
                    Read the full guide for this lesson
                  </p>
                </div>
                <Link
                  href={link}
                  className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold rounded-xl transition-colors flex-shrink-0"
                  style={{ backgroundColor: "var(--pb-text)", color: "var(--pb-bg)" }}
                >
                  Open Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimateIn>
          )}

          {/* Mark Complete / Sign In CTA */}
          <div className="mb-12">
            {isAuthenticated ? (
              <motion.button
                onClick={toggleComplete}
                disabled={isLocked}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-[14px] font-semibold transition-all duration-300 ${
                  isLocked
                    ? "cursor-not-allowed opacity-60"
                    : isDone
                    ? "bg-[#8fa38d] border-[#8fa38d] shadow-[0_0_20px_rgba(143,163,141,0.3)]"
                    : ""
                }`}
                style={
                  isLocked
                    ? { backgroundColor: "var(--pb-surface)", color: "var(--pb-text-muted)", borderColor: "var(--pb-border)" }
                    : isDone
                    ? { color: "#fff" }
                    : { backgroundColor: "var(--pb-input-bg)", color: "var(--pb-text)", borderColor: "var(--pb-border)" }
                }
              >
                {isDone ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded" style={{ border: "1px solid var(--pb-text-muted)" }} />
                    Mark as complete
                  </>
                )}
              </motion.button>
            ) : (
              <Link
                href="/playbook"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border text-[14px] font-semibold transition-all duration-300 hover:border-[#e3a99c] hover:text-[#e3a99c]"
                style={{ backgroundColor: "var(--pb-input-bg)", color: "var(--pb-text-secondary)", borderColor: "var(--pb-border)" }}
              >
                <LogIn className="w-4 h-4" />
                Sign in to save your progress
              </Link>
            )}
          </div>

          {/* Prev / Next Navigation */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4" style={{ borderTop: "1px solid var(--pb-border)" }}>
            {prev ? (
              <Link
                href={prev.path}
                className="flex-1 flex items-center gap-3 p-5 rounded-2xl glass-pb transition-all group"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0 transition-colors" style={{ color: "var(--pb-text-muted)" }} />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium mb-0.5" style={{ color: "var(--pb-text-muted)" }}>
                    Previous
                  </div>
                  <div className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>
                    {prev.number}. {prev.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              (isDone || !isAuthenticated) ? (
                <Link
                  href={next.path}
                  className="flex-1 flex items-center justify-end gap-3 p-5 rounded-2xl glass-pb transition-all group text-right"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium mb-0.5" style={{ color: "var(--pb-text-muted)" }}>
                      Next
                    </div>
                    <div className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>
                      {next.number}. {next.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 transition-colors" style={{ color: "var(--pb-text-muted)" }} />
                </Link>
              ) : (
                <div className="flex-1 flex items-center justify-end gap-3 p-5 rounded-2xl glass-pb text-right opacity-30 cursor-not-allowed select-none">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium mb-0.5" style={{ color: "var(--pb-text-muted)" }}>
                      Next
                    </div>
                    <div className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>
                      {next.number}. {next.title}
                    </div>
                  </div>
                  <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
                </div>
              )
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
