export type ProjectKind = "video" | "photo";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  role: string;
  kind: ProjectKind;
  tags: string[];
  cover: string;
  clip?: string;
  excerpt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hoka-becs",
    title: "Becs",
    client: "Hoka",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Commercial", "Athletic"],
    cover: "/video/hoka.jpg",
    clip: "/video/hoka.mp4",
    excerpt:
      "A short-form spot for Hoka — vertical-first, built to land in the feed without losing the cinematic standard.",
    featured: true,
  },
  {
    slug: "nike-dtla",
    title: "Orange",
    client: "Nike",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Athletic"],
    cover: "/video/dtla.jpg",
    clip: "/video/dtla.mp4",
    excerpt:
      "A downtown LA activation for Nike — color, motion, and the city as a runway.",
    featured: true,
  },
  {
    slug: "palmer-house",
    title: "Palmer House",
    client: "Palmer House Hotel & Spa",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Hospitality", "Tourism"],
    cover: "/video/palmer.jpg",
    clip: "/video/palmer.mp4",
    excerpt:
      "A brand film for the historic Chicago hotel — spa, ceremony, and the language of arrival.",
    featured: true,
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
