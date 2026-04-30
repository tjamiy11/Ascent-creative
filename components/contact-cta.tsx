import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site-config";

type ContactCTAProps = {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Override the default headline */
  heading?: React.ReactNode;
};

const DEFAULT_HEADING = (
  <>
    Let&rsquo;s make{" "}
    <span className="italic opacity-60">something</span> together.
  </>
);

export function ContactCTA({
  eyebrow = "Start a project",
  heading = DEFAULT_HEADING,
}: ContactCTAProps) {
  return (
    <section
      aria-label="Contact"
      className="container-edge mt-[var(--space-section)] border-t border-[color:var(--color-line)] pt-20 md:pt-32"
    >
      <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          {eyebrow}
        </Reveal>

        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            {heading}
          </Reveal>

          <Reveal
            delay={0.15}
            className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-baseline md:gap-12"
          >
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-3 text-base"
            >
              <span className="border-b border-[color:var(--color-ink)] pb-1">
                Start a project
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <a
              href={`mailto:${site.email}`}
              className="eyebrow underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
