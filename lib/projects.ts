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
  logo?: string;
  excerpt: string;
  featured?: boolean;
  /**
   * Force the card to use the `cover` image instead of the video's first
   * frame, even when the parent passes `firstFrameThumbnail`. Use when
   * the video starts on a slate / black frame / something undesirable.
   */
  thumbnailFromCover?: boolean;
  /**
   * Optional list of additional video paths shown on the case-study page
   * as a slideable gallery. The primary `clip` is always shown first.
   */
  gallery?: string[];
  /**
   * Natural dimensions of `cover` (or for video projects, the clip).
   * Used by the masonry photography view + WorkCard so cards size to
   * their content instead of being cropped into a forced aspect ratio.
   */
  dims?: { w: number; h: number };
};

export const projects: Project[] = [
  {
    slug: "hoka-becs",
    title: "Becs",
    client: "Hoka",
    year: 2025,
    role: "DP · Editor",
    kind: "video",
    tags: ["Commercial", "Athletic"],
    cover: "/video/hoka.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/hoka.mp4",
    logo: "/logos/hoka.png",
    excerpt:
      "Becs Gentry on the road — \"forward is a pace.\" A piece on joyful, sustainable movement for Hoka, made with Big Studio and directed by Tom Bender.",
    featured: true,
  },
  {
    slug: "nike-dtlr",
    title: "DTLR",
    client: "Nike",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Athletic"],
    cover: "/video/dtlr.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/dtlr.mp4",
    logo: "/logos/nike.svg",
    excerpt:
      "A new Nike silhouette built for the in-store screens at DTLR. Agency: Limitless. Shot and cut by Stefan.",
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
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/palmer.mp4",
    logo: "/logos/palmer-mark.png",
    excerpt:
      "A marketing film and stills package made in-house at Ascent Studios to draw new clients to the Palmer House Spa. Shot and cut by Stefan.",
    featured: true,
  },
  {
    slug: "ducati-streetfighter",
    title: "Streetfighter",
    client: "Ducati",
    year: 2025,
    role: "Co-direction · Drone",
    kind: "video",
    tags: ["Auto", "Brand Film"],
    cover: "/video/ducati.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/ducati.mp4",
    logo: "/logos/ducati.svg",
    excerpt:
      "A spec spot for the Ducati Streetfighter. Co-directed by Stefan and David Strib, with Stefan flying drone, David cutting, and Sam riding.",
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
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/xai.mp4",
    excerpt:
      "A brand film for xAI exploring the texture of computation and the human side of intelligent systems.",
  },
  {
    slug: "lollapalooza-reverb",
    title: "Reverb",
    client: "Lollapalooza",
    year: 2025,
    role: "Cinematography",
    kind: "video",
    tags: ["Music & Festival", "Branded Doc"],
    cover: "/video/lollareverb.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/lollareverb.mp4",
    excerpt:
      "A sustainability piece for Lollapalooza × Reverb — co-shot with Jackson Visuals, who carried it through the edit.",
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
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/missusa.mp4",
    excerpt:
      "A highlight reel for Miss USA — composure, presence, and the quiet of the runway between rounds.",
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
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/blum.mp4",
    excerpt:
      "A founder-led day-in-the-life film with the team at Blum & Co — process, hands, and the rhythm of a working studio.",
  },
  {
    slug: "trulli",
    title: "4×4 Trulli",
    client: "Trulli Speakers",
    year: 2025,
    role: "Cinematography",
    kind: "video",
    tags: ["Travel", "Brand Film"],
    cover: "/video/trulli.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/trulli.mp4",
    excerpt:
      "A run of event-recap edits for Trulli Speakers, cut for brand awareness. Production: Kurza.",
  },
  {
    slug: "candy-cloud",
    title: "Rush Recruitment | Alpha Chi Omega",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Editorial"],
    cover: "/video/candycloud.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/candycloud.mp4",
    gallery: [
      "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/candycloud.mp4",
      "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/morph.mp4",
      "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/halogram.mp4",
      "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/giftcard.mp4",
      "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/teaser.mp4",
    ],
    excerpt:
      "Rush recruitment films for the Alpha Chi Omega chapter under the Candy Cloud umbrella — a multi-part series of branded video content that builds across the season. In-house at Ascent Studios with creative direction by Peyton; shot and cut by Stefan.",
  },
  {
    slug: "boxed",
    title: "Boxed",
    client: "Boxed Gift",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Lifestyle"],
    cover: "/video/boxed.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/boxed.mp4",
    excerpt:
      "Marketing content videos for Boxed Gift.",
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
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/multiple.mp4",
    excerpt:
      "A composition piece exploring rhythm and repetition across short cuts.",
  },
  {
    slug: "samsung-t9",
    title: "T9",
    client: "Samsung",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Social"],
    cover: "/video/samsung.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/samsung.mp4",
    logo: "/logos/samsung.svg",
    excerpt:
      "An Instagram reel for the Samsung T9 — the small portable on the move.",
  },
  {
    slug: "sonim",
    title: "Sonim",
    client: "Sonim",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Tech"],
    cover: "/video/sonim.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/sonim.mp4",
    excerpt:
      "Built for the toughest workplaces — the Sonim phone shot among sparks, dust, and steel.",
  },
  { slug: "photo-amalfi", title: "Amalfi", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/tree-from-italy-iso800-85mm-f5.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-ash", title: "Ash", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/ash.jpg", dims: { w: 2000, h: 1312 }, excerpt: "From the archive." },
  { slug: "photo-bandits", title: "Bandits", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/bandits.jpg", dims: { w: 2000, h: 1040 }, excerpt: "From the archive." },
  { slug: "photo-cocora", title: "Cocora", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/cocora-85.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-dead-ville", title: "Dead Ville", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/dead-ville-2.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-giraffe-gang", title: "Giraffe Gang", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/giraffe-gang.jpg", dims: { w: 2000, h: 1125 }, excerpt: "From the archive." },
  { slug: "photo-hawaii-heli", title: "Hawaii Heli", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/hawwai-heli-copy-2.jpg", dims: { w: 2000, h: 1704 }, excerpt: "From the archive." },
  { slug: "photo-jr", title: "JR", client: "JR", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/jr-6.jpg", dims: { w: 1333, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-lexi", title: "Lexi", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/lexi.jpg", dims: { w: 1333, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-montrose-skyline", title: "Montrose Skyline", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/montrose-skyl-ine.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-moody", title: "Moody", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/moody.jpg", dims: { w: 1333, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-moody-ii", title: "Moody II", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/moody-4.jpg", dims: { w: 1125, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-nil-and-da-boyz", title: "NIL & Da Boyz", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/nil-and-da-boyz-5.jpg", dims: { w: 2000, h: 1125 }, excerpt: "From the archive." },
  { slug: "photo-oryx", title: "Oryx", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/oryx-or-impala-2.jpg", dims: { w: 2000, h: 1342 }, excerpt: "From the archive." },
  { slug: "photo-pelly", title: "Pelly", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/pelly-2.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-posted-up", title: "Posted Up", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/posted-up-on.jpg", dims: { w: 1333, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-reaching-stars", title: "Reaching for the Stars", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/reaching-for-the-stars.jpg", dims: { w: 1557, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-sandwich-bae", title: "Sandwich Bae", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/sandwich-bae-2.jpg", dims: { w: 2000, h: 1229 }, excerpt: "From the archive." },
  { slug: "photo-sar", title: "Sar", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/sar.jpg", dims: { w: 1336, h: 2000 }, excerpt: "From the archive." },
  { slug: "photo-treez", title: "Treez", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/treez.jpg", dims: { w: 2000, h: 1353 }, excerpt: "From the archive." },
  { slug: "photo-wedits", title: "Wedits", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/wedits-2.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
  { slug: "photo-yeee-75", title: "Yeee 75", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/yeee-75.jpg", dims: { w: 2000, h: 1497 }, excerpt: "From the archive." },
  { slug: "photo-yeee-101", title: "Yeee 101", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/yeee-101.jpg", dims: { w: 2000, h: 1497 }, excerpt: "From the archive." },
  { slug: "photo-yeee-105", title: "Yeee 105", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/yeee-105.jpg", dims: { w: 2000, h: 1497 }, excerpt: "From the archive." },
  { slug: "photo-yeee-108", title: "Yeee 108", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/yeee-108.jpg", dims: { w: 2000, h: 1499 }, excerpt: "From the archive." },
  { slug: "photo-yeee-166", title: "Yeee 166", client: "Personal", year: 2025, role: "Photography", kind: "photo", tags: ["Photography"], cover: "/photos/yeee-166.jpg", dims: { w: 2000, h: 1333 }, excerpt: "From the archive." },
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
