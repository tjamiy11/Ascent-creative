"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { demoUsers } from "@/lib/portal-data";

/**
 * Portal chrome. Deliberately thinner and quieter than the marketing nav —
 * same wordmark, same rule weight, but 56px tall instead of 88px and no CTA.
 * The portal is a working surface, so the chrome gets out of the way.
 */
export function PortalNav() {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/portal/studio");
  const user = isStudio ? demoUsers.owner : demoUsers.client;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-line)] bg-[color:var(--color-paper)]/85 backdrop-blur-md">
      <div className="container-edge flex h-14 items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Ascent Studios home" className="shrink-0">
            <Image
              src="/brand/ascent-horizontal-grey.png"
              alt="Ascent Studios"
              width={1869}
              height={395}
              className="h-4 w-auto"
            />
          </Link>
          <span
            aria-hidden
            className="h-4 w-px shrink-0 bg-[color:var(--color-line)]"
          />
          <Link
            href={isStudio ? "/portal/studio" : "/portal"}
            className="eyebrow truncate text-[0.65rem] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-ink)]"
          >
            {isStudio ? "Studio" : "Client Portal"}
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <DemoRoleSwitch isStudio={isStudio} />
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-[0.8rem]">{user.name}</p>
            <p className="text-[0.7rem] text-[color:var(--color-mute)]">
              {user.org}
            </p>
          </div>
          <Link
            href="/portal/login"
            className="text-[0.8rem] text-[color:var(--color-mute)] underline-offset-4 transition-colors hover:text-[color:var(--color-ink)] hover:underline"
          >
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * Demo-only affordance so both sides of the portal can be shown in one
 * sitting. A real build reads the role off the session and deletes this.
 */
function DemoRoleSwitch({ isStudio }: { isStudio: boolean }) {
  const options = [
    { label: "Client", href: "/portal", active: !isStudio },
    { label: "Stefan", href: "/portal/studio", active: isStudio },
  ];

  return (
    <div
      className="hidden items-center rounded-full border border-[color:var(--color-line)] p-0.5 md:flex"
      title="Demo only — switch which side of the portal you're viewing"
    >
      {options.map((o) => (
        <Link
          key={o.href}
          href={o.href}
          className={clsx(
            "rounded-full px-2.5 py-1 text-[0.7rem] transition-colors",
            o.active
              ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
              : "text-[color:var(--color-mute)] hover:text-[color:var(--color-ink)]"
          )}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
