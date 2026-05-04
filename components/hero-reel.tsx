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

// Headline word reveal — uses full `transform` strings instead of the `y`
// shorthand so the animation runs on the compositor thread. The hero
// mounts while the Vespa video, LFS posters, and fonts are still
// streaming, so keeping it off the main thread prevents dropped frames.
const headlineWord = {
  hidden: { opacity: 0, transform: "translateY(28px)" },
  show: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const italicWord = {
  hidden: { opacity: 0, transform: "translateY(28px)" },
  show: {
    opacity: 0.6,
    transform: "translateY(0px)",
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
      data-hero
      className="relative w-full overflow-hidden bg-[color:var(--color-ink)]"
    >
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/85"
      />
      <HeroBackground />

      <div className="container-edge relative flex min-h-[100svh] flex-col pt-40 pb-16 text-[color:var(--color-paper)]">
        <div className="my-auto max-w-5xl">
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
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 font-display text-xl tracking-tight md:text-2xl"
          >
            Best in Class Video Production
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-14 max-w-md text-base leading-relaxed"
          >
            Professional Video Marketing for Brands throughout Chicago and Beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-16 flex flex-wrap items-baseline gap-x-10 gap-y-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-3 text-base"
            >
              <span className="border-b border-[color:var(--color-paper)] pb-1">
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
            <span aria-hidden className="hero-orbit-wrap ml-3">
              <span className="hero-orbit" />
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
