import Image from "next/image";
import clsx from "clsx";
import type { ReactNode } from "react";

export function Still({
  src,
  alt,
  caption,
  aspect = "aspect-[16/10]",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={clsx("my-12", className)}>
      <div className={clsx("relative w-full overflow-hidden bg-[color:var(--color-ink)]/5", aspect)}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs opacity-60">{caption}</figcaption>
      )}
    </figure>
  );
}

export function Video({
  src,
  poster,
  caption,
  aspect = "aspect-video",
}: {
  src: string;
  poster?: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="my-12">
      <div className={clsx("relative w-full overflow-hidden bg-[color:var(--color-ink)]", aspect)}>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs opacity-60">{caption}</figcaption>
      )}
    </figure>
  );
}

export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-16 max-w-3xl border-l-2 border-[color:var(--color-line)] pl-6">
      <p className="font-display text-2xl leading-snug md:text-4xl">
        “{children}”
      </p>
    </blockquote>
  );
}

export function Pair({ children }: { children: ReactNode }) {
  return (
    <div className="my-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
      {children}
    </div>
  );
}

export const mdxBlocks = { Still, Video, Pull, Pair };
