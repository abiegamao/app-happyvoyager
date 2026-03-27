"use client";

import Link from "next/link";

const socialLinks = [
  { href: "https://www.instagram.com/abiemaxey/", label: "Instagram" },
  { href: "https://www.threads.net/@abiemaxey", label: "Threads" },
  { href: "https://www.linkedin.com/in/abiemaxey/", label: "LinkedIn" },
  { href: "https://www.youtube.com/@abiemaxey", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#3a3a3a] text-white overflow-hidden pt-16 pb-10">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div>
            <Link href="/dashboard" className="inline-block mb-4 group">
              <img
                src="/assets/logo.png"
                alt="Happy Voyager"
                className="h-9 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The complete system for your Spain Digital Nomad Visa — from eligibility to citizenship.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-medium text-white/60 hover:bg-[#e3a99c] hover:border-[#e3a99c] hover:text-[#3a3a3a] transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4">Playbook</h4>
              <ul className="space-y-3">
                <li><Link href="/playbook/spain-dnv/home" className="text-white/60 hover:text-[#e3a99c] transition-colors">Spain DNV</Link></li>
                <li><Link href="/playbook/spain-dnv/guides" className="text-white/60 hover:text-[#e3a99c] transition-colors">Free Guides</Link></li>
                <li><Link href="/playbook/spain-dnv/progress" className="text-white/60 hover:text-[#e3a99c] transition-colors">My Progress</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Account</h4>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="text-white/60 hover:text-[#e3a99c] transition-colors">Dashboard</Link></li>
                <li><a href="mailto:hello@happyvoyager.com" className="text-white/60 hover:text-[#e3a99c] transition-colors">Support</a></li>
                <li><a href="https://happyvoyager.com/privacy-policy" className="text-white/60 hover:text-[#e3a99c] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-6" />
        <p className="text-white/30 text-xs text-center">
          © {new Date().getFullYear()} Happy Voyager. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
