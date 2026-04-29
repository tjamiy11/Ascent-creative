import clsx from "clsx";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  separator?: ReactNode;
};

export function Marquee({ items, className, separator }: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden className="px-8 text-[color:var(--color-warm)]">
      ✦
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
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
