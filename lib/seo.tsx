import type { Metadata } from "next";
import { site } from "@/lib/site-config";

/**
 * Per-page metadata with matching share previews. Next.js replaces (not
 * merges) `openGraph` from the root layout, so every page builds its own
 * here — otherwise iMessage / Slack / LinkedIn show the same generic title
 * for every link. The share image is app/opengraph-image.png unless `image`
 * is passed.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  // Pages that set openGraph lose the inherited app/opengraph-image.png, so
  // fall back to it explicitly.
  const images = [{ url: image ?? "/opengraph-image.png" }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images,
    },
  };
}

/** Schema.org LocalBusiness for the studio — rendered once in the layout. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#studio`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: "+1-815-212-0774",
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: [
    { "@type": "City", name: "Chicago" },
    { "@type": "Country", name: "United States" },
  ],
  founder: { "@type": "Person", name: "Stefan Lewikowski" },
  foundingDate: "2025",
  knowsAbout: [...site.capabilities, "Video production", "Photography"],
  sameAs: [site.social.instagramStudio, site.social.instagramPersonal],
};

/** Renders a JSON-LD <script>. `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
