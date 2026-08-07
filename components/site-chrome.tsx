"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PortalNav } from "@/components/portal/portal-nav";

/**
 * Picks the chrome for the current route.
 *
 * The marketing site and the portal are the same Next.js app but want
 * different frames: marketing gets the tall nav, Lenis smooth scroll, and the
 * full footer; the portal gets a thin header, native scrolling (smooth scroll
 * fights scroll-spy and video scrubbing), and no footer. The login screen is
 * a boundary — it gets no chrome at all.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inPortal = pathname === "/portal" || pathname.startsWith("/portal/");
  const isLogin = pathname === "/portal/login";

  if (isLogin) {
    return <main className="flex flex-1 flex-col">{children}</main>;
  }

  if (inPortal) {
    return (
      <>
        <PortalNav />
        <main className="flex-1 pt-14">{children}</main>
      </>
    );
  }

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </>
  );
}
