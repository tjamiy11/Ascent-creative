import Link from "next/link";
import { site } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-[var(--space-section)] border-t border-[color:var(--color-line)]">
      <div className="container-edge flex flex-col gap-12 py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link
            href="/contact"
            data-cursor="view"
            className="heading-display block max-w-3xl"
          >
            Let&rsquo;s make
            <br />
            <span className="italic text-[color:var(--color-warm)]">
              something
            </span>{" "}
            together.
          </Link>

          <a
            href={`mailto:${site.email}`}
            data-cursor="view"
            className="eyebrow self-start md:self-auto"
          >
            {site.email}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div>
            <p className="eyebrow mb-3 opacity-60">Studio</p>
            <ul className="space-y-1.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} data-cursor="view">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 opacity-60">Elsewhere</p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={site.social.instagram}
                  data-cursor="view"
                  rel="noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.vimeo}
                  data-cursor="view"
                  rel="noreferrer"
                  target="_blank"
                >
                  Vimeo
                </a>
              </li>
              <li>
                <a
                  href={site.social.are_na}
                  data-cursor="view"
                  rel="noreferrer"
                  target="_blank"
                >
                  Are.na
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-3 opacity-60">Inquiries</p>
            <p className="max-w-md leading-relaxed">
              We work with brands, agencies, and direct clients on commercials,
              brand films, and editorial campaigns. Briefs welcome.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-line)] pt-6 text-xs opacity-60 md:flex-row">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Made with intention.</span>
        </div>
      </div>
    </footer>
  );
}
