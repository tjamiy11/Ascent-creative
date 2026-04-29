import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
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

const clients = [
  "Lumen Botanicals",
  "Atelier Hús",
  "Halcyon Coffee Co.",
  "Nido Wear",
  "Verre Skin",
  "Pomme & Fern",
  "Wayward Goods",
  "Marrow Press",
];

export default function AboutPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-20 md:pt-24">
        <Reveal as="p" className="eyebrow opacity-60">
          Studio · Est. 2025
        </Reveal>
        <Reveal as="h1" className="heading-display mt-4 max-w-5xl">
          A small studio working in{" "}
          <span className="italic text-[color:var(--color-warm)]">
            moving and still
          </span>{" "}
          image.
        </Reveal>
      </section>

      <section className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-10">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          Approach
        </Reveal>
        <div className="col-span-12 space-y-6 text-base leading-relaxed opacity-90 md:col-span-9 md:text-lg">
          <Reveal as="p">
            Ascent Creative Co. was founded on the belief that the best work
            happens when the people making it have the time, room, and trust to
            care about the small things. Most of what we do is editing — of
            footage, of frames, and of what to attempt at all.
          </Reveal>
          <Reveal as="p" delay={0.05}>
            We&rsquo;re a tight team — directors, a DP, a producer, and an
            editor — that scales out with collaborators we&rsquo;ve worked with
            for years. We take on six to eight projects per year. Half are
            commissioned brand films and commercials; the other half are image
            campaigns, lookbooks, and editorial.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            We work directly with brands we admire and with the agencies we
            most enjoy. We say no to more than we say yes to.
          </Reveal>
        </div>
      </section>

      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-10">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          Capabilities
        </Reveal>
        <ul className="col-span-12 grid grid-cols-1 gap-x-10 gap-y-3 text-base md:col-span-9 md:grid-cols-2 md:text-lg">
          {site.capabilities.map((c, i) => (
            <Reveal
              key={c}
              as="li"
              delay={i * 0.04}
              className="flex items-baseline justify-between border-b border-[color:var(--color-line)] pb-3"
            >
              <span>{c}</span>
              <span className="text-xs opacity-50">0{i + 1}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-edge mt-[var(--space-section)]">
        <Reveal as="p" className="eyebrow opacity-60">
          Team
        </Reveal>
        <Reveal
          as="h2"
          className="heading-display mt-3 text-[clamp(2rem,5vw,4rem)]"
        >
          Who&rsquo;s here.
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
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
              <p className="mt-3 font-display text-xl tracking-tight">
                {member.name}
              </p>
              <p className="text-xs opacity-60">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-[var(--space-section)] border-y border-[color:var(--color-line)] py-10">
        <Marquee
          items={clients.map((c) => (
            <span key={c} className="font-display text-2xl md:text-4xl">
              {c}
            </span>
          ))}
        />
      </section>

      <ContactCTA
        eyebrow="Now booking · 2025 — 2026"
        heading={
          <>
            Think we&rsquo;d{" "}
            <span className="italic text-[color:var(--color-warm)]">
              fit
            </span>{" "}
            your project?
          </>
        }
      />
    </>
  );
}
