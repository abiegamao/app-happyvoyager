"use client";

import {
    BookOpen,
    CheckCircle,
    ChevronRight,
    Search,
    FileText,
    Menu,
    X,
    ExternalLink,
    ArrowRight,
    Clock,
    Home
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
    userName?: string;
}

type ContentBlock =
    | { type: "intro"; text: string }
    | { type: "highlight"; label?: string; items: string[] }
    | { type: "checklist"; label?: string; items: string[] }
    | { type: "callout"; icon: string; text: string; bgClass?: string; borderClass?: string }
    | { type: "steps"; items: { step: string; title: string; desc: string }[] }
    | { type: "docList"; categories: { label: string; docs: string[] }[] }
    | { type: "linkList"; label?: string; items: { label: string; url: string }[] };

type Section = {
    id: string;
    emoji: string;
    title: string;
    content: ContentBlock[];
};

const sections: Section[] = [
    {
        id: "what-is-it",
        emoji: "🇪🇸",
        title: "What’s Spain’s Digital Nomad Visa?",
        content: [
            {
                type: "intro",
                text: "Spain’s Digital Nomad Visa (officially “Visado de Teletrabajador”) allows non-EU remote workers to live legally in Spain while working for companies or clients outside Spain. It’s one of Europe’s most attractive options for digital nomads. Introduced in 2023 as part of Spain’s Startup Act, the visa lets non-EU citizens (including UK nationals) live & work remotely in Spain for up to five years."
            }
        ]
    },
    {
        id: "eligibility",
        emoji: "📋",
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
                icon: "📝",
                text: "Note: These thresholds are tied to Spain’s minimum wage and can increase over time.",
                bgClass: "bg-[#e7ddd3]/30",
                borderClass: "border-[#e7ddd3]"
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
        emoji: "💻",
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
        emoji: "✈️",
        title: "Getting into Spain",
        content: [
            {
                type: "intro",
                text: "If you use the UGE route (online application via Unit for Large Enterprises & Strategic Collectives), you might need a Schengen visa to enter Spain first (if your nationality requires it)."
            },
            {
                type: "callout",
                icon: "💡",
                text: "FUN FACT: Did you know that you can get a Schengen Visa from any country regardless if you’re just a tourist?\n\nYou just need to prove:\n✔ You’re a long-term traveller (been out of your country for more than 6 months+)\nor..\n✔ You have an exceptional circumstance. Read more about it here.\n\nI did this twice in the USA 🇺🇸 and Bosnia 🇧🇦 via the Netherlands Embassy. 👉 Here’s the proof.\n\nI love applying via the Netherlands as they have been really generous. I always get 90-days multiple entry even when I only requested for 2-weeks. I heard you can do this via France Embassy as well. But they tend to give you lesser days than Netherlands.",
                bgClass: "bg-[#f2d6c9]/40",
                borderClass: "border-[#f2d6c9]"
            },
            {
                type: "intro",
                text: "If you want to apply via Netherlands 🇳🇱 like I did, here’s how to start."
            }
        ]
    }
];

