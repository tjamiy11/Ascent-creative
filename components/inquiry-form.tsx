"use client";

import { useState, type ReactNode } from "react";
import type * as React from "react";
import clsx from "clsx";
import { site } from "@/lib/site-config";

/**
 * Lead / inquiry form — on /contact and at the bottom of every page (via
 * ContactCTA).
 *
 * Renders one of two things, in priority order:
 *   1. Google Forms iframe — if `site.inquiryForm.googleFormsUrl` is set
 *   2. Built-in form — posts to /api/inquiry, which emails Stefan a
 *      "[Website Lead]" message (see app/api/inquiry/route.ts)
 */
export function InquiryForm() {
  const { googleFormsUrl, height } = site.inquiryForm;

  if (googleFormsUrl) {
    return (
      <iframe
        src={googleFormsUrl}
        title="Project inquiry form"
        loading="lazy"
        className="w-full"
        style={{ height: `${height}px`, border: 0 }}
      >
        Loading…
      </iframe>
    );
  }

  return <LeadForm />;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectDate: string;
  location: string;
  lookingFor: string;
  budget: string;
  message: string;
  referral: string;
  /** Honeypot — hidden from people, bots fill it in. */
  website: string;
};

const EMPTY: FormData = {
  name: "",
  email: "",
  phone: "",
  projectDate: "",
  location: "",
  lookingFor: "",
  budget: "",
  message: "",
  referral: "",
  website: "",
};

// "Starter Project" is the low-commitment way in for first-time clients.
const LOOKING_FOR = ["Starter Project", ...site.capabilities, "Other"];

const BUDGETS = [
  "Under $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K+",
  "Not sure yet",
];

const REFERRALS = [
  "Instagram",
  "Google",
  "Referral / word of mouth",
  "Saw our work",
  "Other",
];

const INPUT_BASE =
  "w-full border-b border-[color:var(--color-line)] bg-transparent py-2 text-base transition-colors focus:border-[color:var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]";

type Status = "idle" | "sending" | "sent" | "error";

function LeadForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      setData(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : `Something went wrong — please email ${site.email}.`
      );
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="py-8">
        <p className="heading-display text-3xl md:text-4xl">
          Thank you <span className="italic opacity-60">◡̈</span>
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">
          Your inquiry is in. We reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Field label="Name" required>
          <input
            type="text"
            required
            autoComplete="name"
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Phone number">
          <input
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Project date">
          <input
            type="text"
            value={data.projectDate}
            onChange={(e) => set("projectDate", e.target.value)}
            placeholder="e.g. June 14, 2027 or “early spring”"
            className={INPUT_BASE}
          />
        </Field>
        <Field label="City & state">
          <input
            type="text"
            autoComplete="address-level2"
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Chicago, IL"
            className={INPUT_BASE}
          />
        </Field>
        <Field label="How did you hear about us?">
          <select
            value={data.referral}
            onChange={(e) => set("referral", e.target.value)}
            className={clsx(INPUT_BASE, "appearance-none pr-6")}
          >
            <option value="">Select…</option>
            {REFERRALS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What are you looking for?">
        <ChipGroup
          options={LOOKING_FOR}
          value={data.lookingFor}
          onChange={(v) => set("lookingFor", v)}
        />
      </Field>

      <Field label="Budget">
        <ChipGroup
          options={BUDGETS}
          value={data.budget}
          onChange={(v) => set("budget", v)}
        />
      </Field>

      <Field label="Tell me more about the project" required>
        <textarea
          required
          rows={5}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Brand, scope, vision — a few sentences is enough."
          className={clsx(INPUT_BASE, "resize-y leading-relaxed")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-paper)",
          }}
          className="rounded-full px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]"
        >
          {status === "sending" ? "Sending…" : "Send inquiry →"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow opacity-60">
        {label}
        {required && <span className="ml-1 opacity-50">*</span>}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            aria-pressed={active}
            onClick={() => onChange(active ? "" : opt)}
            style={
              active
                ? {
                    backgroundColor: "var(--color-ink)",
                    color: "var(--color-paper)",
                    borderColor: "var(--color-ink)",
                  }
                : undefined
            }
            className={clsx(
              "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]",
              !active &&
                "border-[color:var(--color-line)] hover:border-[color:var(--color-ink)]"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
