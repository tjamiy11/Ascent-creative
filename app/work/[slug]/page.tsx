import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { projectContentLoaders } from "@/content/projects";
import {
  getNextProject,
  getProject,
  projectSlugs,
} from "@/lib/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.excerpt,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // MDX content is optional — photo entries (and other future kinds) may
  // not have a per-project write-up. If the file is missing, render the
  // case study without it instead of 500-ing.
  const Content = await loadProjectContent(slug);
  const next = getNextProject(slug);

  return (
    <article className="pb-[var(--space-section)]">
      <header className="container-edge pt-12 md:pt-20">
        <Reveal as="p" className="eyebrow opacity-60">
          {project.tags.join(" · ")} · {project.year}
        </Reveal>
        <Reveal as="h1" className="heading-display mt-4 max-w-5xl">
          {project.title}
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-6 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg"
        >
          {project.excerpt}
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--color-line)] pt-6 text-sm md:grid-cols-4"
        >
          <Meta label="Client" value={project.client} />
          <Meta label="Year" value={String(project.year)} />
          <Meta label="Role" value={project.role} />
          <Meta label="Medium" value={project.kind === "video" ? "Film" : "Photography"} />
        </Reveal>
      </header>

      <Reveal delay={0.2} className="container-edge mt-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-ink)]/5">
          <Image
            src={project.cover}
            alt={`${project.title} hero`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </Reveal>

      {Content && (
        <div className="container-edge mt-16">
          <Content />
        </div>
      )}

      <nav
        aria-label="Next project"
        className="container-edge mt-[var(--space-section)] border-t border-[color:var(--color-line)] pt-12"
      >
        <p className="eyebrow opacity-60">Next</p>
        <Link
          href={`/work/${next.slug}`}
          className="mt-3 flex items-baseline justify-between gap-6"
        >
          <span className="font-display text-3xl tracking-tight md:text-6xl">
            {next.title}
          </span>
          <span className="eyebrow whitespace-nowrap">{next.client} →</span>
        </Link>
      </nav>

      <ContactCTA
        eyebrow="Like what you see?"
        heading={
          <>
            Let&rsquo;s build the{" "}
            <span className="italic">next</span>{" "}
            one together.
          </>
        }
      />
    </article>
  );
}

async function loadProjectContent(
  slug: string
): Promise<ComponentType | null> {
  const loader = projectContentLoaders[slug];
  if (!loader) return null;

  try {
    const mod = await loader();
    return mod.default as ComponentType;
  } catch {
    return null;
  }
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow opacity-60">{label}</p>
      <p className="mt-1.5">{value}</p>
    </div>
  );
}
