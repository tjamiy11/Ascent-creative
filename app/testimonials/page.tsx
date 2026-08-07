import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { ContactCTA } from "@/components/contact-cta";
import { ClientLogo } from "@/components/client-logo";
import { testimonials, getFeaturedTestimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/lib/testimonials";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Testimonials — Client Feedback",
  description: `What clients say about working with ${site.name}, a Chicago video production agency. Brand commercials, tourism films, and social media content.`,
};

function attributionLine(t: Testimonial): string | null {
  const parts = [t.role, t.company].filter(Boolean) as string[];
  return parts.length > 0 ? parts.join(" · ") : null;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Client headshot. Renders the photo when `image` is set, otherwise an
 * initials chip — so a missing/unprovided photo never leaves a broken
 * image icon on the page.
 */
function Avatar({ t, size = 44 }: { t: Testimonial; size?: number }) {
  if (t.image) {
    return (
      <Image
        src={t.image}
        alt={t.author}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
        unoptimized
      />
    );
  }
  return (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-ink)]/5 text-xs font-medium tracking-wide opacity-70"
      style={{ width: size, height: size }}
    >
      {initials(t.author)}
    </span>
  );
}

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

      {/* Featured: title leads, full quote underneath */}
      <div className="space-y-[var(--space-section)]">
        {featured.map((t, i) => {
          const attribution = attributionLine(t);
          return (
            <section
              key={`${t.author}-${i}`}
              className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-12"
            >
              <Reveal
                as="p"
                className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
              >
                ({String(i + 1).padStart(2, "0")}) {t.author}
              </Reveal>
              <div className="col-span-12 md:col-span-9">
                <Reveal
                  as="h2"
                  className="font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.05] tracking-tight"
                >
                  &ldquo;{t.title}.&rdquo;
                </Reveal>

                <Reveal>
                  <blockquote className="mt-10 max-w-3xl text-lg leading-relaxed opacity-80 md:text-xl">
                    {t.quote}
                  </blockquote>
                </Reveal>

                <Reveal
                  delay={0.1}
                  className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-[color:var(--color-line)] pt-6"
                >
                  <span className="flex items-center gap-3 text-base">
                    <Avatar t={t} />
                    {t.author}
                  </span>
                  {attribution && (
                    <span className="eyebrow opacity-60">{attribution}</span>
                  )}
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
          );
        })}
      </div>

      {/* Quieter quotes — two-up grid (renders only when present) */}
      {rest.length > 0 && (
        <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
          <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
            More
          </Reveal>
          <div className="col-span-12 grid grid-cols-1 gap-12 md:col-span-9 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {rest.map((t, i) => {
              const attribution = attributionLine(t);
              return (
                <Reveal
                  key={`${t.author}-${i}`}
                  delay={i * 0.05}
                  className="space-y-5"
                >
                  <h3 className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
                    &ldquo;{t.title}.&rdquo;
                  </h3>
                  <p className="text-sm leading-relaxed opacity-80 md:text-base">
                    {t.quote}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-[color:var(--color-line)] pt-4">
                    <span className="flex items-center gap-2.5 text-sm">
                      <Avatar t={t} size={36} />
                      {t.author}
                    </span>
                    {attribution && (
                      <span className="eyebrow opacity-60">{attribution}</span>
                    )}
                  </div>
                </Reveal>
              );
            })}
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
          separator={<span aria-hidden className="px-12" />}
          items={site.clients.map((c) => (
            <ClientLogo key={c.name} client={c} tone="grey" />
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
