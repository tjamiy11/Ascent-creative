import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const team = [
  { name: "Placeholder", role: "Director", portrait: "/placeholders/cover-1.jpg" },
  { name: "Placeholder", role: "Director of Photography", portrait: "/placeholders/cover-2.jpg" },
  { name: "Placeholder", role: "Producer", portrait: "/placeholders/cover-3.jpg" },
  { name: "Placeholder", role: "Editor", portrait: "/placeholders/cover-4.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-32 md:pt-24 md:pb-40">
        <Reveal as="p" className="eyebrow opacity-60">
          (Studio)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          A small studio working in
          <br />
          <span className="italic opacity-60">moving and still image.</span>
        </Reveal>
      </section>

      <section className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          Approach
        </Reveal>
        <div className="col-span-12 space-y-8 md:col-span-7">
          <Reveal
            as="p"
            className="text-base leading-relaxed opacity-80 md:text-lg"
          >
            Founded on the belief that the best work happens when the people
            making it have the time, room, and trust to care about the small
            things.
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="text-base leading-relaxed opacity-70"
          >
            Six to eight projects a year. We say no to most.
          </Reveal>
        </div>
      </section>

      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          Capabilities
        </Reveal>
        <ul className="col-span-12 grid grid-cols-1 gap-x-10 gap-y-2 md:col-span-7 md:grid-cols-2">
          {site.capabilities.map((c, i) => (
            <Reveal
              key={c}
              as="li"
              delay={i * 0.04}
              className="flex items-baseline justify-between border-b border-[color:var(--color-line)] pb-3 text-base"
            >
              <span>{c}</span>
              <span className="text-xs opacity-40">0{i + 1}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-edge mt-[var(--space-section)]">
        <Reveal as="p" className="eyebrow opacity-60">
          Team
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-16 md:mt-20 md:grid-cols-4 md:gap-x-12">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-ink)]/5">
                <Image
                  src={member.portrait}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale"
                />
              </div>
              <p className="mt-4 text-sm">{member.name}</p>
              <p className="text-xs opacity-50">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA
        eyebrow="Now booking · 2025 — 2026"
        heading={
          <>
            Think we&rsquo;d{" "}
            <span className="italic opacity-60">fit</span>?
          </>
        }
      />
    </>
  );
}
