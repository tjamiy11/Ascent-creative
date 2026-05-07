"use client";

import { useState, type ReactNode } from "react";
import type * as React from "react";
import Script from "next/script";
import clsx from "clsx";
import { site } from "@/lib/site-config";

/**
 * Contact / inquiry form for the /contact page.
 *
 * Renders one of three things, in priority order:
 *   1. Google Forms iframe — if `site.inquiryForm.googleFormsUrl` is set
 *      (easiest path: paste the form's embed src into config, done)
 *   2. HoneyBook iframe    — if `site.honeybook.formId` is set
 *   3. Built-in mailto form — fallback so the page is never empty
 *
 * Component name kept as `HoneybookEmbed` for caller compatibility.
 */
export function HoneybookEmbed() {
  const { googleFormsUrl, height } = site.inquiryForm;
  const { formId, scriptSrc } = site.honeybook;

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

  if (formId) {
    return (
      <>
        <div
          id={formId}
          data-hb-id={formId}
          className="hb-p-placement min-h-[600px] w-full"
        />
        <Script
          src={scriptSrc}
          strategy="afterInteractive"
          data-w-token={formId}
        />
      </>
    );
  }

  return <InquiryForm />;
}

type FormData = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
};

const PROJECT_TYPES = [
  "Brand Commercial",
  "Tourism Film",
  "Social Content",
  "Personal Branding",
  "Music Video",
  "Direction & Cinematography",
  "Other",
];

const TIMELINES = [
  "ASAP",
  "Next 30 days",
  "Next 90 days",
  "Later this year",
  "Just exploring",
];

const BUDGETS = [
  "Under $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K+",
  "Not sure yet",
];

const INPUT_BASE =
  "w-full border-b border-[color:var(--color-line)] bg-transparent py-2 text-base transition-colors focus:border-[color:var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]";

function InquiryForm() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    timeline: "",
    budget: "",
    message: "",
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `New project inquiry${
      data.company ? ` — ${data.company}` : ""
    }`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company && `Company: ${data.company}`,
      data.projectType && `Project type: ${data.projectType}`,
      data.timeline && `Timeline: ${data.timeline}`,
      data.budget && `Budget: ${data.budget}`,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <Field label="Name" required>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Company / Brand">
          <input
            type="text"
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
            className={INPUT_BASE}
          />
        </Field>
        <Field label="Timeline">
          <select
            value={data.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            className={clsx(INPUT_BASE, "appearance-none pr-6")}
          >
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project type">
        <ChipGroup
          options={PROJECT_TYPES}
          value={data.projectType}
          onChange={(v) => set("projectType", v)}
        />
      </Field>

      <Field label="Budget">
        <ChipGroup
          options={BUDGETS}
          value={data.budget}
          onChange={(v) => set("budget", v)}
        />
      </Field>

      <Field label="Tell us about the project" required>
        <textarea
          required
          rows={5}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Brand, scope, rough timing — a few sentences is enough."
          className={clsx(INPUT_BASE, "resize-y leading-relaxed")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-paper)",
          }}
          className="rounded-full px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]"
        >
          Send inquiry →
        </button>
        <p className="text-xs opacity-50">
          This opens your email app with the message pre-filled.
        </p>
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
