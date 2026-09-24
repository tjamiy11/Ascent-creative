import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site-config";

type ContactCTAProps = {
  /** Eyebrow label above the headline */
  eyebrow?: string;
  /** Override the default headline */
  heading?: React.ReactNode;
  /** Tighten the top spacing — used after sections that already have weight */
  compact?: boolean;
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
  compact = false,
}: ContactCTAProps) {
  return (
    <section
      aria-label="Contact"
      className={
        compact
          ? "container-edge mt-20 border-t border-[color:var(--color-line)] pt-16 md:mt-24 md:pt-20"
          : "container-edge mt-[var(--space-section)] border-t border-[color:var(--color-line)] pt-20 md:pt-32"
      }
    >
      <div className="grid grid-cols-12 gap-y-12 md:gap-x-12">
        <Reveal as="p" className="eyebrow col-span-12 opacity-60 md:col-span-3">
          {eyebrow}
        </Reveal>

        <div className="col-span-12 md:col-span-9">
          <Reveal as="h2" className="heading-display max-w-3xl">
            {heading}
          </Reveal>

          <Reveal delay={0.1} as="p" className="mt-8 text-sm opacity-70">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.15} className="mt-14">
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
