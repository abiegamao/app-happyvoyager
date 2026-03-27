"use client";

import { CheckCircle, Clock, Copy, Menu } from "lucide-react";
import { useState, useEffect } from "react";

type ContentBlock =
    | { type: "intro"; text: string }
    | { type: "highlight"; label?: string; items: string[] }
    | { type: "checklist"; label?: string; items: string[] }
    | { type: "callout"; icon: string; text: string; bgClass?: string; borderClass?: string };

type Section = {
    id: string;
    title: string;
    content: ContentBlock[];
};

const sections: Section[] = [
    {
        id: "overview",
        title: "Overview",
        content: [
            {
                type: "intro",
                text: "Spain’s Digital Nomad Visa (officially “Visado de Teletrabajador”) allows non-EU remote workers to live legally in Spain while working for companies or clients outside Spain. It’s one of Europe’s most attractive options for digital nomads. Introduced in 2023 as part of Spain’s Startup Act, the visa lets non-EU citizens (including UK nationals) live & work remotely in Spain for up to five years."
            }
        ]
    },
    {
        id: "eligibility",
        title: "Who is eligible?",
        content: [
            {
                type: "highlight",
                label: "Basic Qualifications",
                items: [
                    "Age: 18+",
                    "Nationality: Non-EU/EEA citizens only",
                    "Work Status: Remote employee OR freelancer/entrepreneur",
                    "Professional credentials: A university degree (bachelor’s or higher), OR 3+ years documented work experience in your field"
                ]
            },
            {
                type: "highlight",
                label: "Income Requirements (2026)",
                items: [
                    "Single applicant: €2,894/month minimum (gross, before taxes)",
                    "With spouse/partner: €4,017/month minimum",
                    "Each additional dependent: Add 25% of base amount"
                ]
            },
            {
                type: "callout",
                icon: "�",
                text: "Note: These thresholds are tied to Spain’s minimum wage and can increase over time.",
                bgClass: "bg-[#F1F1EF]",
                borderClass: "border-transparent text-[#37352f]"
            },
            {
                type: "checklist",
                label: "Other Requirements",
                items: [
                    "Clean criminal record (past 5 years)",
                    "Valid passport with at least 12+ months remaining",
                    "Private health insurance valid in Spain",
                    "Applicant must not have been a resident in Spain in the past 5 years"
                ]
            }
        ]
    },
    {
        id: "work-requirements",
        title: "Work Requirements",
        content: [
            {
                type: "highlight",
                label: "For employees:",
                items: [
                    "You must have an employment contract with a company outside Spain",
                    "Company must have been operating for 1+ year",
                    "You need a letter from your employer confirming remote work permission"
                ]
            },
            {
                type: "highlight",
                label: "For freelancers:",
                items: [
                    "At least 80% of your income must come from clients outside Spain",
                    "You can work up to 20% for Spanish clients",
                    "Your business must be established for 1+ year"
                ]
            }
        ]
    },
    {
        id: "getting-into-spain",
        title: "Getting into Spain",
        content: [
            {
                type: "intro",
                text: "If you use the UGE route (online application via Unit for Large Enterprises & Strategic Collectives), you might need a Schengen visa to enter Spain first (if your nationality requires it)."
            },
            {
                type: "callout",
                icon: "🌍",
                text: "FUN FACT: Did you know that you can get a Schengen Visa from any country regardless if you’re just a tourist?\n\nYou just need to prove:\n✔ You’re a long-term traveller (been out of your country for more than 6 months+)\nor..\n✔ You have an exceptional circumstance. Read more about it here.\n\nI did this twice in the USA 🇺🇸 and Bosnia 🇧🇦 via the Netherlands Embassy. 👉 Here’s the proof.\n\nI love applying via the Netherlands as they have been really generous. I always get 90-days multiple entry even when I only requested for 2-weeks. I heard you can do this via France Embassy as well. But they tend to give you lesser days than Netherlands.",
                bgClass: "bg-[#EDF3EC]", // Notion's light green info box
                borderClass: "border-[#D1E2CD]"
            },
            {
                type: "intro",
                text: "If you want to apply via Netherlands 🇳🇱 like I did, here’s how to start."
            }
        ]
    }
];

