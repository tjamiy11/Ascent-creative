/**
 * Placeholder content for the client portal demo.
 *
 * Nothing here is persisted — it's static fixture data so the screens can be
 * clicked through end to end before any backend exists. When the portal goes
 * real, these types are the shape the database should return; swap the
 * exported consts for queries and the components keep working.
 */

export type Role = "client" | "owner";

export type ItemKind = "proposal" | "review" | "approval" | "shoot" | "delivery";

/** A single shot in a shot list. */
export type Shot = {
  id: string;
  /** "01", "02A" — the number the crew calls out on set. */
  slate: string;
  setup: string;
  /** Lens / movement / framing note. */
  note?: string;
  /** Rough runtime this shot is expected to fill, in seconds. */
  seconds?: number;
};

export type MoodImage = {
  src: string;
  caption: string;
};

export type Comment = {
  id: string;
  author: string;
  /** Seconds into the cut this note is pinned to. */
  at: number;
  body: string;
  /** Relative label — fixture data, so it's written not computed. */
  posted: string;
  resolved?: boolean;
};

export type Cut = {
  id: string;
  /** "Rev 1", "Rev 2" — what the client calls it in email. */
  label: string;
  runtime: string;
  posted: string;
  src: string;
  poster: string;
  status: "in-review" | "approved" | "changes-requested";
  comments: Comment[];
};

export type DeliveryFile = {
  name: string;
  spec: string;
  size: string;
};

export type Delivery = {
  files: DeliveryFile[];
  /** Shown instead of the file list when nothing has shipped yet. */
  note?: string;
};

/** One line item in a proposal. Concrete deliverables, not features. */
export type Deliverable = { title: string; detail: string };

/**
 * The pre-acceptance surface.
 *
 * A proposal has exactly one job: get a yes. Everything on it either builds
 * confidence or removes a reason to hesitate — what they get, when, what it
 * costs, proof it'll be good, and what happens the moment they accept. No
 * shot lists, no logistics, no file manifests; that's all post-signature
 * detail and it reads as homework.
 */
export type Proposal = {
  /** The one line that says what this is, in the client's language. */
  pitch: string;
  /** The strongest frame available. Craft proof before any copy. */
  hero: string;
  /** Two or three short paragraphs of approach. */
  approach: string[];
  deliverables: Deliverable[];
  /** Real dates. "4–6 weeks" is where proposals go to die. */
  timeline: { label: string; date: string }[];
  investment: {
    total: string;
    includes: string[];
    /** Payment split, stated once, plainly. */
    terms: string;
  };
  /**
   * A date Stefan is genuinely holding the crew until. Optional, and only
   * ever a real one — invented scarcity is transparent and costs the job.
   */
  holdUntil?: string;
  /** One testimonial, placed next to the decision rather than buried. */
  proof?: { quote: string; author: string; org: string };
  /** Comparable past work, shown small. */
  examples?: { cover: string; title: string; client: string }[];
  /** What happens after they accept. Removes the fear of a black box. */
  nextSteps: string[];
};

/**
 * A briefing.
 *
 * Flat named fields rather than a list of typed sections: the brief renders as
 * four fixed blocks (concept, shot list, cuts, files), so a polymorphic
 * section union bought nothing but a switch statement. Deck, moodboard, and
 * logistics are attributes of the brief, not sections of their own — they
 * render inside the concept block and the header.
 */
export type Project = {
  slug: string;
  client: string;
  title: string;
  /** One line the client reads to remember which job this is. */
  summary: string;
  status: "in-production" | "in-review" | "delivered";
  cover: string;

  /**
   * "proposal" gates everything below behind an accept. Once accepted the
   * same URL becomes the working brief.
   */
  stage: "proposal" | "active";
  proposal?: Proposal;

  shootDates: string;
  callTime?: string;
  location?: string;

  concept: string[];
  deck?: { slides: number; updated: string };
  moodboard?: MoodImage[];

  shots: Shot[];
  /** Set once the client has signed the shot list off. */
  shotsApprovedOn?: string;

  cuts: Cut[];
  delivery: Delivery;
};

/** Who is "signed in" for the demo. Swap for a real session later. */
export const demoUsers: Record<Role, { name: string; email: string; org: string }> = {
  client: {
    name: "Sample Client",
    email: "client@example.com",
    org: "Wynn Las Vegas",
  },
  owner: {
    name: "Stefan",
    email: "stefan@ascentstudios.co",
    org: "Ascent Studios",
  },
};

