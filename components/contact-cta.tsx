import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site-config";

type ContactCTAProps = {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Override the default two-line headline */
  heading?: React.ReactNode;
  /** Supporting line under the headline */
  body?: string;
};

const DEFAULT_HEADING = (
  <>
    Let&rsquo;s make
    <br />
    <span className="italic text-[color:var(--color-warm)]">something</span>{" "}
    together.
  </>
);

export function ContactCTA({
  eyebrow = "Start a project",
  heading = DEFAULT_HEADING,
  body = "Tell us what you're working on. A few sentences is enough — brand, scope, rough timing. We reply within two business days.",
}: ContactCTAProps) {
  return (
    <section
      aria-label="Contact"
      className="container-edge mt-[var(--space-section)] border-t border-[color:var(--color-line)] pt-16 md:pt-24"
    >
      <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          {eyebrow}
        </Reveal>

        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            {heading}
          </Reveal>

          <Reveal
            as="p"
            delay={0.1}
            className="mt-8 max-w-xl text-base leading-relaxed opacity-80 md:text-lg"
          >
            {body}
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-ink)] px-6 py-3 text-sm tracking-wide transition-colors duration-300 hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]"
            >
              Start a project
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
