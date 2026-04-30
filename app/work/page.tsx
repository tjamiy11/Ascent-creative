import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected films and photography from Ascent Studios.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-24 md:pt-24 md:pb-40">
        <Reveal as="p" className="eyebrow opacity-60">
          (Index · 2023 — 2025)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          A small body of
          <br />
          <span className="italic opacity-60">considered work.</span>
        </Reveal>
      </section>

      <WorkGrid projects={projects} />

      <ContactCTA
        eyebrow="Have a project?"
        heading={
          <>
            See something <span className="italic opacity-60">you like?</span>
          </>
        }
      />
    </>
  );
}
