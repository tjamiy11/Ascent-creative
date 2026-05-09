"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WorkCard } from "@/components/work-card";
import type { Project } from "@/lib/projects";

/**
 * True masonry for any project list (videos + photos): distributes cards
 * into N columns by running cumulative aspect-height (next item goes into
 * the shortest column). No CSS-columns balancing, no big white gaps.
 *
 * Mobile: single column. sm+: two columns. (We pre-compute both layouts
 * at render time and swap by breakpoint, so SSR and client match — no
 * hydration flash.)
 */
type Props = {
  projects: Project[];
  /**
   * Forwarded to each WorkCard. Use for video projects so the card shows
   * the clip paused at frame 0 (instead of cover-then-fade).
   */
  firstFrameThumbnail?: boolean;
};

function distribute(items: Project[], n: number): Project[][] {
  const cols: Project[][] = Array.from({ length: n }, () => []);
  const heights = Array<number>(n).fill(0);
  for (const item of items) {
    const ratio = item.dims ? item.dims.h / item.dims.w : 1;
    let min = 0;
    for (let i = 1; i < n; i++) {
      if (heights[i] < heights[min]) min = i;
    }
    cols[min].push(item);
    heights[min] += ratio;
  }
  return cols;
}

export function PhotoMasonry({ projects, firstFrameThumbnail }: Props) {
  const reduceMotion = useReducedMotion();
  const cols1 = distribute(projects, 1);
  const cols2 = distribute(projects, 2);

  const renderCol = (col: Project[], colIdx: number) => (
    <div key={colIdx} className="flex flex-1 flex-col gap-6">
      {col.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : {
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
        >
          <WorkCard
            project={project}
            firstFrameThumbnail={firstFrameThumbnail}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <div className="container-edge flex gap-6 sm:hidden">
        {cols1.map((c, i) => renderCol(c, i))}
      </div>
      <div className="container-edge hidden gap-6 sm:flex">
        {cols2.map((c, i) => renderCol(c, i))}
      </div>
    </>
  );
}
