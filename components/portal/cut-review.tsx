"use client";

import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import type { Comment, Cut } from "@/lib/portal-data";

function timecode(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Timestamped review surface for a single cut.
 *
 * Notes pin to the frame they were written on: the composer captures
 * `video.currentTime` the moment the client starts typing, so the timecode
 * matches what they were looking at rather than where the video drifted to
 * while they wrote. Pins render on the scrubber; clicking either the pin or
 * the note seeks the player.
 *
 * All state is local — this is the demo. A real build posts notes and the
 * approval decision, and subscribes for Stefan's replies.
 */
export function CutReview({ cut, viewer }: { cut: Cut; viewer: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const [comments, setComments] = useState<Comment[]>(cut.comments);
  const [draft, setDraft] = useState("");
  const [draftAt, setDraftAt] = useState<number | null>(null);
  const [decision, setDecision] = useState<Cut["status"]>(cut.status);

  const sorted = useMemo(
    () => [...comments].sort((a, b) => a.at - b.at),
    [comments]
  );

  function seek(to: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = to;
    setCurrent(to);
  }

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function captureTime() {
    if (draftAt === null) {
      setDraftAt(videoRef.current?.currentTime ?? 0);
      videoRef.current?.pause();
    }
  }

  function submit() {
    const body = draft.trim();
    if (!body) return;
    setComments((prev) => [
      ...prev,
      {
        id: `local-${prev.length + 1}`,
        author: viewer,
        at: draftAt ?? 0,
        body,
        posted: "Just now",
      },
    ]);
    setDraft("");
    setDraftAt(null);
  }

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className="gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] xl:gap-14">
      <div className="min-w-0">
        <div className="relative bg-[color:var(--color-ink)]">
          <video
            ref={videoRef}
            src={cut.src}
            poster={cut.poster}
            playsInline
            preload="metadata"
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="aspect-video w-full cursor-pointer object-contain"
          />
        </div>

        {/* Transport. Custom rather than native controls so comment pins can
            live on the same timeline the client scrubs. */}
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid h-9 w-9 shrink-0 place-items-center border border-[color:var(--color-line)] text-[0.7rem] transition-colors hover:border-[color:var(--color-ink)]"
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <div className="relative min-w-0 flex-1">
            <div className="relative h-1 w-full bg-[color:var(--color-line)]">
              <div
                className="absolute inset-y-0 left-0 bg-[color:var(--color-ink)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {duration > 0 &&
              sorted.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => seek(c.at)}
                  title={`${timecode(c.at)} — ${c.author}`}
                  aria-label={`Jump to note at ${timecode(c.at)}`}
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--color-paper)] bg-[color:var(--color-ink)] transition-transform hover:scale-125"
                  style={{ left: `${(c.at / duration) * 100}%` }}
                />
              ))}

            <label className="sr-only" htmlFor="scrub">
              Scrub
            </label>
            <input
              id="scrub"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={current}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 cursor-pointer opacity-0"
            />
          </div>

          <span className="shrink-0 font-mono text-[0.78rem] tabular-nums text-[color:var(--color-mute)]">
            {timecode(current)} / {timecode(duration)}
          </span>
        </div>

        <Decision decision={decision} onChange={setDecision} />
      </div>

      <aside className="mt-10 lg:mt-0">
        <div className="lg:sticky lg:top-[5.5rem]">
          <h2 className="eyebrow border-b border-[color:var(--color-ink)] pb-3 text-[0.65rem] text-[color:var(--color-mute)]">
            Notes ({sorted.length})
          </h2>

          <ul className="max-h-[46vh] overflow-y-auto">
            {sorted.length === 0 && (
              <li className="py-8 text-[0.85rem] text-[color:var(--color-mute)]">
                No notes yet. Play the cut and type where something catches
                you — the note pins to that frame.
              </li>
            )}
            {sorted.map((c) => (
              <li
                key={c.id}
                className="border-b border-[color:var(--color-line)] py-4"
              >
                <div className="flex items-baseline gap-3">
                  <button
                    type="button"
                    onClick={() => seek(c.at)}
                    className="shrink-0 font-mono text-[0.72rem] tabular-nums underline underline-offset-4 hover:opacity-60"
                  >
                    {timecode(c.at)}
                  </button>
                  <span className="mr-auto truncate text-[0.8rem]">
                    {c.author}
                  </span>
                  <span className="shrink-0 text-[0.72rem] text-[color:var(--color-mute)]">
                    {c.posted}
                  </span>
                </div>
                <p
                  className={clsx(
                    "mt-1.5 text-[0.88rem] leading-relaxed",
                    c.resolved && "text-[color:var(--color-mute)] line-through"
                  )}
                >
                  {c.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            {draftAt !== null && (
              <p className="mb-2 text-[0.75rem] text-[color:var(--color-mute)]">
                Pinning to{" "}
                <span className="font-mono text-[color:var(--color-ink)]">
                  {timecode(draftAt)}
                </span>
              </p>
            )}
            <label htmlFor="note" className="sr-only">
              Add a note
            </label>
            <textarea
              id="note"
              rows={3}
              value={draft}
              onFocus={captureTime}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a note at the current frame…"
              className="w-full resize-none border border-[color:var(--color-line)] bg-transparent p-3 text-[0.88rem] outline-none transition-colors placeholder:text-[color:var(--color-mute)]/60 focus:border-[color:var(--color-ink)]"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={submit}
                disabled={!draft.trim()}
                className="bg-[color:var(--color-ink)] px-4 py-2 text-[0.82rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80 disabled:opacity-30"
              >
                Post note
              </button>
              {draftAt !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setDraft("");
                    setDraftAt(null);
                  }}
                  className="text-[0.8rem] text-[color:var(--color-mute)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Decision({
  decision,
  onChange,
}: {
  decision: Cut["status"];
  onChange: (next: Cut["status"]) => void;
}) {
  if (decision === "approved") {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-ink)] pt-4">
        <p className="text-[0.88rem]">
          <em className="font-display">Approved.</em>{" "}
          <span className="text-[color:var(--color-mute)]">
            Stefan has been notified and delivery is unlocked.
          </span>
        </p>
        <button
          type="button"
          onClick={() => onChange("in-review")}
          className="text-[0.82rem] text-[color:var(--color-mute)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
        >
          Undo
        </button>
      </div>
    );
  }

  if (decision === "changes-requested") {
    return (
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--color-ink)] pt-4">
        <p className="text-[0.88rem]">
          <em className="font-display">Changes requested.</em>{" "}
          <span className="text-[color:var(--color-mute)]">
            Your notes went to Stefan. He&rsquo;ll post the next revision here.
          </span>
        </p>
        <button
          type="button"
          onClick={() => onChange("in-review")}
          className="text-[0.82rem] text-[color:var(--color-mute)] underline underline-offset-4 hover:text-[color:var(--color-ink)]"
        >
          Undo
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[color:var(--color-ink)] pt-4">
      <p className="mr-auto text-[0.88rem] text-[color:var(--color-mute)]">
        Done watching? Give Stefan a decision.
      </p>
      <button
        type="button"
        onClick={() => onChange("changes-requested")}
        className="border border-[color:var(--color-line)] px-4 py-2 text-[0.82rem] transition-colors hover:border-[color:var(--color-ink)]"
      >
        Request changes
      </button>
      <button
        type="button"
        onClick={() => onChange("approved")}
        className="bg-[color:var(--color-ink)] px-4 py-2 text-[0.82rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
      >
        Approve cut
      </button>
    </div>
  );
}
