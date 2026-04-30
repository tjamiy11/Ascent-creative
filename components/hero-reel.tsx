"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site-config";

// Lazy-load the WebGL canvas so the three.js bundle (~250KB gz) is only
// fetched when the hero is actually rendered, and never on the server.
const HeroVisual = dynamic(
  () => import("@/components/hero-visual").then((m) => m.HeroVisual),
  { ssr: false }
);

export function HeroReel() {
  return (
    <section className="relative w-full bg-[color:var(--color-paper)]">
      <div className="container-edge flex min-h-[100svh] flex-col justify-between pt-40 pb-16 text-[color:var(--color-ink)]">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          Chicago Video Production Agency · Est. 2025
        </motion.p>

        <div className="grid grid-cols-12 items-center gap-y-16 md:gap-x-12">
          {/* Headline + subhead + CTA */}
          <div className="col-span-12 md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-[clamp(2.5rem,6vw,6.5rem)]"
            >
              Make your audience
              <br />
              <span className="italic opacity-60">feel something.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 max-w-md text-base leading-relaxed"
            >
              Brand commercials, tourism films, and social media content from
              downtown Chicago. We help your brand tell stories worth
              remembering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
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

          {/* 3D — slow-rotating glass icosahedron with chromatic dispersion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="col-span-12 md:col-span-5 md:col-start-8"
          >
            <div className="relative aspect-square w-full">
              <HeroVisual />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
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
