import type { Metadata } from "next";
import { HoneybookEmbed } from "@/components/honeybook-embed";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — Chicago Video Production",
  description: `Get in touch with ${site.name}, a downtown Chicago video production agency. Brand commercials, tourism films, and social media content. Reply within two business days.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="container-edge pt-12 pb-24 md:pt-24 md:pb-32">
        <Reveal as="p" className="eyebrow opacity-60">
          (Now booking · 2025 — 2026)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          Tell us about
          <br />
          <span className="italic opacity-60">your project.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-10 max-w-md text-sm leading-relaxed opacity-70"
        >
          We can&rsquo;t wait to work with you. A few sentences is enough —
          brand, scope, rough timing. Reply within two business days, from
          downtown Chicago.
        </Reveal>
      </section>

      <section className="container-edge grid grid-cols-12 gap-y-12 md:gap-x-12">
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
