"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { WorkCard } from "@/components/work-card";
import type { Project, ProjectKind } from "@/lib/projects";

type Filter = "all" | ProjectKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "photo", label: "Photography" },
];

// Cycle through varied portrait aspects so masonry packing produces an
// abstract, uneven rhythm without leaving big white gaps.
const PHOTO_ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[5/7]",
  "aspect-[4/5]",
] as const;

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.kind === filter)),
    [projects, filter]
  );

  const photosOnly =
    visible.length > 0 && visible.every((p) => p.kind === "photo");

  return (
    <>
      <div role="group" aria-label="Filter work by medium" className="container-edge mb-12 flex items-center gap-2">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "eyebrow rounded-full border px-4 py-2 transition-colors duration-300",
                active
                  ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "border-[color:var(--color-line)] hover:border-[color:var(--color-ink)]"
              )}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto text-xs opacity-50">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {photosOnly ? (
        // CSS columns masonry: photo cards flow top-to-bottom into N
        // columns, packing tightly regardless of card height. framer-motion
        // `layout` doesn't play well with columns, so we drop it here and
        // use a simple fade-in per card instead.
        <div className="container-edge columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0.2 }
                  : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
              className="mb-6 break-inside-avoid"
            >
              <WorkCard
                project={project}
                aspect={PHOTO_ASPECTS[i % PHOTO_ASPECTS.length]}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="container-edge grid grid-cols-12 gap-y-10 md:gap-x-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => {
              const span = i % 3 === 0 ? "md:col-span-7" : "md:col-span-5";
              return (
                <motion.div
                  layout
                  key={project.slug}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  }
                  className={clsx("col-span-12", span)}
                >
                  <WorkCard
                    project={project}
                    aspect={i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
                    firstFrameThumbnail
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
