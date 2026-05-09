"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const check = () => {
      const r = hero.getBoundingClientRect();
      setOverHero(r.bottom > 0 && r.top < window.innerHeight);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // When the mobile drawer is open, the drawer itself paints a translucent
  // dark layer behind the header — force the header into a transparent
  // light-on-dark state so the hamburger / close icon stays visible and
  // the chrome doesn't fight the drawer's frosted glass.
  const tone = menuOpen
    ? "bg-transparent border-b border-transparent text-[color:var(--color-paper)]"
    : overHero
    ? "bg-black/40 backdrop-blur-md border-b border-white/10 text-[color:var(--color-paper)]"
    : scrolled
    ? "bg-[color:var(--color-paper)]/75 backdrop-blur-md border-b border-[color:var(--color-line)]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color,color] duration-500",
          tone
        )}
      >
        <div className="container-edge flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-xl tracking-tight"
            aria-label={`${site.name} home`}
          >
            {site.shortName}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:flex"
          >
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isCta = "cta" in item && item.cta;

              if (isCta) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={
                      overHero
                        ? {
                            backgroundColor: "var(--color-paper)",
                            color: "var(--color-ink)",
                          }
                        : {
                            backgroundColor: "var(--color-ink)",
                            color: "var(--color-paper)",
                          }
                    }
                    className="rounded-full px-4 py-1.5 text-sm tracking-wide transition-[background-color,color,opacity] duration-300 hover:opacity-85"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group relative text-sm tracking-wide transition-opacity",
                    active ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute -bottom-1 left-0 h-px bg-[currentColor] transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative -mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className={clsx(
                "absolute block h-px w-6 bg-current transition-transform duration-300",
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              aria-hidden
              className={clsx(
                "absolute block h-px w-6 bg-current transition-opacity duration-200",
                menuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              aria-hidden
              className={clsx(
                "absolute block h-px w-6 bg-current transition-transform duration-300",
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={clsx(
          "fixed inset-0 z-40 md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          className={clsx(
            "absolute inset-0 bg-black/30 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={clsx(
            "absolute inset-x-0 top-0 border-b border-white/10 bg-black/45 text-[color:var(--color-paper)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
            menuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container-edge flex flex-col gap-1 pt-24 pb-10">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isCta = "cta" in item && item.cta;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "block py-3 font-display text-3xl tracking-tight transition-opacity",
                    active ? "opacity-100" : "opacity-70",
                    isCta && "italic"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={`mailto:${site.email}`}
              className="mt-6 block text-sm opacity-60 underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
