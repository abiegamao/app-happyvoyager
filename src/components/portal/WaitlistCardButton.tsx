"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import type { PlaybookConfig } from "@/data/playbooks/types";

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || "https://happyvoyager.com";

export default function WaitlistCardButton({ playbook }: { playbook: PlaybookConfig }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${LANDING_URL}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          playbookSlug: playbook.slug,
          playbookTitle: playbook.heroTitle,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
        style={{ color: playbook.catalog.accent }}
      >
        Join Waitlist →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#3a3a3a]/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#f9f5f2] rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-7 pt-7 pb-5" style={{ backgroundColor: playbook.catalog.bg }}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{playbook.catalog.emoji}</span>
                  <p className="text-[10px] font-bold tracking-widest uppercase mt-2 mb-1" style={{ color: playbook.catalog.accent }}>
                    Early Access
                  </p>
                  <h2 className="text-xl font-bold text-[#3a3a3a]">{playbook.heroTitle}</h2>
                </div>
                <button onClick={() => setOpen(false)} className="text-[#6b6b6b] hover:text-[#3a3a3a] transition-colors mt-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-7 pb-7 pt-5">
              {success ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: playbook.catalog.accent }} />
                  <h3 className="text-lg font-bold text-[#3a3a3a] mb-2">You&apos;re on the list!</h3>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed">
                    We&apos;ll email you the moment {playbook.heroTitle} is ready to launch.
                  </p>
                  <button onClick={() => setOpen(false)} className="mt-5 text-xs font-semibold text-[#aaaaaa] hover:text-[#6b6b6b] transition-colors">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed mb-5">
                    This playbook is in final review. Join the early access list and we&apos;ll let you know the moment it&apos;s live.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-sm text-[#3a3a3a] placeholder:text-[#bbbbbb] focus:outline-none focus:border-[#e3a99c] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#e7ddd3] bg-white text-sm text-[#3a3a3a] placeholder:text-[#bbbbbb] focus:outline-none focus:border-[#e3a99c] transition-colors"
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading || !email}
                      className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: playbook.catalog.accent }}
                    >
                      {loading ? "Joining..." : "Join the Waitlist →"}
                    </button>
                  </form>
                  <p className="text-[11px] text-[#aaaaaa] text-center mt-4">No spam. Just one email when it launches.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
