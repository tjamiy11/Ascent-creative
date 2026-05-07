# Ascent Studios

Studio website for **Ascent Studios** — a Chicago video and photography studio.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind v4**, with Framer
Motion + Lenis for the editorial motion language and MDX for case-study
content. Video clips are hosted on Cloudflare R2; cover images stay local for
Next.js Image optimization.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/                  Routes (Home, Work, Case study, About, Contact, Testimonials)
components/           Reusable UI (Nav, Footer, HeroReel, WorkCard, VideoCarousel, ...)
content/projects/     Optional MDX case studies, one per project (graceful if missing)
lib/projects.ts       Project metadata (titles, covers, clips, gallery, tags, etc.)
lib/site-config.ts    Studio name, nav, social, clients marquee, inquiry form
lib/testimonials.ts   Testimonial copy used by /testimonials and the home carousel
public/photos/        Transcoded portfolio photos (~13 MB total)
public/logos/         Client logos (transparent PNGs + a few SVGs)
public/video/*.jpg    Cover stills for each video project (mp4s live on R2)
mdx-components.tsx    MDX block mappings (Still, Video, Pull, Pair, h2, p)
```

## Common tasks

### Add a new project

1. Add an entry to the `projects` array in `lib/projects.ts`.
2. For a video project: transcode the source `.mov` to a small `.mp4`
   (`ffmpeg -i in.mov -c:v libx264 -crf 24 -vf "scale=1280:-2" out.mp4`)
   and upload to the R2 bucket. Set `clip` to the R2 URL. Drop a cover
   still in `public/video/<name>.jpg` (a frame extracted via ffmpeg works).
3. For a photo project: drop a web-optimized JPG in `public/photos/` and
   set `kind: "photo"` with `cover` pointing at it.
4. (Optional) Create `content/projects/<slug>.mdx` with case-study content.
   If absent, the case-study page renders without it — no error.

The new project shows up automatically in `/work` and at `/work/<slug>`.

### Wire a Google Form for inquiries

1. Create a Google Form (any structure: name, email, project type, message).
2. Form Settings → enable email notifications.
3. **Send** → `< >` Embed tab → copy the iframe `src` URL.
4. Paste into `lib/site-config.ts` → `inquiryForm.googleFormsUrl`.
5. Adjust `inquiryForm.height` if the form is taller/shorter than 900px.

Submissions land in the linked Google Sheet automatically. Until you set
this, the contact page shows a styled mailto fallback form.

### Swap a thumbnail / replace a video

- **Thumbnail**: replace `public/video/<name>.jpg` (or set
  `thumbnailFromCover: true` on the project to skip first-frame mode).
- **Video**: re-upload a new `<name>.mp4` to the R2 bucket. The repo
  doesn't store mp4s — they live at `pub-XXXX.r2.dev/<name>.mp4`.

### Reduce-motion support

Lenis smooth scroll, Framer Motion reveals, and the marquee all respect
`prefers-reduced-motion: reduce`.

## Deploy

Deployed to **Vercel** at [ascentstudios.co](https://ascentstudios.co). Pushes
to `main` auto-deploy. The site has no required environment variables; videos
load from Cloudflare R2 at hardcoded URLs in the project config.

```bash
npm run build && npm start
```
