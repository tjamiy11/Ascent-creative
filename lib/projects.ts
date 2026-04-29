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
    slug: "midnight-bloom",
    title: "Midnight Bloom",
    client: "Lumen Botanicals",
    year: 2025,
    role: "Direction · Cinematography · Color",
    kind: "video",
    tags: ["Brand Film", "Beauty"],
    cover: "/placeholders/cover-1.jpg",
    clip: "/placeholders/clip-1.mp4",
    excerpt:
      "A nocturnal study of bloom and light for a heritage botanicals house, shot on 35mm and finished in deep contrast.",
    featured: true,
  },
  {
    slug: "north-light",
    title: "North Light",
    client: "Atelier Hús",
    year: 2025,
    role: "Direction · Photography",
    kind: "photo",
    tags: ["Editorial", "Interiors"],
    cover: "/placeholders/cover-2.jpg",
    excerpt:
      "An editorial campaign for a Reykjavík furniture atelier — long winter shadows, oiled oak, and quiet ceremony.",
    featured: true,
  },
  {
    slug: "first-pour",
    title: "First Pour",
    client: "Halcyon Coffee Co.",
    year: 2024,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Commercial", "Food & Drink"],
    cover: "/placeholders/cover-3.jpg",
    clip: "/placeholders/clip-3.mp4",
    excerpt:
      "A 60-second portrait of the morning shift at a third-wave roastery in Lisbon. Hands, steam, and a single espresso pour.",
    featured: true,
  },
  {
    slug: "soft-machine",
    title: "Soft Machine",
    client: "Nido Wear",
    year: 2024,
    role: "Photography",
    kind: "photo",
    tags: ["Lookbook", "Apparel"],
    cover: "/placeholders/cover-4.jpg",
    excerpt:
      "A lookbook for a knitwear label exploring softness as a kind of armor. Studio + on-location pairings.",
  },
  {
    slug: "saltwater",
    title: "Saltwater",
    client: "Verre Skin",
    year: 2024,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Beauty"],
    cover: "/placeholders/cover-5.jpg",
    clip: "/placeholders/clip-3.mp4",
    excerpt:
      "Coastline-set brand film for a marine-tech skincare line. Slow water, salt prisms, hand-held intimacy.",
  },
  {
    slug: "the-table",
    title: "The Table",
    client: "Pomme & Fern",
    year: 2023,
    role: "Photography",
    kind: "photo",
    tags: ["Editorial", "Food"],
    cover: "/placeholders/cover-6.jpg",
    excerpt:
      "A series on the unphotographed labor before service — knife work, mise en place, and the last quiet hour.",
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
