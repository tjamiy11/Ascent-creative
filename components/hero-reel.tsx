"use client";

import { motion } from "framer-motion";

export function HeroReel() {
  return (
    <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[color:var(--color-paper)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,155,61,0.08)_0%,_transparent_60%)]"
      />

      <div className="container-edge relative flex h-full flex-col justify-between pt-32 pb-20 text-[color:var(--color-ink)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Ascent Creative Co. · Est. 2025
        </motion.p>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,9vw,9rem)]"
          >
            Films &amp; photography
            <br />
            <span className="italic">
              for brands that{" "}
              <span className="text-[color:var(--color-warm)]">mean it.</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center justify-between"
          >
            <p className="max-w-md text-sm leading-relaxed opacity-70">
              An independent studio crafting brand films, commercials, and
              editorial campaigns. Selectively, and with intent.
            </p>
            <span className="eyebrow opacity-60">Scroll</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
