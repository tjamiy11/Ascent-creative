"use client";

import { useState } from "react";

type State = "pending" | "approved" | "changes";

/**
 * Sign-off control for a brief section (shot list today, anything else later).
 * Demo-only state — a real build posts the decision and notifies Stefan.
 */
export function ApproveBar({
  label,
  approvedOn,
}: {
  label: string;
  /** Already signed off before this session — renders the settled state. */
  approvedOn?: string;
}) {
  const [state, setState] = useState<State>(approvedOn ? "approved" : "pending");
  const [note, setNote] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  if (state === "approved") {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-ink)] pt-4">
        <p className="text-[0.88rem]">
          <em className="font-display">Approved.</em>{" "}
          <span className="text-[color:var(--color-mute)]">
            {approvedOn ?? "Just now"} — Stefan has been notified.
          </span>
        </p>
        {!approvedOn && (
          <button
            type="button"
            onClick={() => setState("pending")}
            className="text-[0.82rem] text-[color:var(--color-mute)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
          >
            Undo
          </button>
        )}
      </div>
    );
  }

  if (state === "changes") {
    return (
      <div className="mt-6 border-t border-[color:var(--color-ink)] pt-4">
        <p className="text-[0.88rem]">
          <em className="font-display">Changes requested.</em>{" "}
          <span className="text-[color:var(--color-mute)]">
            Stefan will revise and repost.
          </span>
        </p>
        {note && (
          <p className="mt-2 max-w-prose text-[0.85rem] leading-relaxed text-[color:var(--color-mute)]">
            &ldquo;{note}&rdquo;
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-[color:var(--color-ink)] pt-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="mr-auto text-[0.88rem] text-[color:var(--color-mute)]">
          {label}
        </p>
        <button
          type="button"
          onClick={() => setNoteOpen((v) => !v)}
          className="border border-[color:var(--color-line)] px-4 py-2 text-[0.82rem] transition-colors hover:border-[color:var(--color-ink)]"
        >
          Request changes
        </button>
        <button
          type="button"
          onClick={() => setState("approved")}
          className="bg-[color:var(--color-ink)] px-4 py-2 text-[0.82rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
        >
          Approve
        </button>
      </div>

      {noteOpen && (
        <div className="mt-4">
          <label htmlFor="change-note" className="sr-only">
            What needs to change?
          </label>
          <textarea
            id="change-note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What needs to change?"
            className="w-full resize-none border border-[color:var(--color-line)] bg-transparent p-3 text-[0.88rem] outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
          />
          <button
            type="button"
            onClick={() => setState("changes")}
            disabled={!note.trim()}
            className="mt-3 bg-[color:var(--color-ink)] px-4 py-2 text-[0.82rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80 disabled:opacity-30"
          >
            Send to Stefan
          </button>
        </div>
      )}
    </div>
  );
}
