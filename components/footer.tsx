import Link from "next/link";
import { site } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-[var(--space-section)] border-t border-[color:var(--color-line)]">
      <div className="container-edge flex flex-col gap-12 py-14 md:py-16">
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div>
            <p className="eyebrow mb-3 opacity-60">Studio</p>
            <ul className="space-y-1.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 opacity-60">Elsewhere</p>
            <ul className="space-y-1.5">
              <li>
                <a href={site.social.instagram} rel="noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.vimeo} rel="noreferrer" target="_blank">
                  Vimeo
                </a>
              </li>
              <li>
                <a href={site.social.are_na} rel="noreferrer" target="_blank">
                  Are.na
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 opacity-60">Contact</p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 opacity-60">Inquiries</p>
            <p className="leading-relaxed opacity-80">
              We work with brands, agencies, and direct clients on commercials,
              brand films, and editorial campaigns.
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
