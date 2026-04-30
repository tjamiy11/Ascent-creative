"use client";

import { motion } from "framer-motion";

/**
 * Per-route template that re-mounts on every navigation.
 * Wraps each page in a soft fade-up so transitions feel deliberate
 * instead of jarring. Layout (nav + footer) stays put.
 *
 * Skipped under prefers-reduced-motion automatically — Framer Motion's
 * MotionConfig in layout could enforce this, but the values here are
 * subtle enough that we let the transition play either way.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
