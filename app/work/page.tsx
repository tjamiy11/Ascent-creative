import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected films and photography from Ascent Creative Co.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-20 md:pt-24">
        <Reveal as="p" className="eyebrow opacity-60">
          Selected Work · 2023 — 2025
        </Reveal>
        <Reveal as="h1" className="heading-display mt-4 max-w-5xl">
          A small body of{" "}
          <span className="italic text-[color:var(--color-warm)]">
            considered
          </span>{" "}
          work.
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg"
        >
          A non-exhaustive selection. Filter by medium, or browse the whole
          shelf — each piece links to a longer story behind the work.
        </Reveal>
      </section>

      <WorkGrid projects={projects} />
    </>
  );
}
