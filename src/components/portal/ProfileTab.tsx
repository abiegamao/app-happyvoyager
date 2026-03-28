"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Globe,
  Phone,
  Lock,
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import type { PlaybookSession } from "@/lib/session";

interface ProfileTabProps {
  session: PlaybookSession;
  onSessionUpdate: (updates: Partial<PlaybookSession>) => void;
  onManageSubscription: () => void;
}

// ── Shared sub-components ─────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#e7ddd3] overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-6 py-5 border-b border-[#f0e8e0]">
      <h3 className="text-[15px] font-bold text-[#3a3a3a]">{title}</h3>
      {subtitle && <p className="text-[12px] text-[#b0a89e] mt-0.5">{subtitle}</p>}
    </div>
  );
}

function FieldRow({
  icon: Icon,
  label,
  value,
  editing,
  inputName,
  inputValue,
  placeholder,
  onChange,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  editing: boolean;
  inputName: string;
  inputValue: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-[#f5f0ec] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#f5f0ec] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#b0a89e]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-[#b0a89e] uppercase tracking-wide mb-0.5">{label}</p>
        {editing ? (
          <input
            type={type}
            name={inputName}
            value={inputValue}
            onChange={onChange}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className="w-full text-[14px] text-[#3a3a3a] bg-[#f9f5f2] border border-[#e7ddd3] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#e3a99c] transition-colors"
          />
        ) : (
          <p className="text-[14px] text-[#3a3a3a] truncate">
            {value || <span className="text-[#b0a89e] italic">Not set</span>}
          </p>
        )}
      </div>
    </div>
  );
}

function StatusMessage({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium ${
        type === "success"
          ? "bg-[#8fa38d]/10 text-[#5a7a58]"
          : "bg-[#d83a52]/10 text-[#d83a52]"
      }`}
    >
      {type === "success" ? (
        <Check className="w-4 h-4 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
      )}
      {message}
    </div>
  );
}

// ── Account Info ──────────────────────────────────────────────

function AccountInfoCard({
  session,
  onUpdate,
}: {
  session: PlaybookSession;
  onUpdate: (updates: Partial<PlaybookSession>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    name: session.name ?? "",
    company: session.company ?? "",
    job_title: session.jobTitle ?? "",
    country: session.country ?? "",
    phone: session.phone ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/customer/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to save" });
      } else {
        onUpdate({
          name: data.name,
          company: data.company,
          jobTitle: data.jobTitle,
          country: data.country,
          phone: data.phone,
        });
        setStatus({ type: "success", message: "Profile updated successfully" });
        setEditing(false);
      }
    } catch {
      setStatus({ type: "error", message: "Network error — please try again" });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: session.name ?? "",
      company: session.company ?? "",
      job_title: session.jobTitle ?? "",
      country: session.country ?? "",
      phone: session.phone ?? "",
    });
    setStatus(null);
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader title="Account Info" subtitle="Your personal details" />
      <div className="px-6 py-2">
        {/* Email — always read-only */}
        <div className="flex items-start gap-3 py-3.5 border-b border-[#f5f0ec]">
          <div className="w-8 h-8 rounded-lg bg-[#f5f0ec] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Mail className="w-4 h-4 text-[#b0a89e]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#b0a89e] uppercase tracking-wide mb-0.5">Email</p>
            <p className="text-[14px] text-[#3a3a3a] truncate">{session.email}</p>
          </div>
        </div>

        <FieldRow icon={User} label="Full Name" value={session.name} editing={editing} inputName="name" inputValue={form.name} onChange={handleChange} />
        <FieldRow icon={Building2} label="Company" value={session.company} editing={editing} inputName="company" inputValue={form.company} onChange={handleChange} />
        <FieldRow icon={Briefcase} label="Job Title" value={session.jobTitle} editing={editing} inputName="job_title" inputValue={form.job_title} onChange={handleChange} />
        <FieldRow icon={Globe} label="Country" value={session.country} editing={editing} inputName="country" inputValue={form.country} onChange={handleChange} />
        <FieldRow icon={Phone} label="Phone" value={session.phone} editing={editing} inputName="phone" inputValue={form.phone} onChange={handleChange} type="tel" />

        {session.memberSince && (
          <div className="flex items-start gap-3 py-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#f5f0ec] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-[#b0a89e]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#b0a89e] uppercase tracking-wide mb-0.5">Member Since</p>
              <p className="text-[14px] text-[#3a3a3a]">
                {new Date(session.memberSince).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-5 space-y-3">
        {status && <StatusMessage type={status.type} message={status.message} />}
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3a3a3a] text-white text-[13px] font-semibold hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                Save changes
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 rounded-xl border border-[#e7ddd3] text-[13px] font-semibold text-[#787774] hover:text-[#3a3a3a] hover:border-[#d8ccbf] transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => { setStatus(null); setEditing(true); }}
              className="px-4 py-2 rounded-xl border border-[#e7ddd3] text-[13px] font-semibold text-[#787774] hover:text-[#3a3a3a] hover:border-[#d8ccbf] transition-colors"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── Change Password ───────────────────────────────────────────

function ChangePasswordCard() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ type: "error", message: "New passwords do not match" });
      return;
    }
    if (form.newPassword.length < 8) {
      setStatus({ type: "error", message: "New password must be at least 8 characters" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/customer/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to change password" });
      } else {
        setStatus({ type: "success", message: "Password changed successfully" });
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch {
      setStatus({ type: "error", message: "Network error — please try again" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Change Password" subtitle="Update your login password" />
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
        {(["currentPassword", "newPassword", "confirmPassword"] as const).map((field) => {
          const labels: Record<typeof field, string> = {
            currentPassword: "Current password",
            newPassword: "New password",
            confirmPassword: "Confirm new password",
          };
          return (
            <div key={field}>
              <label className="block text-[12px] font-semibold text-[#787774] mb-1.5">
                {labels[field]}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b0a89e]" />
                <input
                  type="password"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-[14px] bg-[#f9f5f2] border border-[#e7ddd3] rounded-xl focus:outline-none focus:border-[#e3a99c] transition-colors"
                />
              </div>
            </div>
          );
        })}

        {status && <StatusMessage type={status.type} message={status.message} />}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3a3a3a] text-white text-[13px] font-semibold hover:bg-[#2a2a2a] disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
          Update password
        </button>
      </form>
    </Card>
  );
}

// ── Subscription Summary ──────────────────────────────────────

function SubscriptionCard({
  session,
  onManageSubscription,
}: {
  session: PlaybookSession;
  onManageSubscription: () => void;
}) {
  const STATUS_META: Record<string, { label: string; color: string }> = {
    active:    { label: "Active",      color: "#8fa38d" },
    trialing:  { label: "Free Trial",  color: "#c9a84c" },
    past_due:  { label: "Past Due",    color: "#d83a52" },
    canceled:  { label: "Canceled",    color: "#d83a52" },
    paused:    { label: "Paused",      color: "#b0a89e" },
  };

  const hasSubscription =
    session.subscriptionStatus != null &&
    ["active", "trialing", "past_due"].includes(session.subscriptionStatus);

  const meta = session.subscriptionStatus
    ? (STATUS_META[session.subscriptionStatus] ?? { label: session.subscriptionStatus, color: "#b0a89e" })
    : null;

  let renewalText: string | null = null;
  if (session.subscriptionStatus === "trialing" && session.trialEndsAt) {
    const d = new Date(session.trialEndsAt);
    const days = Math.max(0, Math.ceil((d.getTime() - Date.now()) / 86400000));
    renewalText = `Trial ends ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${days} day${days !== 1 ? "s" : ""} left`;
  } else if (session.currentPeriodEnd && session.subscriptionStatus === "active") {
    renewalText = `Renews ${new Date(session.currentPeriodEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }

  return (
    <Card>
      <CardHeader title="Subscription" subtitle="Your current plan" />
      <div className="px-6 py-5">
        {hasSubscription && meta ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ color: meta.color, backgroundColor: `${meta.color}20` }}
              >
                {meta.label}
              </span>
              {session.subscriptionInterval && (
                <span className="text-[12px] text-[#b0a89e] capitalize">
                  {session.subscriptionInterval}ly billing
                </span>
              )}
            </div>
            {renewalText && (
              <p className="text-[13px] text-[#787774]">{renewalText}</p>
            )}
            <button
              onClick={onManageSubscription}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e7ddd3] text-[13px] font-semibold text-[#787774] hover:text-[#3a3a3a] hover:border-[#d8ccbf] transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Manage billing
            </button>
          </div>
        ) : (
          <p className="text-[14px] text-[#b0a89e] italic">No active subscription</p>
        )}
      </div>
    </Card>
  );
}

// ── Main export ───────────────────────────────────────────────

export default function ProfileTab({
  session,
  onSessionUpdate,
  onManageSubscription,
}: ProfileTabProps) {
  return (
    <div className="space-y-6">
      <AccountInfoCard session={session} onUpdate={onSessionUpdate} />
      <ChangePasswordCard />
      <SubscriptionCard session={session} onManageSubscription={onManageSubscription} />
    </div>
  );
}
