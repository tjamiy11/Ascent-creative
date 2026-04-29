"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HeroReelProps = {
  src: string;
  poster?: string;
};

export function HeroReel({ src, poster }: HeroReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setReady(true);
    v.addEventListener("canplay", onCanPlay);
    v.play().catch(() => {
      /* autoplay blocked — poster stays */
    });
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div
      data-cursor="play"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[color:var(--color-ink)]"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
      />

      <div className="container-edge relative flex h-full flex-col justify-between pt-32 pb-20 text-[color:var(--color-paper)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: ready ? 1 : 0.6, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow opacity-80"
        >
          Ascent Creative Co. · Est. 2025
        </motion.p>

        <div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3rem,11vw,11rem)]"
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
            <p className="max-w-md text-sm leading-relaxed opacity-80">
              An independent studio crafting brand films, commercials, and
              editorial campaigns. Selectively, and with intent.
            </p>
            <span className="eyebrow opacity-70">Scroll</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
