import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { ContactCTA } from "@/components/contact-cta";
import { testimonials, getFeaturedTestimonials } from "@/lib/testimonials";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Testimonials — Client Feedback",
  description: `What clients say about working with ${site.name}, a Chicago video production agency. Brand commercials, tourism films, and social media content.`,
};

export default function TestimonialsPage() {
  const featured = getFeaturedTestimonials();
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <>
      {/* Hero */}
      <section className="container-edge pt-12 pb-32 md:pt-24 md:pb-40">
        <Reveal as="p" className="eyebrow opacity-60">
          (Client feedback)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          What clients
          <br />
          <span className="italic opacity-60">say.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={0.1}
          className="mt-10 max-w-md text-base leading-relaxed opacity-70"
        >
          A few words from the people we&rsquo;ve had the privilege of
          working with — across brand films, commercials, tourism, and
          editorial.
        </Reveal>
      </section>

      {/* Featured pull-quotes — one per scroll, generous breathing room */}
      <div className="space-y-[var(--space-section)]">
        {featured.map((t, i) => (
          <section
            key={`${t.author}-${i}`}
            className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-12"
          >
            <Reveal
              as="p"
              className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
            >
              ({String(i + 1).padStart(2, "0")}) {t.company}
            </Reveal>
            <div className="col-span-12 md:col-span-9">
              <Reveal>
                <blockquote className="font-display text-[clamp(1.75rem,3.4vw,3.75rem)] leading-[1.1] tracking-tight">
                  <span className="opacity-30">“</span>
                  {t.quote}
                  <span className="opacity-30">”</span>
                </blockquote>
              </Reveal>

              <Reveal
                delay={0.1}
                className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-[color:var(--color-line)] pt-6"
              >
                <span className="text-base">{t.author}</span>
                <span className="eyebrow opacity-60">
                  {t.role} · {t.company}
                </span>
                {t.projectSlug && (
                  <Link
                    href={`/work/${t.projectSlug}`}
                    className="eyebrow ml-auto underline-offset-4 hover:underline"
                  >
                    See the project →
                  </Link>
                )}
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Quieter quotes — two-up grid */}
      {rest.length > 0 && (
        <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
          <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
            More
          </Reveal>
          <div className="col-span-12 grid grid-cols-1 gap-12 md:col-span-9 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {rest.map((t, i) => (
              <Reveal
                key={`${t.author}-${i}`}
                delay={i * 0.05}
                className="space-y-6"
              >
                <blockquote className="font-display text-xl leading-snug md:text-2xl">
                  <span className="opacity-30">“</span>
                  {t.quote}
                  <span className="opacity-30">”</span>
                </blockquote>
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-[color:var(--color-line)] pt-4">
                  <span className="text-sm">{t.author}</span>
                  <span className="eyebrow opacity-60">
                    {t.role} · {t.company}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Selected clients marquee */}
      <section
        aria-label="Selected clients"
        className="mt-[var(--space-section)] border-y border-[color:var(--color-line)] py-10"
      >
        <Marquee
          durationSec={48}
          items={site.clients.map((c) => (
            <span key={c} className="font-display text-2xl md:text-3xl">
              {c}
            </span>
          ))}
        />
      </section>

      <ContactCTA
        eyebrow="Be next"
        heading={
          <>
            Let&rsquo;s make
            <br />
            <span className="italic opacity-60">your project</span> the next
            one we&rsquo;re proud of.
          </>
        }
      />
    </>
  );
}
