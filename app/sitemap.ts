import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/chicago-video-production`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/testimonials`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  // Client films first; personal photo entries add little search value.
  const work: MetadataRoute.Sitemap = projects
    .filter((p) => p.kind === "video")
    .map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...pages, ...work];
}
