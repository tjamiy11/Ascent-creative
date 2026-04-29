"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "view" | "drag" | "play";

const LABEL: Record<CursorMode, string> = {
  default: "",
  view: "View",
  drag: "Drag",
  play: "Play",
};

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    setActive(true);
    document.documentElement.classList.add("cursor-hidden");

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const next = (target?.dataset.cursor as CursorMode | undefined) ?? "default";
      setMode(next);
    };
    const handleLeave = () => {
      x.set(-200);
      y.set(-200);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!active) return null;

  const expanded = mode !== "default";
  const label = LABEL[mode];

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "var(--color-paper)",
      }}
      animate={{
        width: expanded ? 84 : 10,
        height: expanded ? 84 : 10,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {expanded && (
        <span
          className="eyebrow text-[0.625rem]"
          style={{ color: "var(--color-ink)" }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
