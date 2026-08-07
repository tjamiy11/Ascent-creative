"use client";

import { useState } from "react";
import Link from "next/link";
import { ProposalView } from "@/components/portal/proposal-view";
import type { Project } from "@/lib/portal-data";

type Stage = "proposal" | "accepted" | "open";

/**
 * Gates the working brief behind the proposal.
 *
 * The brief arrives as pre-rendered server children, so the whole project
 * page is one static route — accepting reveals what's already there rather
 * than navigating somewhere new. That keeps the URL Stefan sent working
 * before and after the yes.
 *
 * Demo only: acceptance lives in component state and resets on reload. A real
 * build writes the stage and notifies Stefan.
 */
export function ProposalGate({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("proposal");

  if (stage === "proposal") {
    return (
      <ProposalView project={project} onAccept={() => setStage("accepted")} />
    );
  }

  // A deliberate beat between the decision and the workspace. Landing straight
  // in a shot list after saying yes to five figures feels transactional, and
  // this is the moment to confirm they made a good call.
  if (stage === "accepted") {
    return (
      <div className="container-edge py-20 md:py-28">
        <div className="mx-auto max-w-xl">
          <p className="eyebrow text-[color:var(--color-mute)]">
            {project.client}
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Booked. <em>{project.shootDates}</em> is yours.
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-[color:var(--color-mute)]">
            Stefan has been notified and the crew is locked to those dates. The
            deposit invoice lands in your inbox today, and everything from here
            — shot list, cuts, final files — happens on this page.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setStage("open")}
              className="bg-[color:var(--color-ink)] px-6 py-3 text-[0.92rem] text-[color:var(--color-paper)] transition-opacity hover:opacity-80"
            >
              Open the project
            </button>
            <Link
              href="/portal"
              className="text-[0.88rem] text-[color:var(--color-mute)] underline underline-offset-4 transition-colors hover:text-[color:var(--color-ink)]"
            >
              Back to all projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
