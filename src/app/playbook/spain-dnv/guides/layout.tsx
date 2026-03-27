"use client";

import {
  BarChart2,
  BookOpen,
  FileText,
  Newspaper,
  Users,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { guides } from "./data";
import { motion, AnimatePresence } from "motion/react";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active guide based on URL
  const activeGuideId =
    guides.find((g) => pathname.includes(`/guides/${g.id}`))?.id ||
    guides[0].id;

  const handleGuideClick = (guideId: string) => {
    router.push(`/playbook/spain-dnv/guides/${guideId}`);
  };

  return (
    <div className="flex w-full items-start">
      {/* ─── Left Sidebar: Guide List ─── */}
      <aside
        className="hidden md:flex w-[240px] flex-shrink-0 flex-col bg-transparent sticky top-[32px] max-h-[calc(100vh-140px)] overflow-y-auto z-10 relative"
        style={{ borderRight: "1px solid var(--pb-border-subtle)" }}
      >
        <div className="pt-2 pb-20">
          <div className="px-4 space-y-6">
            <div className="space-y-0.5">
              {[
                { label: "Status", icon: BarChart2 },
                { label: "Community", icon: Users },
                { label: "Blog", icon: Newspaper },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-2.5 w-full px-3 py-1.5 rounded-md text-left transition-colors hover:opacity-80"
                  style={{ color: "var(--pb-text-muted)" }}
                >
                  <item.icon className="w-4 h-4 opacity-70" strokeWidth={2} />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div>
              <div className="px-3 py-2 text-[12px] font-semibold mb-1" style={{ color: "var(--pb-text-secondary)" }}>
                Free Reference
              </div>

              <div className="space-y-0.5">
                {guides.map((guide) => {
                  const isActive = activeGuideId === guide.id;
                  return (
                    <div key={guide.id} className="space-y-0.5">
                      <button
                        onClick={() => handleGuideClick(guide.id)}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-left transition-colors group ${
                          isActive
                            ? "bg-[#e3a99c]/15 text-[#e3a99c] font-semibold border-l-2 border-[#e3a99c]"
                            : "font-medium"
                        }`}
                        style={!isActive ? { color: "var(--pb-text-muted)" } : undefined}
                      >
                        <span className="text-[14px] truncate leading-tight py-0.5 flex-1">
                          {guide.title}
                        </span>
                        <span className="text-[10px] font-semibold text-[#8fa38d] bg-[#8fa38d]/15 px-1.5 py-0.5 rounded-full flex-shrink-0">
                          Free
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 my-1 pl-3 space-y-0.5" style={{ borderLeft: "1px solid var(--pb-border)" }}>
                              {guide.sections.map((section) => (
                                <div key={section.id} className="space-y-0.5">
                                  <a
                                    href={`#${section.id}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document
                                        .getElementById(section.id)
                                        ?.scrollIntoView({
                                          behavior: "smooth",
                                        });
                                      window.history.pushState(
                                        null,
                                        "",
                                        `#${section.id}`,
                                      );
                                    }}
                                    className="block py-1 text-[13px] transition-colors whitespace-nowrap overflow-hidden text-ellipsis hover:opacity-80"
                                    style={{ color: "var(--pb-text-muted)" }}
                                  >
                                    {section.title}
                                  </a>
                                  {/* Render nested expandables as sub-items */}
                                  {section.content.map((block, idx) =>
                                    block.type === "expandable" && block.id ? (
                                      <a
                                        key={block.id || idx}
                                        href={`#${block.id}`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          const el = document.getElementById(
                                            block.id!,
                                          );
                                          if (el) {
                                            el.scrollIntoView({
                                              behavior: "smooth",
                                            });
                                            // Optional: Open the details tag if it's closed
                                            const details =
                                              el.closest("details");
                                            if (details) details.open = true;
                                          }
                                          window.history.pushState(
                                            null,
                                            "",
                                            `#${block.id}`,
                                          );
                                        }}
                                        className="block py-1 pl-3 text-[12px] transition-colors border-l border-transparent hover:opacity-70"
                                        style={{ color: "var(--pb-text-muted)" }}
                                      >
                                        {block.title}
                                      </a>
                                    ) : null,
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content & Right Sidebar ─── */}
      {children}
    </div>
  );
}
