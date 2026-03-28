"use client";

import {
  Banknote,
  Clock,
  Lightbulb,
  AlertTriangle,
  Target,
  RefreshCcw,
  ShieldAlert,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  MapPin,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function FaqsAndTipsPage() {
  return (
    <div className="min-h-screen font-sans" style={{ color: "var(--pb-text)" }}>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <AnimateIn delay={0}>
          <div className="max-w-[900px] mb-12">
            <h1 className="text-[40px] font-bold leading-tight mb-4" style={{ color: "var(--pb-text)" }}>
              FAQs & Expert <span className="font-script text-[#e3a99c] text-[44px]">Tips</span>
            </h1>
            <p className="text-[18px] leading-relaxed" style={{ color: "var(--pb-text-secondary)" }}>
              Everything else you need to know about the Spain Digital Nomad Visa. Costs, timelines, common pitfalls, and the path to permanent residency.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">

            {/* Costs Section */}
            <AnimateIn delay={0.1}>
              <section id="costs" className="glass-pb-elevated rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                    <Banknote className="w-6 h-6" style={{ color: "var(--pb-text-secondary)" }} />
                  </div>
                  <h2 className="text-[24px] font-bold" style={{ color: "var(--pb-text)" }}>Total DIY Costs</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-[16px] font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--pb-text-secondary)" }}>Document Preparation</h3>
                    <ul className="space-y-3">
                      {[
                        { label: "Criminal Background Check", cost: "$20 – $50" },
                        { label: "Apostille Fees (per doc)", cost: "$20 – $100" },
                        { label: "Translation (per page)", cost: "€20 – €50" },
                        { label: "Passport Photos", cost: "$10 – $20" },
                      ].map((item) => (
                        <li key={item.label} className="flex justify-between text-[15px]">
                          <span style={{ color: "var(--pb-text-muted)" }}>{item.label}</span>
                          <span className="font-medium" style={{ color: "var(--pb-text)" }}>{item.cost}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold mb-4 uppercase tracking-wider" style={{ color: "var(--pb-text-secondary)" }}>Application Fees</h3>
                    <ul className="space-y-3">
                      {[
                        { label: "Visa Application Fee", cost: "€80" },
                        { label: "NIE Application", cost: "€10 – €12" },
                        { label: "TIE Card", cost: "€20" },
                        { label: "Health Insurance (pm)", cost: "€50 – €150" },
                      ].map((item) => (
                        <li key={item.label} className="flex justify-between text-[15px]">
                          <span style={{ color: "var(--pb-text-muted)" }}>{item.label}</span>
                          <span className="font-medium" style={{ color: "var(--pb-text)" }}>{item.cost}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid var(--pb-border)" }}>
                  <div>
                    <p className="text-[14px] italic" style={{ color: "var(--pb-text-muted)" }}>Estimate based on DIY submission with no shortcuts.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-medium uppercase tracking-wider mb-1" style={{ color: "var(--pb-text-muted)" }}>Estimated Total</p>
                    <p className="text-[32px] font-bold" style={{ color: "var(--pb-text)" }}>€400 – €700</p>
                  </div>
                </div>
              </section>
            </AnimateIn>

            {/* Timeline Section */}
            <AnimateIn delay={0.15}>
              <section id="timeline" className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                    <Clock className="w-6 h-6" style={{ color: "var(--pb-text-secondary)" }} />
                  </div>
                  <h2 className="text-[24px] font-bold" style={{ color: "var(--pb-text)" }}>Timeline Expectations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-pb rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" style={{ color: "var(--pb-text-muted)" }} />
                      <h3 className="font-bold" style={{ color: "var(--pb-text)" }}>Consulate Route</h3>
                    </div>
                    <ul className="space-y-3 text-[15px]">
                      {[
                        { time: "1-2m", desc: "Document preparation" },
                        { time: "20-60d", desc: "Consulate processing" },
                        { time: "1-3m", desc: "Travel and TIE application" },
                      ].map((item) => (
                        <li key={item.time} className="flex gap-3">
                          <span className="font-medium" style={{ color: "var(--pb-text-muted)" }}>{item.time}</span>
                          <span style={{ color: "var(--pb-text-secondary)" }}>{item.desc}</span>
                        </li>
                      ))}
                      <li className="pt-3 font-bold flex justify-between" style={{ borderTop: "1px solid var(--pb-border)", color: "var(--pb-text)" }}>
                        <span>Total Time</span>
                        <span>3 – 4 Months</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl p-6 border border-[#e3a99c]/20" style={{ background: "linear-gradient(135deg, rgba(227,169,156,0.1) 0%, rgba(201,168,76,0.08) 100%)" }}>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-[#e3a99c]" />
                      <h3 className="font-bold" style={{ color: "var(--pb-text)" }}>Within Spain (UGE)</h3>
                    </div>
                    <ul className="space-y-3 text-[15px]">
                      {[
                        { time: "Prep Early", desc: "Done before arrival" },
                        { time: "1 Week", desc: "Application submission" },
                        { time: "20 Days", desc: "UGE processing" },
                        { time: "20-30d", desc: "TIE issuance after approval" },
                      ].map((item) => (
                        <li key={item.time} className="flex gap-3">
                          <span className="font-medium whitespace-nowrap" style={{ color: "var(--pb-text-muted)" }}>{item.time}</span>
                          <span style={{ color: "var(--pb-text-secondary)" }}>{item.desc}</span>
                        </li>
                      ))}
                      <li className="pt-3 font-bold flex justify-between" style={{ borderTop: "1px solid var(--pb-border)", color: "var(--pb-text)" }}>
                        <span>Total Time</span>
                        <span>2 – 3 Months</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </AnimateIn>

            {/* Success strategies */}
            <AnimateIn delay={0.2}>
              <section id="strategies" className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                    <Lightbulb className="w-6 h-6" style={{ color: "var(--pb-text-secondary)" }} />
                  </div>
                  <h2 className="text-[24px] font-bold" style={{ color: "var(--pb-text)" }}>Insider Knowledge</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Pros */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#8fa38d]">
                      <CheckCircle2 className="w-5 h-5" />
                      <h3 className="font-bold">Application Success Tips</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { title: "Start Early:", desc: "Apostilles take the longest. Order background checks immediately." },
                        { title: "Over-Document:", desc: "It's better to provide too much proof than to leave gaps for a reviewer to question." },
                        { title: "Methodical Organization:", desc: "Use the folder numbering system we recommended in Guide 4." },
                      ].map((item) => (
                        <li key={item.title} className="p-4 rounded-xl text-[14px]" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>
                          <strong style={{ color: "var(--pb-text)" }}>{item.title}</strong> {item.desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mistakes */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#c0625a]">
                      <AlertTriangle className="w-5 h-5" />
                      <h3 className="font-bold">Common Mistakes</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        { title: "Expired Documents:", desc: "Background checks older than 6 months are invalid." },
                        { title: "Missing Apostilles:", desc: "Every home-country government document MUST be stamped." },
                        { title: "Uncertified Translators:", desc: "Only Spanish \"sworn\" (jurado) translations are valid." },
                      ].map((item) => (
                        <li key={item.title} className="p-4 rounded-xl text-[14px] flex gap-3" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#c0625a]" />
                          <span><strong style={{ color: "var(--pb-text)" }}>{item.title}</strong> {item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-6 rounded-2xl" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)" }}>
                    <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--pb-text)" }}>
                      <Banknote className="w-4 h-4 text-[#c9a84c]" /> Money-Saving
                    </h4>
                    <ul className="space-y-2 text-[13px]" style={{ color: "var(--pb-text-muted)" }}>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> Apply in Spain – yields better residency length for the cost.</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> Bundle translations – ask for family/multiple document discounts.</li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> Choose online-only health insurance like Sanitas or DKV.</li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)" }}>
                    <h4 className="font-bold mb-3 flex items-center gap-2" style={{ color: "var(--pb-text)" }}>
                      <Target className="w-4 h-4 text-[#e3a99c]" /> Lesser-Known Facts
                    </h4>
                    <ul className="space-y-2 text-[13px]" style={{ color: "var(--pb-text-muted)" }}>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> <span><strong style={{ color: "var(--pb-text-secondary)" }}>US W2 Support:</strong> As of 2025, employees are eligible with a Certificate of Coverage.</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> <span><strong style={{ color: "var(--pb-text-secondary)" }}>Beckham Law:</strong> Employees pay flat 24% tax rate (not for Autonomo).</span></li>
                      <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--pb-text-muted)" }}></div> <span><strong style={{ color: "var(--pb-text-secondary)" }}>Schengen:</strong> Travel freely with your 3-year residency permit.</span></li>
                    </ul>
                  </div>
                </div>
              </section>
            </AnimateIn>

            {/* Renewal & Extensions */}
            <AnimateIn delay={0.25}>
              <section id="renewal" className="rounded-2xl p-8 border border-[#e3a99c]/15" style={{ background: "linear-gradient(135deg, rgba(227,169,156,0.08) 0%, rgba(201,168,76,0.06) 100%)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                    <RefreshCcw className="w-6 h-6 text-[#e3a99c]" />
                  </div>
                  <h2 className="text-[24px] font-bold" style={{ color: "var(--pb-text)" }}>Visa Renewal & Extensions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[13px] uppercase tracking-wider mb-2 font-bold" style={{ color: "var(--pb-text-muted)" }}>Renewal Timeline</h3>
                      <div className="space-y-3">
                        {[
                          { num: "01", title: "Initial Period", desc: "Consulate (1yr) vs UGE (3yrs)" },
                          { num: "02", title: "First Renewal", desc: "Extend for 2 more years" },
                          { num: "03", title: "Permanent Residence", desc: "Available after 5 continuous years" },
                        ].map((item) => (
                          <div key={item.num} className="flex gap-4">
                            <div className="text-[20px] font-bold text-[#e3a99c]">{item.num}</div>
                            <div>
                              <p className="font-medium" style={{ color: "var(--pb-text)" }}>{item.title}</p>
                              <p className="text-[13px]" style={{ color: "var(--pb-text-muted)" }}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--pb-text)" }}>
                         <Banknote className="w-4 h-4 text-[#c9a84c]" /> Spanish Citizenship
                      </h4>
                      <p className="text-[14px] leading-relaxed p-4 rounded-xl mb-4" style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>
                        Spain is uniquely generous to certain nationalities regarding citizenship.
                      </p>
                      <ul className="space-y-3 text-[14px]">
                        <li className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-[#8fa38d] shrink-0 mt-1" />
                          <span style={{ color: "var(--pb-text-secondary)" }}><strong style={{ color: "var(--pb-text)" }}>2 Years Only:</strong> For Filipinos and Latin American citizens.</span>
                        </li>
                        <li className="flex gap-3 items-start" style={{ color: "var(--pb-text-muted)" }}>
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" />
                          <span><strong style={{ color: "var(--pb-text-secondary)" }}>10 Years:</strong> Standard requirement for all other nationalities.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </AnimateIn>

             {/* Troubleshooting Rejections */}
             <AnimateIn delay={0.3}>
               <section id="troubleshooting" className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#c0625a]/15 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-[#c0625a]" />
                  </div>
                  <h2 className="text-[24px] font-bold" style={{ color: "var(--pb-text)" }}>Troubleshooting Issues</h2>
                </div>

                <div className="glass-pb rounded-2xl p-8 overflow-hidden relative border border-[#c0625a]/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#c0625a]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold mb-4" style={{ color: "var(--pb-text)" }}>Common Rejection Reasons</h3>
                      <ul className="space-y-2 text-[14px]" style={{ color: "var(--pb-text-secondary)" }}>
                        <li className="flex gap-2">Insufficient proof of income (not being consistent)</li>
                        <li className="flex gap-2">Contracts looking like "Micromanaged Employment" instead of Autonomo</li>
                        <li className="flex gap-2">Criminal record certificate expired during review</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4" style={{ color: "var(--pb-text)" }}>What to do if rejected?</h3>
                      <p className="text-[14px] mb-4" style={{ color: "var(--pb-text-secondary)" }}>Don't panic. You have options.</p>
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl text-[13px] font-medium" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>
                          1. Request Subnación (Detailed Explanation)
                        </div>
                        <div className="p-3 rounded-xl text-[13px] font-medium" style={{ backgroundColor: "var(--pb-surface)", border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>
                          2. Address specific issues and reapply immediately
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </AnimateIn>
          </div>

          {/* Sticky Sidebar Links */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-8 space-y-6">

              {/* Useful Resources */}
              <AnimateIn delay={0.35}>
                <div className="glass-pb-elevated rounded-2xl p-6">
                  <h3 className="text-[16px] font-bold mb-6 flex items-center gap-2" style={{ color: "var(--pb-text)" }}>
                    <LinkIcon className="w-5 h-5" style={{ color: "var(--pb-text-muted)" }} /> Useful Resources
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--pb-text-muted)" }}>Finance & Banks</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {["Santander", "Wise", "Revolut", "N26"].map((bank) => (
                          <a key={bank} href="#" className="p-2 rounded-xl text-[13px] transition-colors text-center" style={{ border: "1px solid var(--pb-border)", color: "var(--pb-text-secondary)" }}>{bank}</a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--pb-text-muted)" }}>Government Portals</h4>
                      <ul className="space-y-2">
                        <li>
                          <a href="https://www.sede.fnmt.gob.es" target="_blank" className="flex items-center justify-between group">
                            <span className="text-[13px] group-hover:opacity-80 transition-colors" style={{ color: "var(--pb-text-secondary)" }}>Digital Certificates</span>
                            <ExternalLink className="w-3.5 h-3.5" style={{ color: "var(--pb-text-muted)" }} />
                          </a>
                        </li>
                        <li>
                          <a href="https://sutramiteconsular.maec.es" target="_blank" className="flex items-center justify-between group">
                            <span className="text-[13px] group-hover:opacity-80 transition-colors" style={{ color: "var(--pb-text-secondary)" }}>Consulate Tracking</span>
                            <ExternalLink className="w-3.5 h-3.5" style={{ color: "var(--pb-text-muted)" }} />
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[12px] font-bold uppercase tracking-wider mb-3" style={{ color: "var(--pb-text-muted)" }}>Follow Abie's Socials</h4>
                      <div className="flex gap-4">
                        {[Youtube, Instagram, Facebook].map((Icon, i) => (
                          <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:text-[#e3a99c] transition-all" style={{ backgroundColor: "var(--pb-input-bg)", color: "var(--pb-text-muted)" }}>
                            <Icon className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Translation Callout */}
              <AnimateIn delay={0.4}>
                <div className="rounded-2xl p-6 border border-[#c9a84c]/20" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 100%)" }}>
                  <h4 className="font-bold text-[#c9a84c] mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Need Translation?
                  </h4>
                  <p className="text-[13px] mb-4" style={{ color: "var(--pb-text-secondary)" }}>
                    Spanish reviewers only accept <strong style={{ color: "var(--pb-text)" }}>Sworn Translations</strong>. Most agencies charge €30-70 per page.
                  </p>
                  <div className="rounded-xl p-3 text-center" style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)" }}>
                    <p className="text-[12px] font-medium mb-1" style={{ color: "var(--pb-text-muted)" }}>Our Rate</p>
                    <p className="text-[20px] font-bold" style={{ color: "var(--pb-text)" }}>€18–25 / page</p>
                  </div>
                  <button className="w-full mt-4 bg-[#c9a84c] text-[#2a2a2a] py-2 rounded-xl text-[13px] font-bold hover:bg-[#d4b35e] transition-colors">
                    Contact Specialist
                  </button>
                </div>
              </AnimateIn>

              {/* Support Callout */}
              <AnimateIn delay={0.45}>
                <div className="p-6 glass-pb-elevated rounded-2xl text-center">
                  <HelpCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--pb-text-muted)" }} />
                  <h3 className="font-bold mb-2" style={{ color: "var(--pb-text)" }}>Still Unsure?</h3>
                  <p className="text-[12px] mb-4" style={{ color: "var(--pb-text-muted)" }}>Join our community of over 500+ nomads who did it DIY.</p>
                  <button className="w-full bg-[#e3a99c] text-white py-2 rounded-xl text-[13px] font-bold hover:bg-[#d69586] transition-colors">
                     Join Nomad Spanglish
                  </button>
                </div>
              </AnimateIn>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
