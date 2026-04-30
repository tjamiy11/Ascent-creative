import Link from "next/link";
import { HeroReel } from "@/components/hero-reel";
import { WorkCard } from "@/components/work-card";
import { Reveal } from "@/components/reveal";
import { ContactCTA } from "@/components/contact-cta";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero is full-bleed; cancel the layout's pt-24 with a negative margin */}
      <div className="-mt-24">
        <HeroReel />
      </div>

      <section className="container-edge mt-[var(--space-section)]">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <Reveal as="p" className="eyebrow opacity-60">
            (02) Selected Work
          </Reveal>
          <Link
            href="/work"
            className="eyebrow underline-offset-4 hover:underline"
          >
            Index →
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-y-32 md:gap-x-12">
          {featured.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.05}
              className={
                i === 0
                  ? "col-span-12 md:col-span-9"
                  : i === 1
                    ? "col-span-12 md:col-span-6 md:col-start-7 md:mt-32"
                    : "col-span-12 md:col-span-7 md:col-start-2"
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

      <section className="container-edge mt-[var(--space-section)] grid grid-cols-12 gap-y-10 md:gap-x-12">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          (03) Approach
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            One brief at a time.
          </Reveal>
          <Reveal
            delay={0.1}
            as="p"
            className="mt-10 max-w-xl text-base leading-relaxed opacity-70 md:text-lg"
          >
            We embed early and stay through edit, color, and finish. Six to
            eight projects a year.
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
