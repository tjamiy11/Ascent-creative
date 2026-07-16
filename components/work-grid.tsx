"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { PhotoMasonry } from "@/components/photo-masonry";
import type { Project, ProjectKind } from "@/lib/projects";

type Filter = "all" | ProjectKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "photo", label: "Photography" },
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.kind === filter)),
    [projects, filter]
  );

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

      <PhotoMasonry key={filter} projects={visible} />
    </>
  );
}
