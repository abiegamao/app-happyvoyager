"use client";

import { useState, useEffect, useRef } from "react";
import { Search, FileText, BookOpen, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { phases } from "@/app/playbook/spain-dnv/data";
import { guides } from "@/app/playbook/spain-dnv/guides/data";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  type: "lesson" | "guide" | "section";
  path: string;
  category: string;
}

function extractText(blocks: any[]): string {
  return blocks
    .map((c) => {
      if (c.type === "intro" || c.type === "callout") return c.text || "";
      if (c.type === "highlight" || c.type === "checklist")
        return `${c.label || ""} ${c.items?.join(" ") || ""}`;
      if (c.type === "table")
        return `${c.headers?.join(" ") || ""} ${c.rows?.flat().join(" ") || ""}`;
      if (c.type === "expandable")
        return `${c.title} ${extractText(c.content)}`;
      return "";
    })
    .join(" ");
}

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Indexing logic
  const items: SearchItem[] = [
    // Lessons
    ...phases.flatMap((phase) =>
      phase.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        searchable: `${lesson.title} ${lesson.description} ${lesson.bullets.join(" ")}`,
        type: "lesson" as const,
        path: `/playbook/spain-dnv/lessons/lesson-${parseInt(lesson.number)}`,
        category: `${phase.phase}: ${phase.title}`,
      }))
    ),
    // Guides
    ...guides.map((guide) => ({
      id: guide.id,
      title: guide.title,
      description: guide.subtitle,
      searchable: `${guide.title} ${guide.subtitle || ""}`,
      type: "guide" as const,
      path: `/playbook/spain-dnv/guides/${guide.id}`,
      category: "Guides",
    })),
    // Sections within guides
    ...guides.flatMap((guide) =>
      guide.sections.map((section) => {
        const sectionContent = extractText(section.content);
        const introBlock = section.content.find((c) => c.type === "intro") as
          | { text: string }
          | undefined;

        return {
          id: section.id,
          title: section.title,
          description: introBlock?.text,
          searchable: `${section.title} ${sectionContent}`,
          type: "section" as const,
          path: `/playbook/spain-dnv/guides/${guide.id}#${section.id}`,
          category: guide.title,
        };
      })
    ),
  ];

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(" ");
    const filtered = items
      .filter((item) => {
        const content = (item as any).searchable.toLowerCase();
        return searchTerms.every((term) => content.includes(term));
      })
      .slice(0, 8); // Limit results

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (item: SearchItem) => {
    router.push(item.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-5">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
            style={{ backgroundColor: "var(--pb-overlay)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-[650px] backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: "var(--pb-surface-elevated)", border: "1px solid var(--pb-border)" }}
          >
            <div className="flex items-center px-4 py-3" style={{ borderBottom: "1px solid var(--pb-border)" }}>
              <Search className="w-5 h-5 mr-3" style={{ color: "var(--pb-text-muted)" }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search lessons, guides, or keywords..."
                className="flex-1 bg-transparent border-none outline-none text-[16px]"
                style={{ color: "var(--pb-text)" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] font-medium" style={{ backgroundColor: "var(--pb-input-bg)", color: "var(--pb-text-muted)" }}>
                ESC
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto py-2">
              {query === "" ? (
                <div className="px-6 py-10 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                    <Command className="w-6 h-6" style={{ color: "var(--pb-text-muted)" }} />
                  </div>
                  <h3 className="text-[14px] font-semibold mb-1" style={{ color: "var(--pb-text)" }}>
                    Search Playbook Pro
                  </h3>
                  <p className="text-[13px]" style={{ color: "var(--pb-text-muted)" }}>
                    Type keywords to find documentation, checklists, and roadmap lessons.
                  </p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-1 px-2">
                  {results.map((item, index) => (
                    <button
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className="flex items-start gap-3 w-full p-3 rounded-xl text-left transition-colors"
                      style={{ backgroundColor: selectedIndex === index ? "var(--pb-surface-hover)" : "transparent" }}
                    >
                      <div className="mt-0.5">
                        {item.type === "lesson" ? (
                          <FileText className="w-4 h-4" style={{ color: "var(--pb-text-muted)" }} />
                        ) : (
                          <BookOpen className="w-4 h-4" style={{ color: "var(--pb-text-muted)" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>
                            {item.title}
                          </span>
                          <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ color: "var(--pb-text-muted)", backgroundColor: "var(--pb-input-bg)" }}>
                            {item.type}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-[12px] line-clamp-1 mb-1" style={{ color: "var(--pb-text-muted)" }}>
                            {item.description}
                          </p>
                        )}
                        <div className="text-[11px] flex items-center gap-1" style={{ color: "var(--pb-text-muted)" }}>
                          {item.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-10 text-center">
                  <p className="text-[14px]" style={{ color: "var(--pb-text-muted)" }}>
                    No results found for "{query}"
                  </p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 flex items-center justify-between text-[11px]" style={{ backgroundColor: "var(--pb-surface)", borderTop: "1px solid var(--pb-border)", color: "var(--pb-text-muted)" }}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)" }}>
                    ↑↓
                  </span>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)" }}>
                    ENTER
                  </span>{" "}
                  Select
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
