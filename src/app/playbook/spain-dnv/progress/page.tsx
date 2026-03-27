"use client";

import { CheckCircle, Circle, Trophy, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { phases, totalLessons } from "../data";
import { useProgress } from "../progress-context";
import AnimateIn from "@/components/ui/AnimateIn";
import { motion } from "motion/react";

export default function ProgressPage() {
  const { completedLessonIds } = useProgress();
  const completedLessons = Object.fromEntries(completedLessonIds.map((id) => [id, true]));

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // SVG ring dimensions
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex w-full h-full font-sans" style={{ color: "var(--pb-text)" }}>
      <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12 py-6">
        <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full pb-24">
          {/* Header */}
          <AnimateIn delay={0}>
            <div className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--pb-border)" }}>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--pb-text)" }}>
                Your <span className="font-script text-[#e3a99c] text-[36px]">Progress</span>
              </h1>
              <p className="text-base" style={{ color: "var(--pb-text-secondary)" }}>
                Track your journey through the Spain DNV Playbook.
              </p>
            </div>
          </AnimateIn>

          {/* Overall Progress Card with SVG Ring */}
          <AnimateIn delay={0.1}>
            <div className="glass-pb-elevated rounded-3xl p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* SVG Progress Ring */}
                <div className="relative flex-shrink-0">
                  <svg width={size} height={size} className="-rotate-90">
                    {/* Background ring */}
                    <circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth={strokeWidth}
                    />
                    {/* Progress ring */}
                    <motion.circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e3a99c" />
                        <stop offset="100%" stopColor="#c9a84c" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Counter in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-[40px] font-bold leading-none"
                      style={{ color: "var(--pb-text)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {progressPercent}%
                    </motion.span>
                    <span className="text-[12px] mt-1" style={{ color: "var(--pb-text-muted)" }}>complete</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-[20px] font-semibold mb-1" style={{ color: "var(--pb-text)" }}>
                    Overall Completion
                  </h2>
                  <p className="text-[14px] mb-4" style={{ color: "var(--pb-text-muted)" }}>
                    {completedCount} of {totalLessons} lessons completed
                  </p>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--pb-border)" }}>
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#e3a99c] to-[#c9a84c] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Completion Badge */}
          {progressPercent === 100 && (
            <AnimateIn delay={0.15}>
              <div className="flex items-center gap-3 rounded-2xl p-5 mb-8 border border-[#c9a84c]/25" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(143,163,141,0.15) 100%)" }}>
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold flex items-center gap-2" style={{ color: "var(--pb-text)" }}>
                    <span className="font-script text-[#c9a84c] text-[20px]">Incredible!</span> Playbook Complete!
                  </p>
                  <p className="text-[13px] mt-0.5" style={{ color: "var(--pb-text-muted)" }}>
                    You&apos;ve finished all {totalLessons} lessons. Congratulations!
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-[#c9a84c] flex-shrink-0 ml-auto animate-pulse-soft" />
              </div>
            </AnimateIn>
          )}

          {/* Phase Breakdown */}
          <div className="space-y-4">
            {phases.map((phase, idx) => {
              const phaseCompleted = phase.lessons.filter(
                (l) => completedLessons[l.id],
              ).length;
              const phaseTotal = phase.lessons.length;
              const phasePercent =
                phaseTotal > 0
                  ? Math.round((phaseCompleted / phaseTotal) * 100)
                  : 0;

              return (
                <AnimateIn key={phase.id} delay={0.2 + idx * 0.06}>
                  <div className="glass-pb rounded-2xl overflow-hidden">
                    {/* Phase Header */}
                    <div className="px-5 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${phase.accent}15`,
                              color: phase.accent,
                            }}
                          >
                            {phase.phase}
                          </span>
                          <h3 className="text-[14px] font-semibold" style={{ color: "var(--pb-text)" }}>
                            {phase.title}
                          </h3>
                        </div>
                        <span className="text-[12px]" style={{ color: "var(--pb-text-muted)" }}>
                          {phaseCompleted}/{phaseTotal}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--pb-border)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: phase.accent }}
                          initial={{ width: 0 }}
                          animate={{ width: `${phasePercent}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 + idx * 0.06 }}
                        />
                      </div>
                    </div>

                    {/* Lessons List */}
                    <div style={{ borderColor: "var(--pb-border-subtle)" }} className="divide-y [&>*]:border-[inherit]">
                      {phase.lessons.map((lesson) => {
                        const isDone = completedLessons[lesson.id] || false;
                        const lessonNum = parseInt(lesson.number);

                        return (
                          <Link
                            key={lesson.id}
                            href={`/playbook/spain-dnv/lessons/lesson-${lessonNum}`}
                            className="flex items-center gap-3 px-5 py-3 transition-colors group"
                            style={
                              {
                                "--hover-bg": "var(--pb-surface-hover)",
                              } as React.CSSProperties
                            }
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "var(--pb-surface-hover)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-[#8fa38d] flex-shrink-0 drop-shadow-[0_0_6px_rgba(143,163,141,0.4)]" />
                            ) : (
                              <Circle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
                            )}
                            <span
                              className={`text-[14px] flex-1 ${isDone ? "line-through" : ""}`}
                              style={{
                                color: isDone
                                  ? "var(--pb-text-muted)"
                                  : "var(--pb-text-secondary)",
                              }}
                            >
                              {lesson.number}. {lesson.title}
                            </span>
                            <ArrowRight
                              className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: "var(--pb-text-muted)" }}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
