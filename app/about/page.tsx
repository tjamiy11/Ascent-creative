import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About — Chicago Video Production Agency",
  description:
    "Ascent Studios is a Chicago video production agency. Ten-plus years of experience producing brand commercials, tourism films, and social media content for clients across the U.S. and worldwide.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="container-edge pt-12 pb-32 md:pt-24 md:pb-40">
        <Reveal as="p" className="eyebrow opacity-60">
          (Studio · Chicago)
        </Reveal>
        <Reveal as="h1" className="heading-display mt-6 max-w-5xl">
          A Chicago video
          <br />
          <span className="italic opacity-60">production agency.</span>
        </Reveal>
      </section>

      {/* What is Ascent Studios? */}
      <section className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          What is Ascent Studios?
        </Reveal>
        <div className="col-span-12 space-y-8 md:col-span-7">
          <Reveal
            as="p"
            className="text-base leading-relaxed opacity-90 md:text-lg"
          >
            Based in Chicago, Ascent Studios is a video production
            agency offering a personalized approach to crafting visually
            captivating marketing through creative storytelling.
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="text-base leading-relaxed opacity-80"
          >
            Founded in 2025 and led by Stefan Lewikowski — who brings over a
            decade of experience in photo and video — we&rsquo;ve worked with
            clients in Chicago, New York City, Los Angeles, and on projects
            worldwide in Italy, Ibiza, Bali, Costa Rica, and beyond.
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="text-base leading-relaxed opacity-80"
          >
            We specialize in brand commercials, tourism, and social media
            content. Committed to high-quality productions that exceed
            expectations, we help brands elevate their presence and tell
            compelling stories.
          </Reveal>
        </div>
      </section>

      {/* Mantra — large pull statement */}
      <section className="container-edge mt-[var(--space-section)]">
        <Reveal>
          <p className="eyebrow opacity-60">(Mantra)</p>
        </Reveal>
        <Reveal as="p" delay={0.05} className="heading-display mt-6 max-w-5xl">
          Authentic moments, real emotions, and the{" "}
          <span className="italic opacity-60">
            feeling of being immersed
          </span>{" "}
          in a story.
        </Reveal>
      </section>

      {/* Capabilities */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
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

      {/* Founder */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-12 md:items-start md:gap-x-12">
        <div className="col-span-12 md:col-span-3 md:sticky md:top-32">
          <Reveal as="p" className="eyebrow opacity-60">
            About the founder
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-ink)]/5">
              <Image
                src="/placeholders/cover-1.jpg"
                alt="Stefan Lewikowski, founder of Ascent Studios"
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
            <p className="mt-4 text-sm">Stefan Lewikowski</p>
            <p className="text-xs opacity-50">Founder · Director</p>
          </Reveal>
        </div>

        <div className="col-span-12 space-y-8 md:col-span-8 md:col-start-5">
          <Reveal as="h2" className="heading-display max-w-3xl">
            Stefan
            <br />
            <span className="italic opacity-60">Lewikowski.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="text-base leading-relaxed opacity-90 md:text-lg"
          >
            My journey as a creative started with a love for adventure and a
            desire to never forget the moments that make life exciting. What
            began as a way to preserve memories naturally evolved into a
            career — leading me to work on music videos, personal branding
            films, festival projects, and today, commercial advertising for
            brands.
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="text-base leading-relaxed opacity-80"
          >
            Travel has shaped who I am as a filmmaker. When I was 19, I
            traveled across the world to Bali to help film a documentary — an
            eye-opening experience that showed me I could combine my passion
            for storytelling with my love for exploring new places. Since
            then, I&rsquo;ve traveled to over fifteen countries to keep
            pushing my creative boundaries.
          </Reveal>
        </div>
      </section>

      {/* Why work with us */}
      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal
          as="p"
          className="eyebrow col-span-12 opacity-60 md:col-span-3 md:sticky md:top-32 md:self-start"
        >
          Why work with us
        </Reveal>
        <div className="col-span-12 space-y-8 md:col-span-7">
          <Reveal as="h2" className="heading-display max-w-3xl">
            Creativity, flexibility,
            <br />
            <span className="italic opacity-60">and collaboration.</span>
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="text-base leading-relaxed opacity-90 md:text-lg"
          >
            Backed by more than a decade of photo and video experience, we
            work closely with you to understand your business and make the
            process easy — so we deliver a project your team is proud of.
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="text-base leading-relaxed opacity-80"
          >
            At the core of our work, it&rsquo;s all about authentic moments,
            real emotions, and the feeling of being immersed in a story.
          </Reveal>
        </div>
      </section>

      <ContactCTA
        eyebrow="Get in touch"
        heading={
          <>
            Let&rsquo;s discuss
            <br />
            <span className="italic opacity-60">your vision.</span>
          </>
        }
      />
    </>
  );
}
