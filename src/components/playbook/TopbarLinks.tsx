"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  IconHome2,
  IconBook,
  IconSchool,
  IconChartBar,
  IconHelpCircle,
} from "@tabler/icons-react";

export function TopbarLinks() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Home",
      href: "/playbook/spain-dnv/home",
      icon: IconHome2,
      active:
        pathname.includes("/home") ||
        pathname === "/playbook/spain-dnv",
    },
    {
      label: "Free Guides",
      href: "/playbook/spain-dnv/guides",
      icon: IconBook,
      active: pathname.includes("/guides"),
    },
    {
      label: "Lessons",
      href: "/playbook/spain-dnv/lessons/lesson-1",
      icon: IconSchool,
      active: pathname.includes("/lessons/"),
    },
    {
      label: "Progress",
      href: "/playbook/spain-dnv/progress",
      icon: IconChartBar,
      active: pathname.includes("/progress"),
    },
    {
      label: "FAQs & Tips",
      href: "/playbook/spain-dnv/faqs-and-tips",
      icon: IconHelpCircle,
      active: pathname.includes("/faqs-and-tips"),
    },
  ];

  return (
    <div
      className="h-[48px] flex items-center justify-center px-4 md:px-6 backdrop-blur-xl shrink-0 overflow-x-auto"
      style={{ backgroundColor: "var(--pb-sidebar)", borderBottom: "1px solid var(--pb-border-subtle)" }}
    >
      <div className="flex items-center w-full max-w-[1400px] mx-auto h-full">
        <nav className="flex items-center gap-1 h-full">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className="relative text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-xl"
              style={{ color: tab.active ? "var(--pb-text)" : "var(--pb-text-muted)" }}
            >
              {tab.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ backgroundColor: "var(--pb-pill-bg)", border: "1px solid var(--pb-border)" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.icon className="w-4 h-4 relative z-[1]" strokeWidth={2} />
              <span className="relative z-[1]">{tab.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
