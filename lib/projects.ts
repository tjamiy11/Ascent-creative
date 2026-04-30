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
  {
    slug: "ducati-streetfighter",
    title: "Streetfighter",
    client: "Ducati",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Auto", "Brand Film"],
    cover: "/video/ducati.jpg",
    clip: "/video/ducati.mp4",
    excerpt:
      "A spec spot for Ducati's Streetfighter — speed, precision, and the geometry of motion.",
  },
  {
    slug: "xai",
    title: "xAI",
    client: "xAI",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Tech", "Brand Film"],
    cover: "/video/xai.jpg",
    clip: "/video/xai.mp4",
    excerpt:
      "A brand film for xAI exploring the texture of computation and the human side of intelligent systems.",
  },
  {
    slug: "lollapalooza-reverb",
    title: "Reverb",
    client: "Lollapalooza",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Music & Festival", "Branded Doc"],
    cover: "/video/lollareverb.jpg",
    clip: "/video/lollareverb.mp4",
    excerpt:
      "An explainer film for Lollapalooza's Reverb sustainability initiative — backstage, on-stage, and the ground crew that makes it work.",
  },
  {
    slug: "miss-usa",
    title: "Miss USA",
    client: "Miss USA",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Editorial"],
    cover: "/video/missusa.jpg",
    clip: "/video/missusa.mp4",
    excerpt:
      "A short brand film for the Miss USA program — composure, ceremony, and the quiet hours before stage.",
  },
  {
    slug: "blum-and-co",
    title: "A Day in the Life",
    client: "Blum & Co",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Founder"],
    cover: "/video/blum.jpg",
    clip: "/video/blum.mp4",
    excerpt:
      "A founder-led day-in-the-life film with the team at Blum & Co — process, hands, and the rhythm of a working studio.",
  },
  {
    slug: "trulli",
    title: "4×4 Trulli",
    client: "Trulli",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Travel", "Brand Film"],
    cover: "/video/trulli.jpg",
    clip: "/video/trulli.mp4",
    excerpt:
      "A travel piece on the 4×4 trail through Italy's Trulli region — stone, dust, and the slow rhythm of arrival.",
  },
  {
    slug: "candy-cloud",
    title: "Candy Cloud",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Music & Festival", "Lifestyle"],
    cover: "/video/candycloud.jpg",
    clip: "/video/candycloud.mp4",
    excerpt:
      "An on-the-floor piece capturing the energy of a sorority night at Candy Cloud — light, friends, and a soundtrack that doesn't quit.",
  },
  {
    slug: "morph",
    title: "Morph",
    client: "Morph",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Music Video", "Concept"],
    cover: "/video/morph.jpg",
    clip: "/video/morph.mp4",
    excerpt:
      "A concept piece scored to original music — form, transition, return.",
  },
  {
    slug: "halogram",
    title: "Halogram",
    client: "Halogram",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Music & Entertainment", "Brand Film"],
    cover: "/video/halogram.jpg",
    clip: "/video/halogram.mp4",
    excerpt:
      "A short concept piece on light, illusion, and the held breath of a live moment.",
  },
  {
    slug: "boxed",
    title: "Boxed",
    client: "Boxed",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Lifestyle"],
    cover: "/video/boxed.jpg",
    clip: "/video/boxed.mp4",
    excerpt:
      "A short-form piece on packaging, ritual, and the small ceremony of a reveal.",
  },
  {
    slug: "gift-card",
    title: "Gift Card",
    client: "Gift Card",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Holiday"],
    cover: "/video/giftcard.jpg",
    clip: "/video/giftcard.mp4",
    excerpt:
      "A holiday spot on the quiet weight of a small, well-given gift.",
  },
  {
    slug: "multiple",
    title: "Multiple",
    client: "Multiple",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Concept", "Editorial"],
    cover: "/video/multiple.jpg",
    clip: "/video/multiple.mp4",
    excerpt:
      "A composition piece exploring rhythm and repetition across short cuts.",
  },
  {
    slug: "teaser",
    title: "Bonus Teaser",
    client: "Bonus Teaser",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Teaser", "Editorial"],
    cover: "/video/teaser.jpg",
    clip: "/video/teaser.mp4",
    excerpt:
      "A bonus teaser cut accompanying the lead spot.",
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
