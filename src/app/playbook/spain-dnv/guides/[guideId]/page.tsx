"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { guides, type ContentBlock } from "../data";
import { use } from "react";
import Link from "next/link";

export default function GuidePage(props: { params: Promise<{ guideId: string }> }) {
  const params = use(props.params);
  const guideId = params.guideId;
  const activeGuide = guides.find((g) => g.id === guideId) || guides[0];
  const currentIndex = guides.findIndex((g) => g.id === guideId);
  const prevGuide = guides[currentIndex - 1] ?? null;
  const nextGuide = guides[currentIndex + 1] ?? null;

  const [activeSection, setActiveSection] = useState<string>("");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; originX: number; originY: number }>({
    dragging: false, startX: 0, startY: 0, originX: 0, originY: 0,
  });

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    dragState.current = { dragging: true, startX: e.clientX, startY: e.clientY, originX: pan.x, originY: pan.y };
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    setPan({
      x: dragState.current.originX + (e.clientX - dragState.current.startX),
      y: dragState.current.originY + (e.clientY - dragState.current.startY),
    });
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current.dragging = false;
  }, []);

  // Reset pan when zoom returns to 1
  useEffect(() => {
    if (zoom <= 1) setPan({ x: 0, y: 0 });
  }, [zoom]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  // Intersection observer for TOC highlighting
  useEffect(() => {
    if (!activeGuide.sections.length) return;
    setActiveSection(activeGuide.sections[0]?.id || "");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    activeGuide.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeGuide]);

  // Load checklist progress
  useEffect(() => {
    const saved = localStorage.getItem(`playbook_guide_progress_${guideId}`);
    if (saved) {
      try {
        setCompletedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse guide progress", e);
      }
    } else {
      setCompletedItems({});
    }
  }, [guideId]);

  const toggleItem = (itemText: string) => {
    const updated = {
      ...completedItems,
      [itemText]: !completedItems[itemText],
    };
    setCompletedItems(updated);
    localStorage.setItem(
      `playbook_guide_progress_${guideId}`,
      JSON.stringify(updated)
    );
  };

  // Converts **bold** markers in a plain string to <strong> nodes
  const applyBold = (str: string, keyPrefix: string): React.ReactNode[] => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${keyPrefix}-b${idx}`} className="font-semibold" style={{ color: "var(--pb-text)" }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderText = (text: string) => {
    // Split by markdown links [label](url) or bare URLs
    const combinedRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
    const segments = text.split(combinedRegex);

    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < segments.length) {
      const plain = segments[i];
      if (plain) result.push(...applyBold(plain, `t${i}`));

      if (i + 1 < segments.length) {
        const label = segments[i + 1];
        const url = segments[i + 2];
        const rawUrl = segments[i + 3];

        if (label && url) {
          result.push(
            <a key={`link-${i}`} href={url} target="_blank" rel="noopener noreferrer" className="text-[#e3a99c] hover:underline underline-offset-4">
              {label}
            </a>
          );
        } else if (rawUrl) {
          result.push(
            <a key={`link-${i}`} href={rawUrl} target="_blank" rel="noopener noreferrer" className="text-[#e3a99c] hover:underline underline-offset-4">
              {rawUrl}
            </a>
          );
        }
      }
      i += 4;
    }

    return result.length > 0 ? result : text;
  };

  return (
    <>
      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0">
        <div className="px-6 lg:px-12 py-0">
          <div className="max-w-[720px] mx-auto">
            {/* Subtitle + Free badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-semibold text-[14px]" style={{ color: "var(--pb-text-secondary)" }}>
                {activeGuide.subtitle}
              </span>
              <span className="text-[11px] font-semibold text-[#8fa38d] bg-[#8fa38d]/15 px-2 py-0.5 rounded-full">
                Free Guide
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[32px] lg:text-[36px] leading-[1.1] font-bold tracking-tight mb-3" style={{ color: "var(--pb-text)" }}>
              {activeGuide.title}
            </h1>

            {/* Sections */}
            <div className="space-y-8 mt-8">
              {activeGuide.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-semibold mb-4 mt-8 tracking-tight" style={{ color: "var(--pb-text)" }}>
                    {section.title}
                  </h2>

                  <div className="space-y-4">
                    {section.content.map((block, bIdx) => {
                      const renderBlock = (block: ContentBlock, key: string | number) => {
                        if (block.type === "intro") {
                          return (
                            <p
                              key={key}
                              className="text-base leading-relaxed"
                              style={{ color: "var(--pb-text-secondary)" }}
                            >
                              {renderText(block.text)}
                            </p>
                          );
                        }

                        if (block.type === "callout") {
                          return (
                            <div
                              key={key}
                              className="flex items-start gap-3 p-4 rounded-xl my-4"
                              style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)" }}
                            >
                              <span className="text-xl leading-none flex-shrink-0 mt-0.5">
                                {block.icon}
                              </span>
                              <div className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ color: "var(--pb-text-secondary)" }}>
                                {renderText(block.text)}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "highlight") {
                          return (
                            <div key={key} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--pb-text)" }}>
                                  {block.label}
                                </h3>
                              )}
                              <ul className="list-disc pl-6 space-y-1" style={{ "--tw-marker-color": "var(--pb-text-muted)" } as React.CSSProperties}>
                                {block.items.map((item: string, i: number) => (
                                  <li
                                    key={i}
                                    className="text-[15px] leading-relaxed pl-1 marker:text-[var(--pb-text-muted)]"
                                    style={{ color: "var(--pb-text-secondary)" }}
                                  >
                                    {renderText(item)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        }

                        if (block.type === "checklist") {
                          return (
                            <div key={key} className="my-4">
                              {block.label && (
                                <h3 className="font-semibold text-base mb-2" style={{ color: "var(--pb-text)" }}>
                                  {block.label}
                                </h3>
                              )}
                              <div className="space-y-1.5">
                                {block.items.map((item: string, i: number) => {
                                  const isChecked = completedItems[item] || false;
                                  return (
                                    <label
                                      key={i}
                                      className="flex items-start gap-2.5 cursor-pointer group rounded-lg p-1 -ml-1 transition-colors"
                                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--pb-surface)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                      <div className="mt-[3px] relative cursor-pointer">
                                        <input
                                          type="checkbox"
                                          className="peer sr-only"
                                          checked={isChecked}
                                          onChange={() => toggleItem(item)}
                                        />
                                        <div
                                          className="w-[15px] h-[15px] rounded-[3px] transition-colors peer-checked:bg-[#e3a99c] peer-checked:border-[#e3a99c] flex items-center justify-center"
                                          style={{ backgroundColor: isChecked ? undefined : "var(--pb-input-bg)", border: isChecked ? undefined : "1px solid var(--pb-border)" }}
                                        >
                                          {isChecked && (
                                            <svg
                                              viewBox="0 0 14 14"
                                              className="w-3 h-3 text-white fill-current"
                                            >
                                              <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039" />
                                            </svg>
                                          )}
                                        </div>
                                      </div>
                                      <span
                                        className={`text-[15px] leading-relaxed select-text ${
                                          isChecked
                                            ? "line-through opacity-70"
                                            : ""
                                        }`}
                                        style={{ color: isChecked ? "var(--pb-text-muted)" : "var(--pb-text-secondary)" }}
                                      >
                                        {renderText(item)}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        if (block.type === "image") {
                          return (
                            <div key={key} className="my-8">
                              <div
                                className="rounded-xl overflow-hidden transition-all hover:shadow-md cursor-zoom-in"
                                style={{ border: "1px solid var(--pb-border)", backgroundColor: "var(--pb-surface)" }}
                                onClick={() => openLightbox(block.src, block.alt || "Guide image")}
                                title="Click to enlarge"
                              >
                                <img
                                  src={block.src}
                                  alt={block.alt || "Guide image"}
                                  className="w-full h-auto object-cover max-h-[480px]"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543733394-970364f3fa02?q=80&w=1000&auto=format&fit=crop";
                                  }}
                                />
                              </div>
                              {block.caption && (
                                <p className="text-[13px] mt-2 text-center italic" style={{ color: "var(--pb-text-muted)" }}>
                                  {block.caption}
                                </p>
                              )}
                            </div>
                          );
                        }

                        if (block.type === "divider") {
                          return (
                            <hr
                              key={key}
                              className="my-8 border-t"
                              style={{ borderColor: "var(--pb-border)" }}
                            />
                          );
                        }

                        if (block.type === "table") {
                          return (
                            <div
                              key={key}
                              className="my-6 overflow-hidden rounded-xl"
                              style={{ border: "1px solid var(--pb-border)" }}
                            >
                              <table className="w-full border-collapse text-left text-[14px]">
                                <thead>
                                  <tr style={{ backgroundColor: "var(--pb-surface)", borderBottom: "1px solid var(--pb-border)" }}>
                                    {block.headers.map((header: string, hIdx: number) => (
                                      <th
                                        key={hIdx}
                                        className="px-4 py-3 font-semibold"
                                        style={{ color: "var(--pb-text)" }}
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody style={{ borderColor: "var(--pb-border)" }}>
                                  {block.rows.map((row: string[], rIdx: number) => (
                                    <tr
                                      key={rIdx}
                                      className="transition-colors"
                                      style={{ borderBottom: rIdx < block.rows.length - 1 ? "1px solid var(--pb-border)" : undefined }}
                                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--pb-surface-hover)")}
                                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                                    >
                                      {row.map((cell: string, cIdx: number) => (
                                        <td
                                          key={cIdx}
                                          className="px-4 py-3 whitespace-pre-wrap leading-relaxed"
                                          style={{ color: "var(--pb-text-secondary)" }}
                                        >
                                          {renderText(cell)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        if (block.type === "expandable") {
                          return (
                            <details
                              key={key}
                              id={block.id}
                              className="group my-4 rounded-xl overflow-hidden"
                              style={{ border: "1px solid var(--pb-border)", backgroundColor: "var(--pb-surface)" }}
                            >
                              <summary
                                className="flex items-center gap-2 p-4 cursor-pointer transition-colors list-none font-medium"
                                style={{ color: "var(--pb-text)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--pb-surface-hover)")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="transition-transform group-open:rotate-90"
                                  style={{ color: "var(--pb-text-muted)" }}
                                >
                                  <path
                                    d="M4 2L8 6L4 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {block.title}
                              </summary>
                              <div className="p-4 pt-0 space-y-4" style={{ borderTop: "1px solid var(--pb-border)", backgroundColor: "var(--pb-surface)" }}>
                                <div className="mt-4">
                                  {block.content.map((nestedBlock: ContentBlock, nIdx: number) =>
                                    renderBlock(nestedBlock, `${key}-nested-${nIdx}`)
                                  )}
                                </div>
                              </div>
                            </details>
                          );
                        }

                        return null;
                      };

                      return renderBlock(block, bIdx);
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Prev / Next Guide Navigation */}
          <div className="pt-8 mt-8 flex flex-col sm:flex-row gap-4" style={{ borderTop: "1px solid var(--pb-border)" }}>
            {prevGuide ? (
              <Link
                href={`/playbook/spain-dnv/guides/${prevGuide.id}`}
                className="flex-1 flex items-center gap-3 p-5 rounded-2xl glass-pb transition-colors group"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--pb-surface-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                <ArrowLeft className="w-4 h-4 transition-colors flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium mb-0.5" style={{ color: "var(--pb-text-muted)" }}>Previous</div>
                  <div className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>{prevGuide.title}</div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextGuide ? (
              <Link
                href={`/playbook/spain-dnv/guides/${nextGuide.id}`}
                className="flex-1 flex items-center justify-end gap-3 p-5 rounded-2xl glass-pb transition-colors group text-right"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--pb-surface-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-medium mb-0.5" style={{ color: "var(--pb-text-muted)" }}>Next</div>
                  <div className="text-[14px] font-semibold truncate" style={{ color: "var(--pb-text)" }}>{nextGuide.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 transition-colors flex-shrink-0" style={{ color: "var(--pb-text-muted)" }} />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

        </div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightbox && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => { if (e.target === lightboxRef.current) closeLightbox(); }}
        >
          {/* Toolbar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.5, 4))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs select-none">
            {Math.round(zoom * 100)}% · scroll to zoom{zoom > 1 ? " · drag to pan" : ""} · Esc to close
          </div>

          {/* Image container */}
          <div
            className="overflow-hidden max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ cursor: zoom > 1 ? (dragState.current.dragging ? "grabbing" : "grab") : "default" }}
            onWheel={(e) => {
              e.preventDefault();
              setZoom((z) => Math.min(Math.max(z - e.deltaY * 0.001, 0.5), 4));
            }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: dragState.current.dragging ? "none" : "transform 0.15s ease",
              }}
              className="max-w-[85vw] max-h-[85vh] rounded-lg shadow-2xl object-contain select-none"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* ─── Right Sidebar: On This Page (Sticky) ─── */}
      <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col sticky top-[32px] max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="pt-0 pr-6 pl-4">
          <div className="text-[13px] font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--pb-text-muted)" }}>
            <Menu className="w-3.5 h-3.5" strokeWidth={2.5} />
            On this page
          </div>
          <nav className="flex flex-col relative ml-1">
            <div className="absolute left-0 top-1 bottom-1 w-[1px] z-0" style={{ backgroundColor: "var(--pb-border)" }} />
            {activeGuide.sections.map((section) => (
              <div key={section.id} className="flex flex-col">
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                    window.history.pushState(null, "", `#${section.id}`);
                  }}
                  className={`text-[13px] leading-[1.4] py-1.5 pl-4 relative z-10 border-l-[2px] transition-colors ${
                    activeSection === section.id
                      ? "font-medium border-[#e3a99c]"
                      : "border-transparent"
                  }`}
                  style={{
                    color: activeSection === section.id
                      ? "var(--pb-text)"
                      : "var(--pb-text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.color = "var(--pb-text-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.color = "var(--pb-text-muted)";
                    }
                  }}
                >
                  {section.title}
                </a>
                {/* Nested expandable blocks in TOC */}
                {section.content.map((block, idx) =>
                  block.type === "expandable" && block.id ? (
                    <a
                      key={block.id || idx}
                      href={`#${block.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(block.id!);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                          const details = el.closest("details");
                          if (details) details.open = true;
                        }
                        window.history.pushState(null, "", `#${block.id}`);
                      }}
                      className="text-[12px] leading-[1.4] py-1 pl-8 pr-2 transition-colors mb-1 border-l-[2px] border-transparent"
                      style={{ color: "var(--pb-text-muted)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pb-text-secondary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--pb-text-muted)")}
                    >
                      {block.title}
                    </a>
                  ) : null
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
