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
    dims: { w: 720, h: 1280 },
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
    dims: { w: 720, h: 1280 },
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "A marketing film and stills package made in-house at Ascent Studios to draw new clients to the Palmer House Spa. Shot and cut by Stefan.",
    featured: true,
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
    dims: { w: 720, h: 540 },
    excerpt:
      "An Instagram reel for the Samsung T9 — the small portable on the move.",
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "A spec spot for the Ducati Streetfighter. Co-directed by Stefan and David Strib, with Stefan flying drone, David cutting, and Sam riding.",
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "A sustainability piece for Lollapalooza × Reverb — co-shot with Jackson Visuals, who carried it through the edit.",
  },
  {
    slug: "croatia-jeff",
    title: "Croatia",
    client: "Personal",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Travel", "After Movie"],
    cover: "/video/croatia.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/croatia.mp4",
    dims: { w: 1280, h: 720 },
    excerpt:
      "After-movie from a Croatia trip — coastline, slow afternoons, and the rhythm of being away.",
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
    dims: { w: 1920, h: 1080 },
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
    dims: { w: 1280, h: 720 },
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "A run of event-recap edits for Trulli Speakers, cut for brand awareness. Production: Kurza.",
  },
  {
    slug: "alpha-chi-omega-rush",
    title: "Rush Recruitment | Alpha Chi Omega",
    client: "Alpha Chi Omega",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Editorial"],
    cover: "/video/candycloud.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/candycloud.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "Rush recruitment films for the Alpha Chi Omega chapter — a multi-part series of branded video content built across the season. In-house at Ascent Studios with creative direction by Peyton; shot and cut by Stefan.",
  },
  {
    slug: "candy-cloud-morph",
    title: "Morph",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Concept"],
    cover: "/video/morph.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/morph.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "A morph-and-music cut for Candy Cloud — pure motion driven by the track.",
  },
  {
    slug: "candy-cloud-halogram",
    title: "Halogram",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Concept"],
    cover: "/video/halogram.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/halogram.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "A hologram-styled cut for Candy Cloud — refraction, light, and short kinetic beats.",
  },
  {
    slug: "candy-cloud-giftcard",
    title: "Gift Card",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Branded Doc", "Editorial"],
    cover: "/video/giftcard.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/giftcard.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "A gift-card piece for Candy Cloud — color, hands, and a beat that lands.",
  },
  {
    slug: "candy-cloud-teaser",
    title: "Bonus Teaser",
    client: "Candy Cloud",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Social", "Concept"],
    cover: "/video/teaser.jpg",
    clip: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/teaser.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "A six-second bonus cut for Candy Cloud.",
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
    dims: { w: 720, h: 1280 },
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "A composition piece exploring rhythm and repetition across short cuts.",
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
    dims: { w: 1280, h: 720 },
    excerpt:
      "Built for the toughest workplaces — the Sonim phone shot among sparks, dust, and steel.",
  },
  {
    slug: "jordan-pele",
    title: "Pelé",
    client: "Jordan",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Athletic"],
    cover: "/video/jordan-pele.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/jordan-pele.mp4
    clip: "/placeholders/jordan-pele.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "A 30-second cut for Jordan honoring Pelé — vertical, kinetic, made for the feed.",
  },
  {
    slug: "dreamy",
    title: "Dreamy",
    client: "Personal",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Concept", "Editorial"],
    cover: "/video/dreamy.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/dreamy.mp4
    clip: "/placeholders/dreamy.mp4",
    dims: { w: 720, h: 1280 },
    excerpt:
      "An atmospheric piece — slow color, drifted focus, and a track that carries it.",
  },
  {
    slug: "nick-blum",
    title: "Nick Blum",
    client: "Blum & Co",
    year: 2025,
    role: "Cinematography",
    kind: "video",
    tags: ["Founder", "Portrait"],
    cover: "/video/nick-blum.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/nick-blum.mp4
    clip: "/placeholders/nick-blum.mp4",
    dims: { w: 1280, h: 720 },
    excerpt:
      "A short portrait of Nick Blum — the man behind the studio.",
  },
  {
    slug: "uglysteffy",
    title: "Uglysteffy",
    client: "Personal",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Concept", "Personal"],
    cover: "/video/uglysteffy.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/uglysteffy.mp4
    clip: "/placeholders/uglysteffy.mp4",
    dims: { w: 1280, h: 720 },
    excerpt:
      "A long-form personal piece — POV, raw, signed with a mini Stefan logo.",
  },
  {
    slug: "vespa",
    title: "Vespa",
    client: "Vespa",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Auto"],
    cover: "/video/vespa.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/vespa.mp4
    clip: "/placeholders/vespa.mp4",
    dims: { w: 1280, h: 720 },
    excerpt:
      "A brand film for Vespa — wide, cinematic, on the road.",
  },
  {
    slug: "adidas-macys",
    title: "World Cup 2026",
    client: "adidas × Macy's",
    year: 2025,
    role: "Direction · Cinematography",
    kind: "video",
    tags: ["Brand Film", "Retail"],
    cover: "/video/adidas-macys.jpg",
    // Placeholder until the final film is uploaded to R2:
    // https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/adidas-macys.mp4
    clip: "/placeholders/adidas-macys.mp4",
    dims: { w: 1280, h: 720 },
    excerpt:
      "A World Cup 2026 piece for adidas at Macy's — kit, ceremony, and the build to the tournament.",
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
