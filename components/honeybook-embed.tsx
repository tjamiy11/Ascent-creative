"use client";

import Script from "next/script";
import { site } from "@/lib/site-config";

/**
 * HoneyBook contact form embed.
 *
 * To activate: in HoneyBook → Tools → Contact Forms, copy the form's
 * placement ID and paste it as `honeybook.formId` in lib/site-config.ts.
 * Until then, this renders a styled placeholder card so the contact page
 * remains presentable.
 */
export function HoneybookEmbed() {
  const { formId, scriptSrc } = site.honeybook;

  if (!formId) {
    return (
      <div className="rounded-sm border border-dashed border-[color:var(--color-line)] bg-[color:var(--color-paper)] p-10 md:p-14">
        <p className="eyebrow opacity-60">HoneyBook · placeholder</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
          The inquiry form will live here. Once your HoneyBook contact form is
          set up, paste its placement ID into{" "}
          <code className="rounded bg-[color:var(--color-ink)]/5 px-1.5 py-0.5 text-sm">
            lib/site-config.ts
          </code>{" "}
          (the <code>honeybook.formId</code> field) and the embed will appear
          automatically.
        </p>
        <p className="mt-6 text-sm opacity-60">
          In the meantime, email us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            data-cursor="view"
            className="underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      {/* HoneyBook injects the form into this target div */}
      <div
        id={formId}
        data-hb-id={formId}
        className="hb-p-placement min-h-[600px] w-full"
      />
      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        data-w-token={formId}
      />
    </>
  );
}