export default function ChapterOnePage() {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);
    const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

    // Setup intersection observer to highlight TOC
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find all intersecting entries
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Pick the one closest to the top
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("playbook_progress_ch1");
        if (saved) {
            try {
                setCompletedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }
    }, []);

    const toggleItem = (itemText: string) => {
        const newCompleted = { ...completedItems, [itemText]: !completedItems[itemText] };
        setCompletedItems(newCompleted);
        localStorage.setItem("playbook_progress_ch1", JSON.stringify(newCompleted));
    };

    return (
        <div className="flex w-full h-full bg-white text-[#37352f] font-sans">
            {/* Main Content */}
            <div className="flex-1 px-[calc(min(64px,5vw))] lg:px-12">
                <div className="max-w-[840px] pl-0 lg:pl-10 mx-auto w-full">
                    {/* Header tags (like Notion small headers) */}
                    <div className="text-[#37352f] font-semibold text-[14px] mb-3">
                        Get started
                    </div>

                    {/* Chapter Title Row */}
                    <div className="flex items-start justify-between mb-6 gap-4">
                        <h1 className="text-[36px] leading-[1.1] font-bold text-[#37352f] tracking-tight">
                            What’s this visa about and do I qualify?
                        </h1>
                        <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-transparent hover:bg-[#efefed] border border-[#EAE9E9] text-[13px] font-medium transition-colors whitespace-nowrap text-[#37352f] mt-1 shadow-sm">
                            <Copy className="w-[14px] h-[14px]" />
                            Copy page
                            <svg className="w-3.5 h-3.5 ml-1 opacity-50 border-l border-[#EAE9E9] pl-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                    </div>

                    <p className="text-[#37352f] text-[18px] leading-[1.6] mb-12 pb-0 opacity-90">
                        Learn all about the requirements, eligibility criteria, and basic facts of the Spain Digital Nomad Visa.
                    </p>

                    {/* Content Blocks */}
                    <div className="space-y-8">
                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-24">
                                <h2 className="text-2xl font-semibold text-[#37352f] mb-4 mt-8 tracking-tight">
                                    {section.title}
                                </h2>

                                <div className="space-y-4">
                                    {section.content.map((block, bIdx) => {
                                        if (block.type === "intro") {
                                            return (
                                                <p
                                                    key={bIdx}
                                                    className="text-[#37352f] text-base leading-relaxed"
                                                >
                                                    {block.text}
                                                </p>
                                            );
                                        }

                                        if (block.type === "callout") {
                                            return (
                                                <div
                                                    key={bIdx}
                                                    className={`flex items-start gap-3 p-4 rounded bg-[#f1f1ef] ${block.bgClass || "bg-[#f1f1ef]"
                                                        } border ${block.borderClass || "border-transparent"} my-4`}
                                                >
                                                    <span className="text-xl leading-none flex-shrink-0 mt-0.5">
                                                        {block.icon}
                                                    </span>
                                                    <div className="text-[#37352f] text-[15px] leading-relaxed whitespace-pre-wrap">
                                                        {block.text}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (block.type === "highlight") {
                                            return (
                                                <div key={bIdx} className="my-4">
                                                    {block.label && (
                                                        <h3 className="font-semibold text-[#37352f] text-base mb-2 select-text">
                                                            {block.label}
                                                        </h3>
                                                    )}
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        {block.items.map((item, i) => (
                                                            <li key={i} className="text-[15px] text-[#37352f] leading-relaxed pl-1">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }

                                        if (block.type === "checklist") {
                                            return (
                                                <div key={bIdx} className="my-4">
                                                    {block.label && (
                                                        <h3 className="font-semibold text-[#37352f] text-base mb-2">
                                                            {block.label}
                                                        </h3>
                                                    )}
                                                    <div className="space-y-1.5">
                                                        {block.items.map((item, i) => {
                                                            const isChecked = completedItems[item] || false;
                                                            return (
                                                                <label
                                                                    key={i}
                                                                    className="flex items-start gap-2.5 cursor-pointer group hover:bg-[#efefed] rounded p-1 -ml-1 transition-colors"
                                                                >
                                                                    <div className="mt-[3px] App-Notion-checkbox relative cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="peer sr-only"
                                                                            checked={isChecked}
                                                                            onChange={() => toggleItem(item)}
                                                                        />
                                                                        <div className="w-[15px] h-[15px] rounded-[3px] border border-[#d3d1cb] bg-white transition-colors peer-checked:bg-[#2383e2] peer-checked:border-[#2383e2] flex items-center justify-center">
                                                                            {isChecked && (
                                                                                <svg viewBox="0 0 14 14" className="w-3 h-3 text-white fill-current">
                                                                                    <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
                                                                                </svg>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <span className={`text-[15px] leading-relaxed select-text ${isChecked ? "text-[#787774] line-through opacity-70" : "text-[#37352f]"}`}>
                                                                        {item}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Notion Table of Contents) */}
            <aside className="hidden xl:block w-64 flex-shrink-0 pt-16 pr-8">
                <div className="sticky top-24">
                    <div className="text-xs font-semibold text-[#787774] tracking-wide mb-3 flex items-center gap-2">
                        <Menu className="w-3 h-3" strokeWidth={3} />
                        On this page
                    </div>
                    <nav className="pl-4 border-l border-[#EAE9E9] flex flex-col gap-1.5">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`text-[13px] leading-[1.3] truncate transition-colors py-0.5 ${activeSection === section.id
                                    ? "text-[#37352f] font-semibold"
                                    : "text-[#787774] hover:text-[#37352f]"
                                    }`}
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </div>
            </aside>
        </div>
    );
}
