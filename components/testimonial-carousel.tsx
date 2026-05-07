"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Testimonial } from "@/lib/testimonials";

type Props = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = testimonials.length;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + total) % total);
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  if (total === 0) return null;

  const current = testimonials[index];
  const attribution = [current.role, current.company]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <div
        role="region"
        aria-label="Client testimonials"
        aria-live="polite"
        aria-atomic="true"
        className="relative min-h-[280px] overflow-hidden border-t border-[color:var(--color-line)] pt-8 md:min-h-[240px]"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    transform: `translateX(${direction * 24}px)`,
                  }
            }
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateX(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    transform: `translateX(${direction * -24}px)`,
                  }
            }
            transition={reduceMotion ? { duration: 0.2 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.15] tracking-tight">
              &ldquo;{current.title}.&rdquo;
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-80">
              {current.quote}
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <span className="text-sm">— {current.author}</span>
              {attribution && (
                <span className="eyebrow opacity-60">{attribution}</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-5 border-t border-[color:var(--color-line)] pt-6">
        <span className="eyebrow opacity-60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)] text-lg transition-colors hover:bg-[color:var(--color-line)]/30 active:scale-95"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)] text-lg transition-colors hover:bg-[color:var(--color-line)]/30 active:scale-95"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