export default function PlaybookContent({ userName }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    // Setup intersection observer to highlight TOC
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -80% 0px" }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Local storage for checklist items
    const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const saved = localStorage.getItem("playbook_progress");
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
        localStorage.setItem("playbook_progress", JSON.stringify(newCompleted));
    };

    return (
        <div className="min-h-screen flex bg-[#f9f5f2]">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar (Main Nav) */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-[#e7ddd3] z-50 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 border-b border-[#e7ddd3] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#e3a99c]" />
                        <span className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a]">
                            Happy Voyager
                        </span>
                    </Link>
                    <button
                        className="lg:hidden text-[#6b6b6b] hover:text-[#3a3a3a]"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="mb-6 relative">
                        <Search className="w-4 h-4 text-[#aaaaaa] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search playbook..."
                            className="w-full bg-[#f9f5f2] border border-[#e7ddd3] rounded-lg py-2 pl-9 pr-4 text-sm font-[family-name:var(--font-body)] text-[#3a3a3a] focus:outline-none focus:border-[#e3a99c] transition-colors"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="px-3 mb-2 text-xs font-bold text-[#aaaaaa] uppercase tracking-wider font-[family-name:var(--font-heading)]">
                            Chapters
                        </div>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e3a99c]/10 text-[#e3a99c] font-medium font-[family-name:var(--font-body)]"
                        >
                            <span className="w-5 text-center">📖</span>
                            Ch 1: Visa & Eligibility
                        </Link>
                        {/* Placeholders for future chapters */}
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#6b6b6b] hover:bg-[#f9f5f2] hover:text-[#3a3a3a] transition-colors font-medium font-[family-name:var(--font-body)] opacity-60 pointer-events-none"
                        >
                            <span className="w-5 text-center">🔒</span>
                            Ch 2: Application Process (Coming Next)
                        </Link>
                    </div>
                </div>

                <div className="p-4 border-t border-[#e7ddd3]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3a3a3a] flex items-center justify-center text-white font-bold text-sm">
                            {userName ? userName[0].toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-[#3a3a3a] truncate">
                                {userName || "Pro User"}
                            </div>
                            <div className="text-xs text-[#e3a99c]">Playbook Pro</div>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="mt-4 flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#3a3a3a] transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Bar */}
                <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e7ddd3] px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -ml-2 text-[#3a3a3a] hover:bg-[#f9f5f2] rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="font-[family-name:var(--font-heading)] font-bold text-[#3a3a3a] text-sm">
                        Chapter 1
                    </span>
                    <div className="w-5" /> {/* Spacer for centering */}
                </header>

                <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-10 lg:py-16">
                    <div className="max-w-3xl mx-auto">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm text-[#aaaaaa] font-[family-name:var(--font-body)] mb-8">
                            <span>Playbook Pro</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span className="text-[#3a3a3a] font-medium">Chapter 1: Eligibility</span>
                        </nav>

                        {/* Chapter Hero */}
                        <div className="mb-14">
                            <h1 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold text-[#3a3a3a] leading-tight mb-4">
                                What’s this visa about and do I qualify?
                            </h1>
                            <p className="font-[family-name:var(--font-body)] text-xl text-[#6b6b6b] leading-relaxed">
                                The essential criteria you need to meet before starting your Spain Digital Nomad Visa journey.
                            </p>
                            <div className="flex items-center gap-4 mt-6 text-sm text-[#6b6b6b]">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> 5 min read
                                </span>
                            </div>
                        </div>

                        {/* Content Blocks */}
                        <div className="space-y-16">
                            {sections.map((section) => (
                                <section key={section.id} id={section.id} className="scroll-mt-24">
                                    <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#3a3a3a] mb-6 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3a3a3a] text-xl flex-shrink-0 shadow-sm">
                                            {section.emoji}
                                        </span>
                                        {section.title}
                                    </h2>

                                    <div className="space-y-6">
                                        {section.content.map((block, bIdx) => {
                                            if (block.type === "intro") {
                                                return (
                                                    <p
                                                        key={bIdx}
                                                        className="font-[family-name:var(--font-body)] text-[#3a3a3a] text-lg leading-[1.8]"
                                                    >
                                                        {block.text}
                                                    </p>
                                                );
                                            }

                                            if (block.type === "callout") {
                                                return (
                                                    <div
                                                        key={bIdx}
                                                        className={`flex items-start gap-4 p-6 rounded-2xl border ${block.bgClass || "bg-[#e3a99c]/10"
                                                            } ${block.borderClass || "border-[#e3a99c]/20"}`}
                                                    >
                                                        <span className="text-2xl flex-shrink-0 mt-1">
                                                            {block.icon}
                                                        </span>
                                                        <div className="font-[family-name:var(--font-body)] text-[#3a3a3a] leading-relaxed whitespace-pre-wrap">
                                                            {block.text}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            if (block.type === "highlight") {
                                                return (
                                                    <div
                                                        key={bIdx}
                                                        className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e7ddd3] shadow-sm"
                                                    >
                                                        {block.label && (
                                                            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-5">
                                                                {block.label}
                                                            </h3>
                                                        )}
                                                        <ul className="space-y-4">
                                                            {block.items.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-3">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#e3a99c] flex-shrink-0 mt-2.5" />
                                                                    <span className="font-[family-name:var(--font-body)] text-base text-[#3a3a3a] leading-relaxed">
                                                                        {item}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                );
                                            }

                                            if (block.type === "checklist") {
                                                return (
                                                    <div
                                                        key={bIdx}
                                                        className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e7ddd3] shadow-sm"
                                                    >
                                                        {block.label && (
                                                            <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-5">
                                                                {block.label}
                                                            </h3>
                                                        )}
                                                        <ul className="space-y-3">
                                                            {block.items.map((item, i) => {
                                                                const isChecked = completedItems[item] || false;
                                                                return (
                                                                    <li
                                                                        key={i}
                                                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f9f5f2] transition-colors cursor-pointer group"
                                                                        onClick={() => toggleItem(item)}
                                                                    >
                                                                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? "bg-[#bbcccd] border-[#bbcccd]" : "border-[#aaaaaa] group-hover:border-[#e3a99c]"}`}>
                                                                            {isChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                                                        </div>
                                                                        <span className={`font-[family-name:var(--font-body)] text-base leading-relaxed transition-colors ${isChecked ? "text-[#aaaaaa] line-through" : "text-[#3a3a3a]"}`}>
                                                                            {item}
                                                                        </span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                );
                                            }

                                            return null;
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Next Chapter CTA */}
                        <div className="mt-20 pt-10 border-t border-[#e7ddd3]">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-[#e7ddd3] shadow-sm">
                                <div>
                                    <div className="text-sm text-[#aaaaaa] font-bold tracking-wider uppercase mb-1 font-[family-name:var(--font-heading)]">Up Next</div>
                                    <h3 className="text-xl font-bold text-[#3a3a3a] font-[family-name:var(--font-heading)]">Chapter 2: Application Process</h3>
                                </div>
                                <button className="px-6 py-3 rounded-xl bg-[#e3a99c] text-white font-bold font-[family-name:var(--font-body)] hover:bg-[#d4998c] transition-colors shadow-md flex items-center gap-2 flex-shrink-0 opacity-50 cursor-not-allowed">
                                    Next Chapter <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar (Table of Contents) */}
            <aside className="hidden xl:block w-72 h-screen sticky top-0 overflow-y-auto px-6 py-12">
                <div className="font-[family-name:var(--font-heading)] text-sm font-bold text-[#3a3a3a] uppercase tracking-wider mb-6 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#aaaaaa]" />
                    On this page
                </div>
                <nav className="space-y-3 relative before:absolute before:inset-y-0 before:left-[7px] before:w-px before:bg-[#e7ddd3]">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className={`flex items-start gap-4 text-sm font-[family-name:var(--font-body)] transition-colors relative ${activeSection === section.id
                                ? "text-[#e3a99c] font-bold"
                                : "text-[#6b6b6b] hover:text-[#3a3a3a]"
                                }`}
                        >
                            <div className={`w-4 h-4 rounded-full border-[3px] flex-shrink-0 mt-0.5 z-10 transition-colors ${activeSection === section.id
                                ? "bg-white border-[#e3a99c]"
                                : "bg-[#f9f5f2] border-transparent"
                                }`} />
                            {section.title}
                        </a>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
