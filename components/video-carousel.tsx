"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Props = {
  videos: string[];
  ariaLabel?: string;
};

/**
 * Slideable gallery of project videos. One plays at a time; arrows + index
 * mirror the TestimonialCarousel pattern so the controls feel native to the
 * site. Each video has native controls so visitors can scrub / mute.
 */
export function VideoCarousel({ videos, ariaLabel = "Project gallery" }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = videos.length;

  const go = (target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex((target + total) % total);
  };
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  if (total === 0) return null;

  return (
    <div>
      <div
        role="region"
        aria-label={ariaLabel}
        className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--color-ink)]/5"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: `translateX(${direction * 64}px)` }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transform: "translateX(0px)" }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: `translateX(${direction * -64}px)` }
            }
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute inset-0"
          >
            <video
              key={videos[index]}
              src={videos[index]}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center gap-5 border-t border-[color:var(--color-line)] pt-6">
        <span className="eyebrow opacity-60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)] text-lg transition-colors hover:bg-[color:var(--color-line)]/30 active:scale-95"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next video"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)] text-lg transition-colors hover:bg-[color:var(--color-line)]/30 active:scale-95"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
