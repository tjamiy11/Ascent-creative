import Image from "next/image";
import { Reveal } from "@/components/reveal";

/**
 * An asymmetric, hand-placed cluster of stills used as visual rests between
 * text-heavy sections on the home page. Each item declares its own grid
 * placement so a strip reads like an editorial spread rather than a row.
 */
export type PhotoStripItem = {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "3 / 2", "4 / 3", "16 / 9", "3 / 4". */
  aspect: string;
  /** Tailwind grid placement classes scoped to md+ (e.g. "md:col-start-1 md:col-span-6 md:row-start-1 md:mt-12"). */
  place?: string;
};

export function PhotoStrip({ items }: { items: PhotoStripItem[] }) {
  return (
    <section
      aria-label="Selected stills"
      className="container-edge mt-[var(--space-section)]"
    >
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-12 md:auto-rows-min md:gap-x-6 md:gap-y-10 lg:gap-x-8 lg:gap-y-14">
        {items.map((item, i) => (
          <Reveal
            key={item.src}
            delay={i * 0.07}
            className={item.place ?? ""}
          >
            <div
              className="relative w-full overflow-hidden bg-[color:var(--color-line)]"
              style={{ aspectRatio: item.aspect }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
