"use client";

import { motion } from "framer-motion";

export function HeroReel() {
  return (
    <section className="relative min-h-[90svh] w-full bg-[color:var(--color-paper)]">
      <div className="container-edge relative flex min-h-[90svh] flex-col justify-between pt-40 pb-16 text-[color:var(--color-ink)]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Ascent Studios · Est. 2025
        </motion.p>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.75rem,7vw,7.5rem)]"
          >
            Films &amp; photography
            <br />
            <span className="italic opacity-60">for brands that mean it.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-12 items-end gap-6"
        >
          <p className="eyebrow col-span-6 opacity-50 md:col-span-3">
            (01) Studio
          </p>
          <p className="col-span-12 max-w-md text-sm leading-relaxed opacity-70 md:col-span-6 md:col-start-7">
            An independent studio in moving and still image. Selectively, and
            with intent.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
