import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApproveBar } from "@/components/portal/approve-bar";
import { ProposalGate } from "@/components/portal/proposal-gate";
import {
  getProject as getPortalProject,
  projects as portalProjects,
  statusLabel,
  type Project,
} from "@/lib/portal-data";

type Params = { slug: string };

export function generateStaticParams() {
  return portalProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortalProject(slug);
  return {
    title: project ? `${project.title} — ${project.client}` : "Brief",
    robots: { index: false, follow: false },
  };
}

export default async function BriefPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getPortalProject(slug);
  if (!project) notFound();

  // Un-accepted work shows the proposal instead. The brief is still rendered
  // here and handed to the gate as children, so accepting reveals it in place
  // rather than sending the client to a different URL.
  if (project.stage === "proposal" && project.proposal) {
    return (
      <ProposalGate project={project}>
        <Brief project={project} />
      </ProposalGate>
    );
  }

  return <Brief project={project} />;
}

function Brief({ project }: { project: Project }) {
  return (
    <div className="container-edge py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/portal"
          className="text-[0.82rem] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-ink)]"
        >
          &larr; All projects
        </Link>

        <header className="mt-6 border-b border-[color:var(--color-ink)] pb-8">
          <p className="eyebrow text-[color:var(--color-mute)]">
            {project.client}
          </p>
          <h1 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.95]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-relaxed text-[color:var(--color-mute)]">
            {project.summary}
          </p>

          {/* Logistics live here rather than in a section of their own — it's
              five facts, and they're the five the client checks first. */}
          <dl className="mt-7 grid gap-x-10 gap-y-4 text-[0.85rem] sm:grid-cols-2">
            <Fact label="Status" value={statusLabel[project.status]} />
            <Fact label="Shoot" value={project.shootDates} />
            {project.callTime && <Fact label="Call time" value={project.callTime} />}
            {project.location && <Fact label="Location" value={project.location} />}
            <Fact label="Producer" value="Stefan · stefan@ascentstudios.co" />
          </dl>
        </header>

        <Section id="concept" heading="Concept">
          <div className="max-w-[62ch] space-y-5">
            {project.concept.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display text-[1.35rem] leading-[1.45]"
                    : "text-[0.98rem] leading-relaxed text-[color:var(--color-mute)]"
                }
              >
                {p}
              </p>
            ))}
          </div>

          {project.deck && (
            <button
              type="button"
              className="mt-7 flex w-full items-center gap-4 border border-[color:var(--color-line)] p-4 text-left transition-colors hover:border-[color:var(--color-ink)]"
            >
              <span className="flex shrink-0 gap-1" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-9 w-13 border border-[color:var(--color-line)] bg-[color:var(--color-ink)]/[0.04]"
                  />
                ))}
              </span>
              <span className="mr-auto">
                <span className="block text-[0.95rem]">Creative deck</span>
                <span className="mt-0.5 block text-[0.8rem] text-[color:var(--color-mute)]">
                  {project.deck.slides} slides · {project.deck.updated}
                </span>
              </span>
              <span className="text-[0.85rem] underline underline-offset-4">
                Open
              </span>
            </button>
          )}

          {project.moodboard && (
            <ul className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {project.moodboard.map((img) => (
                <li key={img.src + img.caption}>
                  <span className="relative block aspect-square overflow-hidden bg-[color:var(--color-ink)]/5">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="shotlist" heading="Shot List">
          <ShotList project={project} />
        </Section>

        <Section id="cuts" heading="Cuts">
          {project.cuts.length === 0 ? (
            <Empty>
              No cuts posted yet. You&rsquo;ll get an email when the first one
              lands.
            </Empty>
          ) : (
            <ul className="space-y-4">
              {project.cuts.map((cut) => (
                <li key={cut.id}>
                  <Link
                    href={`/portal/${project.slug}/review/${cut.id}`}
                    className="group flex items-center gap-5 border border-[color:var(--color-line)] p-4 transition-colors hover:border-[color:var(--color-ink)]"
                  >
                    <span className="relative aspect-video w-32 shrink-0 overflow-hidden bg-[color:var(--color-ink)]/5 sm:w-40">
                      <Image
                        src={cut.poster}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 grid place-items-center bg-black/20 text-[color:var(--color-paper)] opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ▶
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-[1.1rem] leading-tight">
                        {cut.label}
                      </span>
                      <span className="mt-1.5 block text-[0.82rem] text-[color:var(--color-mute)]">
                        {cut.runtime} · {cut.posted}
                        {cut.comments.length > 0 &&
                          ` · ${cut.comments.length} note${
                            cut.comments.length === 1 ? "" : "s"
                          }`}
                      </span>
                    </span>
                    <CutStatus status={cut.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="delivery" heading="Files" last>
          {project.delivery.files.length === 0 ? (
            <Empty>{project.delivery.note ?? "Nothing delivered yet."}</Empty>
          ) : (
            <ul className="border-t border-[color:var(--color-line)]">
              {project.delivery.files.map((file) => (
                <li
                  key={file.name}
                  className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-[color:var(--color-line)] py-3.5"
                >
                  <span className="mr-auto text-[0.92rem]">{file.name}</span>
                  <span className="text-[0.8rem] text-[color:var(--color-mute)]">
                    {file.spec}
                  </span>
                  <span className="w-16 text-right text-[0.8rem] text-[color:var(--color-mute)]">
                    {file.size}
                  </span>
                  <button
                    type="button"
                    className="text-[0.82rem] underline underline-offset-4 hover:opacity-60"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({
  id,
  heading,
  children,
  last = false,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-10 ${
        last ? "" : "border-b border-[color:var(--color-line)]"
      }`}
    >
      <h2 className="eyebrow mb-6 text-[0.65rem] text-[color:var(--color-mute)]">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-[0.6rem] text-[color:var(--color-mute)]">
        {label}
      </dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function ShotList({ project }: { project: Project }) {
  const total = project.shots.reduce((n, s) => n + (s.seconds ?? 0), 0);
  return (
    <div>
      <ul className="border-t border-[color:var(--color-line)]">
        {project.shots.map((shot) => (
          <li
            key={shot.id}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-[color:var(--color-line)] py-3.5"
          >
            <span className="font-display text-[0.95rem] text-[color:var(--color-mute)]">
              {shot.slate}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.95rem]">{shot.setup}</span>
              {shot.note && (
                <span className="mt-1 block text-[0.82rem] text-[color:var(--color-mute)]">
                  {shot.note}
                </span>
              )}
            </span>
            <span className="justify-self-end whitespace-nowrap text-[0.82rem] text-[color:var(--color-mute)]">
              {shot.seconds ? `${shot.seconds}s` : "—"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.8rem] text-[color:var(--color-mute)]">
        {project.shots.length} setups · {total}s of intended runtime
      </p>
      <ApproveBar
        label="Sign off so the shoot can be locked."
        approvedOn={project.shotsApprovedOn}
      />
    </div>
  );
}

function CutStatus({
  status,
}: {
  status: "in-review" | "approved" | "changes-requested";
}) {
  const copy = {
    "in-review": "Needs your notes",
    approved: "Approved",
    "changes-requested": "Changes requested",
  }[status];

  return (
    <span className="hidden shrink-0 whitespace-nowrap text-right text-[0.8rem] sm:block">
      {status === "in-review" ? (
        <em className="font-display text-[0.9rem]">{copy}</em>
      ) : (
        <span className="text-[color:var(--color-mute)]">{copy}</span>
      )}
    </span>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-[color:var(--color-line)] px-5 py-8 text-center text-[0.88rem] text-[color:var(--color-mute)]">
      {children}
    </p>
  );
}
