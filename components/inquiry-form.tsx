"use client";

import { useState, type ReactNode } from "react";
import type * as React from "react";
import clsx from "clsx";
import { site } from "@/lib/site-config";

/**
 * Contact / inquiry form for the /contact page.
 *
 * Renders one of two things, in priority order:
 *   1. Google Forms iframe — if `site.inquiryForm.googleFormsUrl` is set
 *      (paste the form's embed src into config, done — submissions land
 *      in the linked Google Sheet, Stefan gets email notifications)
 *   2. Built-in mailto form — fallback so the page is never empty
 *      (visitor submits → opens their email client pre-filled to Stefan)
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

  return <ProjectForm />;
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
  "Starter Project",
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

const EMPTY: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  budget: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

function ProjectForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Submits straight to Stefan's inbox via the serverless Resend route
      // (app/api/inquiry/route.ts) — no email-client redirect.
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        setData(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border-t border-[color:var(--color-line)] pt-10">
        <p className="eyebrow opacity-60">Message sent</p>
        <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
          Thanks — we&rsquo;ll be in touch.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">
          Your inquiry landed in our inbox. We reply within two business days,
          from Chicago.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
        >
          Send another →
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

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
          disabled={submitting}
          style={{
            backgroundColor: "var(--color-ink)",
            color: "var(--color-paper)",
          }}
          className="rounded-full px-6 py-3 text-sm tracking-wide transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-paper)]"
        >
          {submitting ? "Sending…" : "Send inquiry →"}
        </button>
        {status === "error" ? (
          <p className="text-xs text-red-600">
            Something went wrong — please email{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-2"
            >
              {site.email}
            </a>{" "}
            directly.
          </p>
        ) : (
          <p className="text-xs opacity-50">
            We reply within two business days, from Chicago.
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
