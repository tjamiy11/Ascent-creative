"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/portal-data";

/**
 * The pre-acceptance page.
 *
 * Design rules, in priority order:
 *
 * 1. One decision. No section nav, no tabs, no secondary journeys. The page
 *    scrolls once and ends in a choice.
 * 2. Craft before copy. A video studio's proposal should open on a frame, not
 *    a line-item table.
 * 3. Nothing hidden. Price, dates, and what's included are all on the page.
 *    Every "request a quote" step is a place the client goes quiet.
 * 4. Answer the fear. "What happens after I say yes" is the last thing they
 *    read, because the unknown is the real objection, not the number.
 * 5. No manufactured urgency. The only deadline shown is one Stefan is
 *    actually holding, and it's optional.
 *
 * The accept control is duplicated in a sticky bar so it's reachable from
 * anywhere without scrolling back — a real conversion aid, unlike a timer.
 */
export function ProposalView({
  project,
  onAccept,
}: {
  project: Project;
  onAccept: () => void;
}) {
  const p = project.proposal!;
  const decisionRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  // The bar appears after the hero and hides once the real decision block is
  // on screen — two accept buttons visible at once looks desperate.
  useEffect(() => {
    const el = decisionRef.current;
    const onScroll = () => {
      const past = window.scrollY > 420;
      const atDecision = el
        ? el.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      setShowBar(past && !atDecision);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="container-edge py-10 md:py-14">
        <div className="mx-auto max-w-3xl">
          <header>
            <p className="eyebrow text-[color:var(--color-mute)]">
              Proposal · {project.client}
            </p>
            <h1 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed">
              {p.pitch}
            </p>
          </header>

          {/* Craft first. */}
          <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-[color:var(--color-ink)]/5">
            <Image
              src={p.hero}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>

          <Block heading="The approach">
            <div className="max-w-[60ch] space-y-4">
              {p.approach.map((line, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-[1.3rem] leading-[1.45]"
                      : "text-[0.98rem] leading-relaxed text-[color:var(--color-mute)]"
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </Block>

          <Block heading="What you get">
            <ul className="border-t border-[color:var(--color-line)]">
              {p.deliverables.map((d) => (
                <li
                  key={d.title}
                  className="grid gap-1 border-b border-[color:var(--color-line)] py-4 sm:grid-cols-[16rem_minmax(0,1fr)] sm:gap-6"
                >
                  <span className="text-[0.98rem]">{d.title}</span>
                  <span className="text-[0.9rem] leading-relaxed text-[color:var(--color-mute)]">
                    {d.detail}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block heading="When">
            <ol className="grid gap-6 sm:grid-cols-3">
              {p.timeline.map((t) => (
                <li key={t.label}>
                  <p className="eyebrow text-[0.6rem] text-[color:var(--color-mute)]">
                    {t.label}
                  </p>
                  <p className="font-display mt-1.5 text-[1.15rem] leading-tight">
                    {t.date}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block heading="Investment">
            <p className="font-display text-[clamp(2.5rem,7vw,4rem)] leading-none">
              {p.investment.total}
            </p>
            <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {p.investment.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[0.92rem] text-[color:var(--color-mute)]"
                >
                  <span aria-hidden className="text-[color:var(--color-ink)]">
                    &#43;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[color:var(--color-line)] pt-4 text-[0.9rem]">
              {p.investment.terms}
            </p>
          </Block>

          {p.proof && (
            <Block heading="From a client who booked this">
              <blockquote className="max-w-[52ch]">
                <p className="font-display text-[1.35rem] leading-[1.4]">
                  &ldquo;{p.proof.quote}&rdquo;
                </p>
                <footer className="mt-4 text-[0.85rem] text-[color:var(--color-mute)]">
                  {p.proof.author} · {p.proof.org}
                </footer>
              </blockquote>

              {p.examples && (
                <ul className="mt-8 grid grid-cols-3 gap-4">
                  {p.examples.map((ex) => (
                    <li key={ex.title + ex.client}>
                      <span className="relative block aspect-[4/3] overflow-hidden bg-[color:var(--color-ink)]/5">
                        <Image
                          src={ex.cover}
                          alt=""
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </span>
                      <span className="mt-2 block text-[0.78rem] leading-snug">
                        {ex.title}
                        <span className="block text-[color:var(--color-mute)]">
                          {ex.client}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Block>
          )}

          {/* The decision. Everything above exists to make this an easy yes. */}
          <div
            ref={decisionRef}
            className="mt-16 border-t border-[color:var(--color-ink)] pt-10"
          >
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05]">
              Ready when you are.
            </h2>
            {p.holdUntil && (
              <p className="mt-3 text-[0.92rem] text-[color:var(--color-mute)]">
                {p.holdUntil}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onAccept}
                className="bg-[color:var(--color-ink)] px-7 py-3.5 text-[0.95rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
              >
                Accept and book these dates
              </button>
              <a
                href={`mailto:stefan@ascentstudios.co?subject=${encodeURIComponent(
                  `Question about ${project.title}`
                )}`}
                className="text-[0.9rem] text-[color:var(--color-mute)] underline underline-offset-4 transition-colors hover:text-[color:var(--color-ink)]"
              >
                Ask a question first
              </a>
            </div>

            <ol className="mt-10 space-y-4 border-t border-[color:var(--color-line)] pt-8">
              {p.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display shrink-0 text-[0.95rem] text-[color:var(--color-mute)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-[0.82rem] leading-relaxed text-[color:var(--color-mute)]">
              Accepting confirms the scope and dates above. Nothing is charged
              until the deposit invoice, which comes after.
            </p>
          </div>
        </div>
      </div>

      {/* Reachable from anywhere, hidden once the real block is on screen. */}
      <div
        aria-hidden={!showBar}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]/92 backdrop-blur-md transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container-edge flex items-center gap-5 py-3.5">
          <div className="mr-auto min-w-0">
            <p className="truncate text-[0.88rem]">{project.title}</p>
            <p className="truncate text-[0.78rem] text-[color:var(--color-mute)]">
              {p.investment.total} · {p.timeline[0]?.date}
            </p>
          </div>
          <button
            type="button"
            tabIndex={showBar ? 0 : -1}
            onClick={onAccept}
            className="shrink-0 bg-[color:var(--color-ink)] px-5 py-2.5 text-[0.88rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
          >
            Accept
          </button>
        </div>
      </div>
    </>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="eyebrow mb-6 text-[0.65rem] text-[color:var(--color-mute)]">
        {heading}
      </h2>
      {children}
    </section>
  );
}
