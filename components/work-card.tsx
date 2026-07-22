"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  /**
   * Aspect ratio class, e.g. "aspect-[4/5]". If omitted and the project
   * has `dims`, the card sizes to the asset's natural aspect; otherwise
   * falls back to `aspect-[4/5]`.
   */
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
  aspect,
  firstFrameThumbnail = false,
}: WorkCardProps) {
  // Resolve the card's aspect ratio:
  //   - explicit `aspect` prop wins (Tailwind class, e.g. "aspect-[16/10]")
  //   - else if project has `dims`, render natural ratio via inline style
  //     (Tailwind v4 JIT can't see dynamic class strings, so we can't build
  //     `aspect-[2000/1333]` at runtime as a class)
  //   - else fall back to portrait 4/5
  const aspectClass =
    aspect ?? (project.dims ? undefined : "aspect-[4/5]");
  const naturalAspectStyle = project.dims && !aspect
    ? { aspectRatio: `${project.dims.w} / ${project.dims.h}` }
    : undefined;
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const [inView, setInView] = useState(false);
  const [nearView, setNearView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Lazy-mount the <video> only once the card approaches the viewport.
  // Cards in the hidden duplicate masonry layout (display:none) never
  // intersect, so their videos never mount — this is what stops /work
  // from firing dozens of video requests at once on load. Once seen we
  // keep it mounted (desktop videos are preload="none", so idle-cheap).
  useEffect(() => {
    if (nearView) return;
    const el = mediaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [nearView]);

  // Detect hover-capable / fine-pointer devices. Touch devices skip the
  // hover-driven magnet/tilt/play behavior and use IntersectionObserver
  // instead so video & label still reveal when scrolling on a phone.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const update = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Touch devices: autoplay video & fade the logo when the card is mostly
  // on-screen. Pause when it scrolls away to save battery + bandwidth.
  useEffect(() => {
    if (canHover) return;
    const el = mediaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.55;
        setInView(visible);
        const v = videoRef.current;
        if (!v) return;
        if (visible) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.55, 1], rootMargin: "-15% 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canHover]);

  // "Active" = pointer hover (desktop) OR centered in viewport (touch).
  const active = canHover ? hover : inView;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const magnetX = useTransform(sx, (v) => v * MAGNET_STRENGTH);
  const magnetY = useTransform(sy, (v) => v * MAGNET_STRENGTH);

  const rotY = useTransform(mx, [-220, 220], [6, -6]);
  const rotX = useTransform(my, [-260, 260], [-6, 6]);
  const tiltY = useSpring(rotY, { mass: 1, stiffness: 100, damping: 10 });
  const tiltX = useSpring(rotX, { mass: 1, stiffness: 100, damping: 10 });

  const onEnter = () => {
    if (!canHover) return;
    setHover(true);
    if (project.clip && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (!canHover) return;
    setHover(false);
    mx.set(0);
    my.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!canHover || reduceMotion) return;
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set(e.clientX - cx);
    my.set(e.clientY - cy);
  };

  const useFlatTransform = reduceMotion || !canHover;

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
          useFlatTransform
            ? { transformStyle: "preserve-3d", ...naturalAspectStyle }
            : {
                x: magnetX,
                y: magnetY,
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
                ...naturalAspectStyle,
              }
        }
        className={clsx(
          "relative w-full overflow-hidden bg-[color:var(--color-ink)]/5",
          aspectClass
        )}
      >
        {firstFrameThumbnail && project.clip && !project.thumbnailFromCover ? (
          // First-frame mode: video is the thumbnail (paused at frame 0),
          // plays on hover. Gated on nearView so it only loads once the
          // card approaches the viewport. preload="metadata" loads enough
          // to render the first frame; the currentTime nudge forces Safari
          // to paint it.
          nearView && (
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
          )
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
                active && project.clip ? "opacity-0 blur-md" : "opacity-100 blur-0",
                "group-hover:scale-[1.03]"
              )}
            />
            {project.clip && nearView && (
              <video
                ref={videoRef}
                src={project.clip}
                muted
                loop
                playsInline
                preload={canHover ? "none" : "metadata"}
                aria-hidden
                className={clsx(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  active ? "opacity-100" : "opacity-0"
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
              project.clip && active ? "opacity-0" : "opacity-100"
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
          animate={
            reduceMotion
              ? { opacity: active ? 1 : 0 }
              : { y: active ? 0 : 28, opacity: active ? 1 : 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          }
          className="eyebrow absolute bottom-5 left-5 rounded-full bg-[color:var(--color-paper)] px-3 py-1.5 text-[color:var(--color-ink)]"
        >
          {project.kind === "video" ? "Film" : "Photography"}
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
