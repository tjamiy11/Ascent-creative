"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroBackground — atmospheric layer behind the hero text.
 *
 * Two very low-opacity radial gradients drift slowly out of phase to give
 * the page a sense of light moving (think sun moving across a wall, but
 * imperceptibly slow). On top, a static SVG film-grain layer adds analog
 * texture — references the studio's craft without being decorative.
 *
 * prefers-reduced-motion: the gradients hold their starting position;
 * the grain stays. Composition still reads, just not moving.
 */
export function HeroBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute -inset-[20%] bg-[radial-gradient(circle_at_30%_30%,rgba(10,10,10,0.07),transparent_55%)]"
        animate={
          reduced
            ? undefined
            : { x: ["0%", "8%", "0%"], y: ["0%", "-6%", "0%"] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -inset-[20%] bg-[radial-gradient(circle_at_75%_70%,rgba(10,10,10,0.05),transparent_55%)]"
        animate={
          reduced
            ? undefined
            : { x: ["0%", "-10%", "0%"], y: ["0%", "8%", "0%"] }
        }
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-multiply"
        preserveAspectRatio="none"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>
    </div>
  );
}
