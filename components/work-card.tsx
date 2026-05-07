"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import clsx from "clsx";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  /** Aspect ratio class, e.g. "aspect-[4/5]" */
  aspect?: string;
  /**
   * If true and the project has a clip, render the video paused at its
   * first frame as the thumbnail (no cover image). Hovering plays it.
   * Used on the home tri-fold; `/work` stays on cover-image-then-fade.
   */
  firstFrameThumbnail?: boolean;
};

const MAGNET_STRENGTH = 0.18;

export function WorkCard({
  project,
  priority,
  className,
  aspect = "aspect-[4/5]",
  firstFrameThumbnail = false,
}: WorkCardProps) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Cursor-magnet: track pointer offset from card center, translate the
  // media block toward it (max ~16px). Subtle on its own; combines with
  // the custom cursor's "View" prompt to make the card feel pickable.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const magnetX = useTransform(sx, (v) => v * MAGNET_STRENGTH);
  const magnetY = useTransform(sy, (v) => v * MAGNET_STRENGTH);

  // Tilt (decorative): rotation derived from cursor offset, smoothed with
  // a slower/bouncier spring so cards feel alive after the cursor stops.
  const rotY = useTransform(mx, [-220, 220], [6, -6]);
  const rotX = useTransform(my, [-260, 260], [-6, 6]);
  const tiltY = useSpring(rotY, { mass: 1, stiffness: 100, damping: 10 });
  const tiltX = useSpring(rotX, { mass: 1, stiffness: 100, damping: 10 });

  const onEnter = () => {
    setHover(true);
    if (project.clip && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    setHover(false);
    mx.set(0);
    my.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set(e.clientX - cx);
    my.set(e.clientY - cy);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      onFocus={onEnter}
      onBlur={onLeave}
      className={clsx("group block [perspective:1200px]", className)}
    >
      <motion.div
        ref={mediaRef}
        style={
          reduceMotion
            ? { transformStyle: "preserve-3d" }
            : { x: magnetX, y: magnetY, rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }
        }
        className={clsx(
          "relative w-full overflow-hidden bg-[color:var(--color-ink)]/5",
          aspect
        )}
      >
        {firstFrameThumbnail && project.clip && !project.thumbnailFromCover ? (
          // First-frame mode: video is the thumbnail (paused at frame 0),
          // plays on hover. preload="metadata" loads enough to render the
          // first frame. The currentTime nudge forces Safari to paint it.
          <video
            ref={videoRef}
            src={project.clip}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              if (v.currentTime === 0) v.currentTime = 0.01;
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <Image
              src={project.cover}
              alt={`${project.title} — ${project.client}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={priority}
              className={clsx(
                "object-cover transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
                hover && project.clip ? "opacity-0 blur-md" : "opacity-100 blur-0",
                "group-hover:scale-[1.03]"
              )}
            />
            {project.clip && (
              <video
                ref={videoRef}
                src={project.clip}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                className={clsx(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  hover ? "opacity-100" : "opacity-0"
                )}
              />
            )}
          </>
        )}

        {project.logo && (
          <div
            aria-hidden
            className={clsx(
              "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300",
              project.clip && hover ? "opacity-0" : "opacity-100"
            )}
          >
            <Image
              src={project.logo}
              alt=""
              width={240}
              height={80}
              className="h-14 w-auto object-contain brightness-0 invert drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] md:h-20"
              unoptimized
            />
          </div>
        )}

        <motion.span
          aria-hidden
          initial={false}
          animate={reduceMotion ? { opacity: hover ? 1 : 0 } : { y: hover ? 0 : 28, opacity: hover ? 1 : 0 }}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow absolute bottom-5 left-5 rounded-full bg-[color:var(--color-paper)] px-3 py-1.5 text-[color:var(--color-ink)]"
        >
          {project.kind === "video" ? "Film" : "Photography"} · {project.year}
        </motion.span>
      </motion.div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm opacity-60">{project.client}</p>
        </div>
        <span className="eyebrow shrink-0 opacity-50">{project.tags[0]}</span>
      </div>
    </Link>
  );
}
