"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { Project } from "@/lib/projects";

type WorkCardProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  /** Aspect ratio class, e.g. "aspect-[4/5]" */
  aspect?: string;
};

export function WorkCard({
  project,
  priority,
  className,
  aspect = "aspect-[4/5]",
}: WorkCardProps) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    setHover(true);
    if (project.clip && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    setHover(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={clsx("group block", className)}
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden bg-[color:var(--color-ink)]/5",
          aspect
        )}
      >
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.client}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className={clsx(
            "object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
            hover && project.clip ? "opacity-0" : "opacity-100",
            "group-hover:scale-[1.02]"
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

        <motion.span
          aria-hidden
          initial={false}
          animate={{ y: hover ? 0 : 28, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow absolute bottom-5 left-5 rounded-full bg-[color:var(--color-paper)] px-3 py-1.5 text-[color:var(--color-ink)]"
        >
          {project.kind === "video" ? "Film" : "Series"} · {project.year}
        </motion.span>
      </div>

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
