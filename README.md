# Ascent Creative Co.

Studio website for **Ascent Creative Co.** — a video and photography studio.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind v4**, with Framer
Motion + Lenis for the editorial motion language and MDX for case-study
content. The contact page is wired to embed a HoneyBook contact form.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/                  Routes (Home, Work, Case study, About, Contact)
components/           Reusable UI (Nav, Footer, HeroReel, WorkCard, ...)
content/projects/     MDX case studies, one per project
lib/projects.ts       Project metadata (titles, covers, tags, etc.)
lib/site-config.ts    Studio name, nav, social, HoneyBook form ID
public/placeholders/  Placeholder hero clip + cover stills (swap freely)
mdx-components.tsx    MDX block mappings (Still, Video, Pull, Pair, h2, p)
```

## Common tasks

### Add a new project

1. Add an entry to the `projects` array in `lib/projects.ts`.
2. Drop a cover image (and optional clip) into `public/placeholders/` (or
   wherever you keep real assets).
3. Create `content/projects/<slug>.mdx` with the case-study content.

The new project shows up automatically in `/work` and at `/work/<slug>`.

### Wire the real HoneyBook form

1. In HoneyBook, go to **Tools → Contact Forms** and create the form.
2. Click **Embed**, copy the placement ID.
3. Paste it into `honeybook.formId` in `lib/site-config.ts`.

The placeholder card in `/contact` will be replaced by the real form.

### Swap placeholder media for real assets

Drop replacements into `public/placeholders/` using the same filenames, or
update the paths in `lib/projects.ts` and the MDX files.

### Reduce-motion support

Lenis smooth scroll, Framer Motion reveals, and the marquee all respect
`prefers-reduced-motion: reduce`.

## Deploy

The site is a standard Next.js App Router app — deploy to Vercel, Netlify, or
any Node host. No environment variables required for the placeholder build.

```bash
npm run build && npm start
```
