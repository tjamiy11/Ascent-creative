"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500",
        scrolled
          ? "bg-[color:var(--color-paper)]/75 backdrop-blur-md border-b border-[color:var(--color-line)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-edge flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-display text-xl tracking-tight"
          aria-label={`${site.name} home`}
        >
          {site.shortName}
          <span aria-hidden className="text-[color:var(--color-warm)]">
            .
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-7">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative text-sm tracking-wide transition-opacity",
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={clsx(
                    "absolute -bottom-1 left-0 h-px bg-[color:var(--color-ink)] transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                    active ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
