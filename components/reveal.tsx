"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li";
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  const reduceMotion = useReducedMotion();
  return (
    <Comp
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
