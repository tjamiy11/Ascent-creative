import clsx from "clsx";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  /** Separator rendered between items in the loop */
  separator?: ReactNode;
  /** Animation duration in seconds (slower = more premium) */
  durationSec?: number;
};

/**
 * Pure-CSS infinite marquee. Children are duplicated so the loop is seamless.
 * Animation is defined in globals.css (.marquee-track @keyframes marquee-x).
 * Honors prefers-reduced-motion via the same CSS rule.
 */
export function Marquee({
  items,
  className,
  separator,
  durationSec,
}: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden className="px-8 opacity-30">
      ·
    </span>
  );
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap">{item}</span>
          {sep}
        </span>
      ))}
    </div>
  );
  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={
          durationSec
            ? { animationDuration: `${durationSec}s` }
            : undefined
        }
      >
        {row}
        {row}
      </div>
    </div>
  );
}
