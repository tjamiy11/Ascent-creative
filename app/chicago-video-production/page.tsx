import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { ContactCTA } from "@/components/contact-cta";
import { getProject, type Project } from "@/lib/projects";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Video Production in Chicago",
  description: `${site.name} is a Chicago video production company making brand commercials, hospitality and tourism films, and social content — concept, shoot, and edit under one roof. Based at ${site.address.street}.`,
  path: "/chicago-video-production",
});

// Hospitality, festival, and founder work — the categories this page sells.
const CHICAGO_WORK = ["palmer-house", "lollapalooza-reverb", "blum-and-co"]
  .map(getProject)
  .filter((p): p is Project => Boolean(p));

const SERVICES = [
  {
    title: "Brand commercials",
    body: "30-second to two-minute films for launches, home pages, and paid social.",
  },
  {
    title: "Hospitality & tourism films",
    body: "Hotels, spas, restaurants, and venues — the Palmer House film is a good example.",
  },
  {
    title: "Social media content",
    body: "Vertical cuts and series built for Instagram, TikTok, and Reels, shot to a cinematic standard.",
  },
  {
    title: "Founder & personal branding",
    body: "Short films and portraits that put a face to your business.",
  },
  {
    title: "Event & festival coverage",
    body: "Recaps and branded docs for festivals, activations, and live events.",
  },
  {
    title: "Direction & cinematography for hire",
    body: "A director and DP for productions you're already running.",
  },
] as const;

const FAQ = [
  {
    q: "How much does video production cost in Chicago?",
    a: "It depends on shoot days, crew size, locations, and how many edits you need. A single-day shoot with a short social cut costs very differently from a multi-day commercial. Tell us your budget in the form below and we'll tell you honestly what it gets you, or what we'd change to make it fit.",
  },
  {
    q: "What's included in a project?",
    a: "Everything from concept to delivery: creative direction, planning, the shoot itself (cinematography, drone where it helps), editing, color, and final exports sized for every platform you'll post on. Stills can be captured on the same day.",
  },
  {
    q: "How long does a video take to make?",
    a: "It scales with scope. Social content can turn around quickly; a brand commercial needs time for planning and post. Share your date in the inquiry and we'll confirm right away whether it's workable.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Hospitality and tourism, food and beverage, fitness and athletic, fashion and retail, music and events, and founder-led brands. Past clients include Nike, Hoka, Samsung, Palmer House, and Lollapalooza.",
  },
  {
    q: "Do you only work in Chicago?",
    a: "We're based in Chicago and shoot across the city and suburbs, and we travel for projects in New York, Los Angeles, and abroad.",
  },
  {
    q: "Do you also do photography?",
    a: "Yes. Most projects can include a stills package shot alongside the film, so you get video and photography from one production.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function ChicagoVideoProductionPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="container-edge pt-12 pb-24 md:pt-24 md:pb-32">
        <Reveal as="p" className="eyebrow opacity-60">
          (Chicago, IL)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          Video production
          <br />
          <span className="italic opacity-60">in Chicago.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-10 max-w-xl text-base leading-relaxed opacity-80 md:text-lg"
        >
          {site.name} is a Chicago video production company. We make brand
          commercials, hospitality films, and social content for businesses
          that want their audience to feel something — concept, shoot, and
          edit under one roof, from our studio on Milwaukee Avenue.
        </Reveal>
        <Reveal delay={0.15} className="mt-12">
          <Link
            href="/contact"
            className="eyebrow inline-flex items-baseline gap-3 border-b border-[color:var(--color-ink)] pb-1"
          >
            Start a project →
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          What we make
        </Reveal>
        <ul className="col-span-12 grid grid-cols-1 gap-x-12 md:col-span-9 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.title}
              as="li"
              delay={i * 0.04}
              className="border-t border-[color:var(--color-line)] py-6"
            >
              <h2 className="font-display text-xl tracking-tight md:text-2xl">
                {s.title}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed opacity-70 md:text-base">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Chicago work */}
      {CHICAGO_WORK.length > 0 && (
        <section className="container-edge mt-[var(--space-section)]">
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <Reveal as="p" className="eyebrow opacity-60">
              Selected work
            </Reveal>
            <Link
              href="/work"
              className="eyebrow underline-offset-4 hover:underline"
            >
              Full portfolio →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:gap-x-8">
            {CHICAGO_WORK.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05}>
                <WorkCard project={project} aspect="aspect-[4/5]" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          FAQ
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            Questions,
            <br />
            <span className="italic opacity-60">answered.</span>
          </Reveal>
          <ul className="mt-16">
            {FAQ.map(({ q, a }, i) => (
              <Reveal key={q} as="li" delay={i * 0.04}>
                <details className="group border-b border-[color:var(--color-line)] py-6">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl tracking-tight md:text-2xl">
                      {q}
                    </h3>
                    <span
                      aria-hidden
                      className="text-2xl leading-none opacity-50 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-70 md:text-base">
                    {a}
                  </p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA
        eyebrow="Chicago & beyond"
        heading={
          <>
            Tell us what you&rsquo;re{" "}
            <span className="italic opacity-60">making.</span>
          </>
        }
      />
    </>
  );
}
