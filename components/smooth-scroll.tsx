"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Lenis computes the max scroll distance from the document height at init.
    // On content-heavy pages (e.g. /work) the masonry grows *after* mount —
    // lazy-mounted <video>s, staggered reveal animations, web-font swap all
    // change the real height. If Lenis never recomputes, it clamps virtual
    // scroll to the stale (shorter) height: the page "stops" partway down and
    // only the native scrollbar (which bypasses Lenis) can reach the rest.
    // Recompute on every size change so the scroll limit tracks real content.
    let resizeFrame = 0;
    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => lenis.resize());
    };

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    window.addEventListener("load", resize);
    // Fonts swapping in (display: "swap") shifts layout after first paint.
    document.fonts?.ready.then(resize).catch(() => {});

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      ro.disconnect();
      window.removeEventListener("load", resize);
      lenis.destroy();
    };
  }, []);

  return null;
}
