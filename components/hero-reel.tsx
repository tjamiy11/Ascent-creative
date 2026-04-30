"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site-config";

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

        <div className="grid grid-cols-12 items-end gap-y-16 md:gap-x-12">
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

          {/* Minimal proof — one short loop, one still */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 grid grid-cols-2 gap-4 md:col-span-4 md:col-start-9 md:grid-cols-1 md:gap-5"
          >
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-ink)]/5">
                <video
                  src="/placeholders/clip-1.mp4"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="eyebrow opacity-60">Brand</span>
                <span className="text-xs opacity-40">(film)</span>
              </figcaption>
            </figure>

            <figure>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-ink)]/5">
                <Image
                  src="/placeholders/cover-2.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="eyebrow opacity-60">Tourism</span>
                <span className="text-xs opacity-40">(photo)</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