export const projects: Project[] = [
  {
    slug: "wynn-spring-campaign",
    client: "Wynn Las Vegas",
    title: "Spring Campaign — Poolside",
    summary: "Three 15s cutdowns plus a 60s hero for the spring poolside push.",
    status: "in-review",
    cover: "/video/palmer.jpg",
    stage: "active",
    shootDates: "Fri Mar 14 – Sat Mar 15",
    callTime: "14:00 both days, wrap by 20:30",
    location: "Wynn pool deck + Tower Suite 2104",
    concept: [
      "Late afternoon, the light going gold and low across the water. We stay close and warm rather than wide and architectural — this is a campaign about how the place feels at 5pm, not what it looks like from a drone.",
      "Cutting language is unhurried. Long lens, shallow depth, a lot of held frames. Music carries the pace so the picture doesn't have to.",
      "The 60s hero opens on water and closes on the room. The three cutdowns each take one moment from the hero and let it breathe on its own.",
    ],
    deck: { slides: 18, updated: "Updated Mar 2" },
    moodboard: [
      { src: "/video/palmer.jpg", caption: "Interior warmth, practical light" },
      { src: "/video/hoka.jpg", caption: "Movement, long lens compression" },
      { src: "/video/blum.jpg", caption: "Held frame, negative space" },
      { src: "/video/candycloud.jpg", caption: "Colour reference — golden hour" },
      { src: "/video/boxed.jpg", caption: "Texture and detail inserts" },
      { src: "/video/croatia.jpg", caption: "Water, late light" },
    ],
    shotsApprovedOn: "Approved Mar 9",
    shots: [
      { id: "s1", slate: "01", setup: "Water surface, sun low", note: "135mm, locked off, let it run 40s", seconds: 6 },
      { id: "s2", slate: "02", setup: "Talent enters frame, back to camera", note: "85mm, slow push on slider", seconds: 4 },
      { id: "s3", slate: "02A", setup: "Same, reverse — face, no eyeline to lens", note: "85mm handheld, breathe with it", seconds: 4 },
      { id: "s4", slate: "03", setup: "Cabana detail — linen, glassware, hand", note: "50mm macro, three passes", seconds: 3 },
      { id: "s5", slate: "04", setup: "Wide establishing, pool to tower", note: "24mm, tripod, hold for the title card", seconds: 5 },
      { id: "s6", slate: "05", setup: "Room reveal at dusk, practicals on", note: "35mm, slow dolly right, ends the hero", seconds: 8 },
    ],
    cuts: [
      {
        id: "hero-rev2",
        label: "Hero 60s — Rev 2",
        runtime: "1:02",
        posted: "Posted 3 days ago",
        src: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/palmer.mp4",
        poster: "/video/palmer.jpg",
        status: "in-review",
        comments: [
          { id: "c1", author: "Sample Client", at: 4, body: "Can we hold this opening frame a beat longer? It cuts before it lands.", posted: "2 days ago" },
          { id: "c2", author: "Sample Client", at: 11, body: "Logo feels small here. Brand team flagged it on Rev 1 too.", posted: "2 days ago" },
          { id: "c3", author: "Stefan", at: 11, body: "Bumped 20% in this rev — happy to go further if it still reads small to you.", posted: "1 day ago" },
          { id: "c4", author: "Sample Client", at: 23, body: "Love this section. No notes.", posted: "1 day ago", resolved: true },
        ],
      },
      {
        id: "hero-rev1",
        label: "Hero 60s — Rev 1",
        runtime: "1:04",
        posted: "Posted Mar 21",
        src: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/palmer.mp4",
        poster: "/video/palmer.jpg",
        status: "changes-requested",
        comments: [],
      },
    ],
    delivery: { files: [], note: "Masters unlock here once the hero cut is approved." },
  },
  {
    slug: "hoka-trail-series",
    client: "Hoka",
    title: "Trail Series — Winter",
    summary: "Two social cutdowns from the winter trail shoot. Delivered.",
    status: "delivered",
    cover: "/video/hoka.jpg",
    stage: "active",
    shootDates: "Wed Jan 22",
    callTime: "06:15 for sunrise",
    location: "Starved Rock, IL",
    concept: [
      "Cold, bright, and fast. Everything shot at 60fps so the cutdowns can drop into slow motion without a retime penalty.",
      "No talking head, no voiceover. Feet, breath, and terrain.",
    ],
    shotsApprovedOn: "Approved Jan 18",
    shots: [
      { id: "h1", slate: "01", setup: "Feet on frozen gravel", note: "100mm, 60fps", seconds: 3 },
      { id: "h2", slate: "02", setup: "Breath in cold air, backlit", note: "85mm, 60fps", seconds: 3 },
      { id: "h3", slate: "03", setup: "Ridge line wide, runner small in frame", note: "24mm", seconds: 5 },
    ],
    cuts: [
      {
        id: "trail-rev3",
        label: "Social 15s — Rev 3",
        runtime: "0:15",
        posted: "Posted Feb 4",
        src: "https://pub-1782b44702d746a7a6cc86a019b0fb9f.r2.dev/hoka.mp4",
        poster: "/video/hoka.jpg",
        status: "approved",
        comments: [
          { id: "hc1", author: "Sample Client", at: 8, body: "Approved. Ship it.", posted: "Feb 5", resolved: true },
        ],
      },
    ],
    delivery: {
      files: [
        { name: "hoka-trail-15s-9x16.mp4", spec: "1080×1920 · H.264 · 24Mb/s", size: "48 MB" },
        { name: "hoka-trail-15s-1x1.mp4", spec: "1080×1080 · H.264 · 24Mb/s", size: "41 MB" },
        { name: "hoka-trail-master-prores.mov", spec: "3840×2160 · ProRes 422 HQ", size: "2.1 GB" },
      ],
    },
  },
  {
    slug: "mamitas-summer",
    client: "Mamitas",
    title: "Summer Launch",
    summary: "Concept approved, shooting next month. Shot list is with you.",
    status: "in-production",
    cover: "/video/candycloud.jpg",
    stage: "proposal",
    proposal: {
      pitch:
        "A summer launch film and three social cutdowns, shot over two days on a Fulton Market rooftop.",
      hero: "/video/candycloud.jpg",
      approach: [
        "Loud, saturated, and shot like a memory of a party rather than the party itself. Handheld throughout, nothing locked off except the product frames.",
        "We shoot golden hour both evenings so the light does the work — no colour gels, no rebuilt sunsets in post. The product frames get their own controlled setup at the top of each call.",
      ],
      deliverables: [
        { title: "60-second launch film", detail: "The hero. Yours for paid, organic, and the site." },
        { title: "Three 15s cutdowns", detail: "Vertical, square, and wide — cut from the hero, not reshot." },
        { title: "Twelve stills", detail: "Retouched, pulled from the same setups. No separate photo day." },
        { title: "Full usage rights", detail: "Paid and organic, all channels, in perpetuity." },
      ],
      timeline: [
        { label: "Shoot", date: "Fri Apr 11 – Sat Apr 12" },
        { label: "First cut", date: "Fri Apr 25" },
        { label: "Final delivery", date: "Fri May 9" },
      ],
      investment: {
        total: "$18,500",
        includes: [
          "Two shoot days, crew of five",
          "Camera, lighting, and grip package",
          "Edit, colour, and sound",
          "Two rounds of revisions per cut",
        ],
        terms: "50% to book the dates, 50% on final delivery. Net 15.",
      },
      holdUntil: "We're holding Apr 11–12 until Fri Apr 4.",
      proof: {
        quote:
          "They shot our launch in two days and it outperformed the agency campaign we ran the year before. No hand-holding needed.",
        author: "Marketing Director",
        org: "Palmer House Hotel & Spa",
      },
      examples: [
        { cover: "/video/hoka.jpg", title: "Trail Series", client: "Hoka" },
        { cover: "/video/palmer.jpg", title: "Brand Film", client: "Palmer House" },
        { cover: "/video/blum.jpg", title: "Launch Campaign", client: "Blum" },
      ],
      nextSteps: [
        "You accept, and the Apr 11–12 dates are locked to your name.",
        "I send the deposit invoice and a shot list to sign off, both inside this portal.",
        "We shoot. Cuts land here for your notes, and you approve without a single email thread.",
      ],
    },
    shootDates: "Fri Apr 11 – Sat Apr 12",
    callTime: "16:00 Friday, 15:00 Saturday",
    location: "Fulton Market rooftop, Chicago",
    concept: [
      "Loud, saturated, and shot like a memory of a party rather than the party itself.",
      "Handheld throughout. Nothing locked off except the product frames.",
    ],
    shots: [
      { id: "m1", slate: "01", setup: "Can in hand, condensation", note: "50mm macro", seconds: 2 },
      { id: "m2", slate: "02", setup: "Rooftop group, golden hour", note: "35mm handheld", seconds: 5 },
      { id: "m3", slate: "03", setup: "Pour into glass, backlit", note: "100mm, 120fps", seconds: 3 },
    ],
    cuts: [],
    delivery: { files: [], note: "Nothing delivered yet — shoot is Apr 11." },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCut(slug: string, cutId: string) {
  const project = getProject(slug);
  const cut = project?.cuts.find((c) => c.id === cutId);
  return project && cut ? { project, cut } : undefined;
}

/**
 * The dashboard's "needs you" queue. Hand-ordered by urgency for the demo —
 * a real implementation would sort by due date, then by kind.
 */
export type QueueItem = {
  id: string;
  kind: ItemKind;
  title: string;
  project: string;
  slug: string;
  meta: string;
  /** Deep link to the thing that resolves this item. */
  href: string;
  /** Set when the item is time-boxed and the deadline matters. */
  due?: string;
};

export const queue: QueueItem[] = [
  {
    id: "q1",
    kind: "review",
    title: "Hero 60s — Rev 2 is ready for your notes",
    project: "Wynn Las Vegas · Spring Campaign",
    slug: "wynn-spring-campaign",
    meta: "Posted 3 days ago · 2 open notes",
    href: "/portal/wynn-spring-campaign/review/hero-rev2",
    due: "Needed by Thu",
  },
  // Mamitas is pre-acceptance, so the only thing outstanding is the decision
  // itself. A shot list to sign off and a call time to show up for are both
  // post-acceptance concerns — surfacing them before the yes implies the job
  // is already booked.
  {
    id: "q2",
    kind: "proposal",
    title: "Summer Launch proposal is waiting on you",
    project: "Mamitas · Summer Launch",
    slug: "mamitas-summer",
    meta: "$18,500 · shoot Apr 11–12 · sent Mar 28",
    href: "/portal/mamitas-summer",
    due: "Dates held to Apr 4",
  },
  {
    id: "q4",
    kind: "delivery",
    title: "Final masters are up",
    project: "Hoka · Trail Series",
    slug: "hoka-trail-series",
    meta: "3 files · 2.2 GB total",
    href: "/portal/hoka-trail-series#delivery",
  },
];

/**
 * Stefan's side. Two piles: what the client is sitting on, and what he owes
 * them. Ordered so the thing that unblocks a shoot sorts above everything.
 */
export type StudioItem = {
  id: string;
  title: string;
  project: string;
  href: string;
  meta: string;
  waitingOn: "client" | "studio";
};

export const studioQueue: StudioItem[] = [
  {
    id: "s1",
    title: "Proposal sent, no answer yet",
    project: "Mamitas · Summer Launch",
    href: "/portal/mamitas-summer",
    meta: "$18,500 · sent Mar 28 · opened twice, dates held to Apr 4",
    waitingOn: "client",
  },
  {
    id: "s2",
    title: "Two open notes on Hero Rev 2",
    project: "Wynn Las Vegas · Spring Campaign",
    href: "/portal/wynn-spring-campaign/review/hero-rev2",
    meta: "0:04 hold longer · 0:11 logo size",
    waitingOn: "studio",
  },
  {
    id: "s3",
    title: "Hero cut not yet approved",
    project: "Wynn Las Vegas · Spring Campaign",
    href: "/portal/wynn-spring-campaign/review/hero-rev2",
    meta: "Posted 3 days ago · Client viewed twice",
    waitingOn: "client",
  },
  {
    id: "s4",
    title: "Proposal has no reference frames yet",
    project: "Mamitas · Summer Launch",
    href: "/portal/mamitas-summer",
    meta: "Client asked to see comparable work on the call",
    waitingOn: "studio",
  },
];

export type ActivityEvent = {
  id: string;
  who: string;
  what: string;
  project: string;
  when: string;
};

export const activity: ActivityEvent[] = [
  {
    id: "a1",
    who: "Sample Client",
    what: "left a note at 0:11 on Hero Rev 2",
    project: "Wynn Las Vegas",
    when: "1 day ago",
  },
  {
    id: "a2",
    who: "Sample Client",
    what: "watched Hero Rev 2 to the end",
    project: "Wynn Las Vegas",
    when: "2 days ago",
  },
  {
    id: "a3",
    who: "You",
    what: "posted Hero 60s — Rev 2",
    project: "Wynn Las Vegas",
    when: "3 days ago",
  },
  {
    id: "a4",
    who: "Sample Client",
    what: "approved the shot list",
    project: "Wynn Las Vegas",
    when: "Mar 9",
  },
  {
    id: "a5",
    who: "You",
    what: "sent the Summer Launch proposal",
    project: "Mamitas",
    when: "Mar 28",
  },
];

export const kindLabel: Record<ItemKind, string> = {
  proposal: "Proposal",
  review: "Review",
  approval: "Approval",
  shoot: "Shoot",
  delivery: "Delivery",
};

/** Stage wins over status in any list — "Proposal sent" is the real state. */
export function projectStateLabel(project: Project) {
  return project.stage === "proposal"
    ? "Proposal sent"
    : statusLabel[project.status];
}

export const statusLabel: Record<Project["status"], string> = {
  "in-production": "In production",
  "in-review": "In review",
  delivered: "Delivered",
};
