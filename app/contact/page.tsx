import type { Metadata } from "next";
import { HoneybookEmbed } from "@/components/honeybook-embed";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Tell us about your project. ${site.name} works on commercials, brand films, and editorial campaigns.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-16 md:pt-24">
        <Reveal as="p" className="eyebrow opacity-60">
          New Projects · 2025 — 2026
        </Reveal>
        <Reveal as="h1" className="heading-display mt-4 max-w-5xl">
          Tell us about{" "}
          <span className="italic text-[color:var(--color-warm)]">your</span>{" "}
          project.
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-8 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg"
        >
          A few sentences is enough to start. Brand, scope, rough timing,
          budget if you have one. We&rsquo;ll reply within two business days,
          and if it isn&rsquo;t a fit, we&rsquo;ll point you at someone we
          trust.
        </Reveal>
      </section>

      <section className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-10">
        <div className="col-span-12 md:col-span-4">
          <Reveal as="p" className="eyebrow opacity-60">
            Direct
          </Reveal>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4"
              >
                {site.email}
              </a>
            </li>
            <li className="opacity-70">{site.location}</li>
          </ul>

          <p className="eyebrow mt-10 opacity-60">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <a
                href={site.social.instagram}
                rel="noreferrer"
                target="_blank"
                className="underline underline-offset-4"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.vimeo}
                rel="noreferrer"
                target="_blank"
                className="underline underline-offset-4"
              >
                Vimeo
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-8">
          <Reveal>
            <HoneybookEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
