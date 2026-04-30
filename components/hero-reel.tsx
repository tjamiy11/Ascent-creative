"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "@/components/hero-background";
import { site } from "@/lib/site-config";

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const italicWord = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 0.6,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroReel() {
  const sectionRef = useRef<HTMLElement>(null);
  // Bottom mantra row fades out as the user scrolls past the hero — gives
  // the hand-off into Selected Work a sense of finality.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bottomY = useTransform(scrollYProgress, [0, 0.6], [0, 24]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[color:var(--color-paper)]"
    >
      <HeroBackground />

      <div className="container-edge relative flex min-h-[100svh] flex-col justify-between pt-40 pb-16 text-[color:var(--color-ink)]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Chicago Video Production Agency · Est. 2025
        </motion.p>

        <div className="max-w-5xl">
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(2.75rem,7vw,7.5rem)]"
          >
            <motion.span variants={headlineWord} className="inline-block">
              Make
            </motion.span>{" "}
            <motion.span variants={headlineWord} className="inline-block">
              your
            </motion.span>{" "}
            <motion.span variants={headlineWord} className="inline-block">
              audience
            </motion.span>
            <br />
            <motion.span
              variants={italicWord}
              className="inline-block italic"
            >
              feel
            </motion.span>{" "}
            <motion.span
              variants={italicWord}
              className="inline-block italic"
            >
              something.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 max-w-md text-base leading-relaxed"
          >
            Brand commercials, tourism films, and social media content from
            Chicago. We help your brand tell stories worth
            remembering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-3 text-base"
            >
              <span className="border-b border-[color:var(--color-ink)] pb-1">
                Start a project
              </span>
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="eyebrow opacity-60 underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ opacity: bottomOpacity, y: bottomY }}
          className="grid grid-cols-12 items-end gap-6"
        >
          <p className="eyebrow col-span-6 opacity-50 md:col-span-3">
            (01) Studio
          </p>
          <p className="col-span-12 max-w-md text-xs leading-relaxed opacity-50 md:col-span-6 md:col-start-7">
            Authentic moments. Real emotions. The feeling of being immersed in
            a story.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
