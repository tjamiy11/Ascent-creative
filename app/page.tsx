import Link from "next/link";
import { HeroReel } from "@/components/hero-reel";
import { WorkCard } from "@/components/work-card";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { getFeaturedProjects } from "@/lib/projects";
import { site } from "@/lib/site-config";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero is full-bleed; cancel the layout's pt-24 with a negative margin */}
      <div className="-mt-24">
        <HeroReel />
      </div>

      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-10">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          [01] Studio
        </Reveal>
        <Reveal as="h2" className="heading-display col-span-12 md:col-span-9">
          We make a small number of films and image campaigns each year — for
          brands willing to{" "}
          <span className="italic text-[color:var(--color-warm)]">
            slow down
          </span>{" "}
          and make the right thing.
        </Reveal>
      </section>

      <section className="mt-[var(--space-section)]">
        <div className="container-edge mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow opacity-60">[02] Selected Work</p>
            <h2 className="heading-display mt-3 text-[clamp(2rem,5vw,4rem)]">
              Recent
            </h2>
          </div>
          <Link
            href="/work"
            className="eyebrow underline-offset-4 hover:underline"
          >
            All work →
          </Link>
        </div>

        <div className="container-edge grid grid-cols-12 gap-y-16 md:gap-x-10">
          {featured.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.05}
              className={
                i === 0
                  ? "col-span-12 md:col-span-7"
                  : i === 1
                    ? "col-span-12 md:col-span-5 md:mt-32"
                    : "col-span-12 md:col-span-8 md:col-start-3"
              }
            >
              <WorkCard
                project={project}
                priority={i === 0}
                aspect={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-[var(--space-section)] border-y border-[color:var(--color-line)] py-10">
        <Marquee
          items={site.capabilities.map((c) => (
            <span key={c} className="font-display text-3xl md:text-5xl">
              {c}
            </span>
          ))}
        />
      </section>

      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-10">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          [03] How we work
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display text-[clamp(2rem,6vw,5rem)]">
            One brief at a time.
          </Reveal>
          <Reveal
            delay={0.1}
            as="p"
            className="mt-8 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg"
          >
            We embed early — usually before the brief is fully written — and
            stay through edit, color, and finish. Most projects run 6 to 14
            weeks. We turn down most of what we&rsquo;re asked, so what we make
            we make completely.
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
