import Link from "next/link";
import Image from "next/image";
import { HeroReel } from "@/components/hero-reel";
import { WorkCard } from "@/components/work-card";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { getFeaturedProjects } from "@/lib/projects";
import { getFeaturedTestimonials } from "@/lib/testimonials";
import { site } from "@/lib/site-config";

const SOLUTIONS = [
  {
    title: "Brand Commercials",
    body: "30-second to two-minute films that establish your brand's positioning and emotional core. Made for the home page, the launch, and the room you want to own.",
  },
  {
    title: "Tourism Films",
    body: "Destination storytelling that turns location into desire. For hotels, regions, and travel brands competing on feeling, not features.",
  },
  {
    title: "Social Media Content",
    body: "Scroll-stopping shorts and series built for the platforms your audience actually lives on — without losing the cinematic standard.",
  },
  {
    title: "Personal Branding",
    body: "Founder films and editorial-style portraits that put a face to your business. Quiet, confident, and made to age well.",
  },
  {
    title: "Music Videos",
    body: "Concept-led promo films for artists and labels — the medium that taught us how to make everything else.",
  },
  {
    title: "Direction & Cinematography",
    body: "On-call director and DP for productions you're already running. Bring us in for the scenes that matter most.",
  },
] as const;

const INDUSTRIES = [
  {
    title: "Beauty & Wellness",
    body: "Brand films and editorial campaigns for skincare, fragrance, and wellness lines — light, texture, and quiet ceremony in place of feature lists.",
  },
  {
    title: "Hospitality & Tourism",
    body: "Cinematic films for hotels, resorts, and destinations. The room you walk into, the morning view, the language of arrival.",
  },
  {
    title: "Food & Beverage",
    body: "Restaurants, coffee, and spirits — close-ups, hands at work, and the narrative of a single pour.",
  },
  {
    title: "Fashion & Lifestyle",
    body: "Lookbooks, brand films, and seasonal campaigns for apparel and lifestyle labels. Cut for taste, made to age well.",
  },
  {
    title: "Music & Entertainment",
    body: "Promo films, festival recaps, and live tours for artists, labels, and venues — the medium that taught us to make everything else.",
  },
  {
    title: "Independent Brands",
    body: "Founder-led, design-forward brands at every stage. Sized to your moment, whether it's a Series A campaign or a first launch reel.",
  },
] as const;

export default function HomePage() {
  const featured = getFeaturedProjects();
  const stories = getFeaturedTestimonials().slice(0, 2);

  return (
    <>
      {/* Hero (full-bleed; cancels the layout's pt-24) */}
      <div className="-mt-24">
        <HeroReel />
      </div>

      {/* (02) Work — Portfolio: one row, three equal tiles */}
      <section className="container-edge mt-[var(--space-section)]">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <Reveal as="p" className="eyebrow opacity-60">
            (02) Work
          </Reveal>
          <Link
            href="/work"
            className="eyebrow underline-offset-4 hover:underline"
          >
            Full portfolio →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:gap-x-8">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <WorkCard
                project={project}
                priority={i === 0}
                aspect="aspect-[4/5]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* (03) Clients — revolving banner */}
      <section
        aria-label="Clients we've worked with"
        className="mt-[var(--space-section)]"
      >
        <div className="container-edge mb-8 flex items-baseline justify-between">
          <Reveal as="p" className="eyebrow opacity-60">
            (03) Clients
          </Reveal>
          <Reveal
            as="p"
            className="eyebrow opacity-50"
          >
            Trusted by
          </Reveal>
        </div>
        <div className="border-y border-[color:var(--color-line)] py-10">
          <Marquee
            durationSec={48}
            separator={<span aria-hidden className="px-12" />}
            items={site.clients.map((c) => (
              <span key={c.name} className="flex items-center" title={c.name}>
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain opacity-70 grayscale mix-blend-multiply md:h-12"
                  unoptimized
                />
              </span>
            ))}
          />
        </div>
      </section>

      {/* (04) Solutions */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-12 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          (04) Solutions
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            What we make,
            <br />
            <span className="italic opacity-60">and what it does.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-10 max-w-xl text-base leading-relaxed opacity-70 md:text-lg"
          >
            Films and image campaigns built around the outcome you need —
            not a generic deliverable list.
          </Reveal>

          <ul className="mt-20 space-y-10">
            {SOLUTIONS.map((s, i) => (
              <Reveal
                key={s.title}
                as="li"
                delay={i * 0.04}
                className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-[color:var(--color-line)] pt-6"
              >
                <span className="eyebrow col-span-12 opacity-40 md:col-span-1">
                  0{i + 1}
                </span>
                <div className="col-span-12 md:col-span-11">
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed opacity-70">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* (05) Client Stories — testimonials excerpt */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-12 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          (05) Client Stories
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            What clients
            <br />
            <span className="italic opacity-60">say.</span>
          </Reveal>

          <div className="mt-16 space-y-16 md:space-y-20">
            {stories.map((t, i) => {
              const attribution = [t.role, t.company]
                .filter(Boolean)
                .join(" · ");
              return (
                <Reveal
                  key={`${t.author}-${i}`}
                  delay={i * 0.05}
                  className="border-t border-[color:var(--color-line)] pt-8"
                >
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-tight">
                    &ldquo;{t.title}.&rdquo;
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-80">
                    {t.quote}
                  </p>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <span className="text-sm">— {t.author}</span>
                    {attribution && (
                      <span className="eyebrow opacity-60">{attribution}</span>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <Link
              href="/testimonials"
              className="eyebrow inline-flex items-baseline gap-3 border-b border-[color:var(--color-ink)] pb-1"
            >
              All client stories →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* (06) Industries */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-12 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          (06) Industries
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            Who we
            <br />
            <span className="italic opacity-60">work with.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-10 max-w-xl text-base leading-relaxed opacity-70 md:text-lg"
          >
            We work with brands that take craft seriously — across categories
            where image carries weight.
          </Reveal>

          <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            {INDUSTRIES.map((industry, i) => (
              <Reveal
                key={industry.title}
                as="li"
                delay={i * 0.04}
                className="border-b border-[color:var(--color-line)] py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl tracking-tight md:text-2xl">
                    {industry.title}
                  </span>
                  <span className="text-xs opacity-40">0{i + 1}</span>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed opacity-70 md:text-base">
                  {industry.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
