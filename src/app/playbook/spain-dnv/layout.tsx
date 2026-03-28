"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronRight, Menu, Lock } from "lucide-react";
import {
  IconTarget,
  IconClipboardList,
  IconFileText,
  IconPlane,
  IconRefresh,
  IconTrophy,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { TopbarLinks } from "@/components/playbook/TopbarLinks";
import { phases } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { SearchModal } from "@/components/playbook/SearchModal";
import { AIChatbot } from "@/components/playbook/AIChatbot";
import { ProgressContext } from "./progress-context";
import { PlaybookThemeProvider, usePlaybookTheme } from "./theme-context";
import Footer from "@/components/Footer";

const phaseIcons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>> = {
  qualify: IconTarget,
  prepare: IconClipboardList,
  apply: IconFileText,
  arrive: IconPlane,
  maintain: IconRefresh,
  "become-spanish": IconTrophy,
};

const totalLessons = phases.reduce((acc, p) => acc + p.lessons.length, 0);

// Ordered list of lesson IDs — the source of truth for sequential unlock order
const allLessonIds = phases.flatMap((p) => p.lessons.map((l) => l.id));

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlaybookThemeProvider>
      <PlaybookLayoutInner>{children}</PlaybookLayoutInner>
    </PlaybookThemeProvider>
  );
}

function PlaybookLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggle: toggleTheme } = usePlaybookTheme();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(
    {},
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isGatePage = pathname === "/playbook/spain-dnv";
  const isHomePage = pathname === "/playbook/spain-dnv/home";
  const isLessonPage = pathname.includes("/lessons/");

  useEffect(() => {
    // Optimistic: unblock render instantly if session cache exists
    const hasSession = !!sessionStorage.getItem("playbook_session");
    if (hasSession) {
      setIsAuthenticated(true);
      setIsChecking(false);
    }

    // Always re-verify against DB — cookie is httpOnly so JS can't read it directly
    fetch("/api/stripe/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then((data) => {
        setIsAuthenticated(!!data.customerId);
      })
      .catch(() => {
        if (!hasSession) setIsAuthenticated(false);
      })
      .finally(() => {
        if (!hasSession) setIsChecking(false);
      });
  // Runs once on mount — layout stays alive across lesson navigations
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Auto-expand phase matching current lesson route
    const lessonMatch = pathname.match(/\/lessons\/lesson-(\d+)/);
    if (lessonMatch) {
      const lessonNum = lessonMatch[1].padStart(2, "0");
      const matchingPhase = phases.find((p) =>
        p.lessons.some((l) => l.number === lessonNum),
      );
      if (matchingPhase) {
        setExpandedPhases((prev) => ({ ...prev, [matchingPhase.id]: true }));
      }
    }
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      const matchingPhase = phases.find(
        (p) => p.id === hash || p.lessons.some((l) => l.id === hash),
      );
      if (matchingPhase) {
        setExpandedPhases((prev) => ({ ...prev, [matchingPhase.id]: true }));
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Load lesson progress: optimistic from localStorage, then sync from server
  useEffect(() => {
    if (isGatePage) return;

    // Seed optimistically from localStorage while fetch is in-flight
    let localIds: string[] = [];
    try {
      const raw = localStorage.getItem("playbook_lesson_progress");
      if (raw) {
        const local: Record<string, boolean> = JSON.parse(raw);
        localIds = Object.entries(local).filter(([, v]) => v).map(([k]) => k);
        setCompletedLessonIds(localIds);
      }
    } catch { /* ignore */ }

    // Fetch server state (auth via cookie)
    fetch(`/api/playbook/progress?playbook_slug=spain-dnv`)
      .then((r) => r.json())
      .then(({ completedLessonIds: serverIds }: { completedLessonIds: string[] }) => {
        if (serverIds.length === 0 && localIds.length > 0) {
          // Backfill server for existing users who have localStorage progress
          const backfill = localIds.map((lessonId) =>
            fetch("/api/playbook/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ playbook_slug: "spain-dnv", lesson_id: lessonId, completed: true }),
            })
          );
          Promise.all(backfill).catch(() => { /* silent fail */ });
        } else {
          setCompletedLessonIds(serverIds);
          const updated: Record<string, boolean> = {};
          serverIds.forEach((id) => { updated[id] = true; });
          try {
            localStorage.setItem("playbook_lesson_progress", JSON.stringify(updated));
          } catch { /* ignore */ }
        }
      })
      .catch(() => { /* keep local state on network error */ });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGatePage]);

  const markComplete = useCallback((lessonId: string, completed: boolean) => {
    // Optimistic update
    setCompletedLessonIds((prev) =>
      completed ? [...new Set([...prev, lessonId])] : prev.filter((id) => id !== lessonId)
    );

    // Sync localStorage
    try {
      const raw = localStorage.getItem("playbook_lesson_progress");
      const local: Record<string, boolean> = raw ? JSON.parse(raw) : {};
      if (completed) {
        local[lessonId] = true;
      } else {
        delete local[lessonId];
      }
      localStorage.setItem("playbook_lesson_progress", JSON.stringify(local));
    } catch { /* ignore */ }

    // Fire API (auth via cookie, non-blocking)
    fetch("/api/playbook/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playbook_slug: "spain-dnv", lesson_id: lessonId, completed }),
    }).catch(() => { /* silent fail — local state already updated */ });
  }, []);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  if (isChecking) return null;

  if (isGatePage) {
    return <>{children}</>;
  }

  return (
    <ProgressContext.Provider value={{ completedLessonIds, markComplete, isAuthenticated }}>
    <div data-playbook className={`${theme} flex flex-col min-h-screen font-sans relative transition-colors duration-300`} style={{ backgroundColor: "var(--pb-bg)", color: "var(--pb-text)" }}>
      {/* Decorative ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] blob-1" style={{ backgroundColor: "var(--pb-blob-rose)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[100px] blob-2" style={{ backgroundColor: "var(--pb-blob-sage)" }} />
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] rounded-full blur-[80px]" style={{ backgroundColor: "var(--pb-blob-peach)" }} />
      </div>

      {/* Global Top Bar */}
      <header className="sticky top-0 h-[56px] flex items-center justify-center px-4 md:px-6 backdrop-blur-xl shrink-0 z-50" style={{ backgroundColor: "var(--pb-header)", borderBottom: "1px solid var(--pb-border-subtle)" }}>
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto h-full">
          <div className="flex items-center gap-2 h-full flex-shrink-0">
            {isLessonPage && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded md:hidden -ml-2 mr-1 transition-colors"
                style={{ color: "var(--pb-text-secondary)" }}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link href="/">
              <img
                src="/assets/logo.png"
                alt="Happy Voyager"
                className="h-7 w-auto object-contain"
                style={{ filter: "var(--pb-logo-filter)" }}
              />
            </Link>
          </div>

          {/* Desktop search bar */}
          <div className="hidden md:flex justify-center flex-1 max-w-[480px]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 w-full rounded-xl backdrop-blur-sm transition-all cursor-default"
              style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)", color: "var(--pb-text-muted)" }}
            >
              <Search className="w-4 h-4" />
              <span className="text-[14px] font-medium mr-auto">Search...</span>
              <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ color: "var(--pb-text-muted)", backgroundColor: "var(--pb-input-bg)" }}>⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--pb-text-secondary)" }}
              whileTap={{ scale: 0.9 }}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {theme === "dark" ? (
                  <IconSun className="w-[18px] h-[18px]" strokeWidth={2} />
                ) : (
                  <IconMoon className="w-[18px] h-[18px]" strokeWidth={2} />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile search icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--pb-text-secondary)" }}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="sticky top-[56px] z-40 shrink-0">
        <TopbarLinks />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AIChatbot />

      <div className="flex max-w-[1400px] w-full mx-auto">
        {isLessonPage && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: "var(--pb-overlay)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar ~ only on lesson pages */}
        {isLessonPage && (
          <aside
            className={`fixed md:sticky top-0 md:top-[100px] left-0 h-screen md:h-[calc(100vh-112px)] md:self-start w-[272px] md:w-[260px] backdrop-blur-2xl flex flex-col transition-transform duration-300 ease-in-out z-40 md:z-0 md:m-3 md:rounded-2xl md:overflow-hidden md:shadow-2xl flex-shrink-0 ${
              sidebarOpen
                ? "translate-x-0 shadow-2xl"
                : "-translate-x-full md:translate-x-0"
            }`}
            style={{ backgroundColor: "var(--pb-sidebar)", borderColor: "var(--pb-border-subtle)" }}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3.5 flex-shrink-0" style={{ borderBottom: "1px solid var(--pb-border)" }}>
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--pb-text-muted)" }}>
                Course <span className="font-script text-[14px] text-[#e3a99c]/60 normal-case">Navigation</span>
              </span>
            </div>

            {/* Phase list */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {phases.map((phase) => {
                const isExpanded = expandedPhases[phase.id] ?? false;
                const PhaseIcon = phaseIcons[phase.id] ?? IconTarget;

                return (
                  <div key={phase.id} style={{ borderBottom: "1px solid var(--pb-border)" }}>
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="flex items-center gap-3 w-full px-5 py-3.5 text-left transition-all duration-200 hover:opacity-80"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${phase.accent}15` }}>
                        <PhaseIcon className="w-4 h-4" style={{ color: phase.accent }} strokeWidth={2} />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--pb-text-muted)" }}>
                          {phase.phase}
                        </span>
                        <span className="text-[14px] font-bold truncate" style={{ color: "var(--pb-text)" }}>
                          {phase.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-2">
                            {phase.lessons.map((lesson) => {
                              const isActive = pathname.includes(
                                `/lessons/lesson-${parseInt(lesson.number)}`,
                              );
                              const lessonIndex = allLessonIds.indexOf(lesson.id);
                              const isProgressLocked =
                                lessonIndex > 0 &&
                                !completedLessonIds.includes(allLessonIds[lessonIndex - 1]);
                              const isCompleted = completedLessonIds.includes(lesson.id);

                              const lessonInner = (
                                <div
                                  className={`flex items-center gap-3 pl-5 pr-4 py-1.5 transition-all duration-200 ${
                                    isActive ? "border-l-2 border-[#e3a99c]" : isProgressLocked ? "" : "border-l-2 border-transparent"
                                  }`}
                                  style={isActive ? { backgroundColor: "var(--pb-surface-hover)" } : undefined}
                                >
                                  {isProgressLocked ? (
                                    <Lock className="w-3 h-3 flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
                                  ) : isCompleted ? (
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#8fa38d] flex-shrink-0 flex items-center justify-center shadow-[0_0_6px_rgba(143,163,141,0.4)]">
                                      <span className="text-white text-[8px] font-bold leading-none">✓</span>
                                    </div>
                                  ) : (
                                    <div className={`w-3.5 h-3.5 rounded-full border-[1.5px] flex-shrink-0 ${
                                      isActive ? "border-[#e3a99c]" : ""
                                    }`} style={!isActive ? { borderColor: "var(--pb-border)" } : undefined} />
                                  )}
                                  <span
                                    className={`text-[13px] truncate leading-snug ${
                                      isActive ? "font-medium" : ""
                                    }`}
                                    style={{
                                      color: isActive
                                        ? "var(--pb-text)"
                                        : isProgressLocked
                                        ? "var(--pb-text-muted)"
                                        : "var(--pb-text-secondary)",
                                    }}
                                  >
                                    {lesson.number}. {lesson.title}
                                  </span>
                                </div>
                              );

                              return isProgressLocked ? (
                                <div key={lesson.id} className="cursor-not-allowed select-none">
                                  {lessonInner}
                                </div>
                              ) : (
                                <Link
                                  key={lesson.id}
                                  href={`/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`}
                                >
                                  {lessonInner}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom progress */}
            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: "1px solid var(--pb-border)" }}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[12px]" style={{ color: "var(--pb-text-muted)" }}>Progress</span>
                <span className="text-[12px] font-semibold" style={{ color: "var(--pb-text)" }}>
                  {completedLessonIds.length}/{totalLessons}
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--pb-border)" }}>
                <div
                  className="h-full bg-gradient-to-r from-[#e3a99c] to-[#c9a84c] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(completedLessonIds.length / totalLessons) * 100}%` }}
                />
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 relative z-[1]">
          <div className="flex-1 flex flex-col pt-8 pb-24">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
    </ProgressContext.Provider>
  );
}
