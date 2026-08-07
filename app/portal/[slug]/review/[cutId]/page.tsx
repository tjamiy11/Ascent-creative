import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CutReview } from "@/components/portal/cut-review";
import { demoUsers, getCut, projects } from "@/lib/portal-data";

type Params = { slug: string; cutId: string };

export function generateStaticParams() {
  return projects.flatMap((project) =>
    project.cuts.map((cut) => ({ slug: project.slug, cutId: cut.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, cutId } = await params;
  const found = getCut(slug, cutId);
  return {
    title: found ? `${found.cut.label} — ${found.project.client}` : "Review",
    robots: { index: false, follow: false },
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, cutId } = await params;
  const found = getCut(slug, cutId);
  if (!found) notFound();

  const { project, cut } = found;

  return (
    <div className="container-edge py-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/portal/${project.slug}#cuts`}
          className="text-[0.82rem] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-ink)]"
        >
          &larr; {project.title}
        </Link>

        <header className="mt-5 mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-[color:var(--color-ink)] pb-6">
          <div>
            <p className="eyebrow text-[color:var(--color-mute)]">
              {project.client}
            </p>
            <h1 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[0.95]">
              {cut.label}
            </h1>
          </div>
          <p className="text-[0.82rem] text-[color:var(--color-mute)]">
            {cut.runtime} · {cut.posted}
          </p>
        </header>

        <CutReview cut={cut} viewer={demoUsers.client.name} />
      </div>
    </div>
  );
}
