"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-route template that re-mounts on every navigation.
 * Wraps each page in a soft fade-up so transitions feel deliberate
 * instead of jarring. Layout (nav + footer) stays put.
 *
 * For reduced motion, this falls back to a short opacity-only transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0.2 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
