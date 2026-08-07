"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Demo login. No auth is wired — submitting moves to the "link sent" state so
 * the flow reads correctly, and a demo shortcut drops straight into the
 * portal. Replace `onSubmit` with the real magic-link call.
 */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-10 border-t border-[color:var(--color-ink)] pt-6">
        <p className="font-display text-2xl">Check your email.</p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-[color:var(--color-mute)]">
          A sign-in link is on its way to{" "}
          <span className="text-[color:var(--color-ink)]">{email}</span>. It
          expires in 15 minutes.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/portal"
            className="bg-[color:var(--color-ink)] px-5 py-2.5 text-[0.85rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
          >
            Open the portal
          </Link>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-[0.85rem] text-[color:var(--color-mute)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="mt-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <label
        htmlFor="portal-email"
        className="eyebrow block text-[0.65rem] text-[color:var(--color-mute)]"
      >
        Email
      </label>
      <input
        id="portal-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="mt-2 w-full border-b border-[color:var(--color-line)] bg-transparent pb-2.5 text-[1.05rem] outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
      />
      <button
        type="submit"
        className="mt-7 w-full bg-[color:var(--color-ink)] px-5 py-3 text-[0.9rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
      >
        Send sign-in link
      </button>

      <p className="mt-5 text-[0.78rem] leading-relaxed text-[color:var(--color-mute)]">
        Demo:{" "}
        <Link href="/portal" className="underline underline-offset-4 hover:text-[color:var(--color-ink)]">
          skip to the client view
        </Link>{" "}
        or{" "}
        <Link
          href="/portal/studio"
          className="underline underline-offset-4 hover:text-[color:var(--color-ink)]"
        >
          Stefan&rsquo;s view
        </Link>
        .
      </p>
    </form>
  );
}
