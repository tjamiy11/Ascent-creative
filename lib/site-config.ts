export const site = {
  name: "Ascent Studios",
  shortName: "Ascent Studios",
  tagline: "Chicago Video Production Agency",
  description:
    "Ascent Studios is a Chicago video production agency crafting brand commercials, tourism films, and social media content. Based in Chicago. Serving clients in Chicago, NYC, LA, and worldwide.",
  email: "stefan@ascentstudios.co",
  location: "Chicago",
  social: {
    instagramPersonal: "https://www.instagram.com/uglysteffy/",
    instagramStudio: "https://www.instagram.com/ascentstudios.co/",
  },
  nav: [
    { label: "Portfolio", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Start a Project", href: "/contact", cta: true },
  ],
  /**
   * Existing-client entrance. Deliberately kept out of `nav` — it renders
   * after the CTA at a lighter weight so it never competes with the sales
   * path, and staying out of the array keeps it off the footer's Studio list.
   */
  portalLink: { label: "Client Login", href: "/portal/login" },
  /**
   * Marquee of past + current clients.
   *
   * `w` / `h` are the file's true intrinsic pixels and `ink` is the fraction
   * of that box which is actually opaque — both measured from the asset, not
   * guessed. components/client-logo.tsx uses them to scale every logo to the
   * same optical area; without real numbers there, the wall goes uneven again.
   *
   * Adding a logo: drop the trimmed file in /public/logos/, then record its
   * dimensions and ink coverage:
   *   python3 -c "from PIL import Image; im=Image.open('public/logos/x.png').convert('RGBA'); \
   *   b=im.getchannel('A').getbbox(); c=im.getchannel('A').crop(b); \
   *   print(b[2]-b[0], b[3]-b[1], round(sum(1 for v in c.getdata() if v>16)/(c.width*c.height),2))"
   * For SVGs use the viewBox and omit `ink`.
   */
  clients: [
    { name: "Nike", logo: "/logos/nike.svg", w: 1000, h: 356, ink: 0.26 },
    { name: "Hoka", logo: "/logos/hoka.png", w: 1875, h: 513, ink: 0.61 },
    { name: "Adidas", logo: "/logos/adidas.png", w: 356, h: 238, ink: 0.4 },
    {
      name: "Arc'teryx",
      logo: "/logos/arcteryx.svg",
      w: 2500,
      h: 2500,
      ink: 0.13,
      trim: { w: 0.91, h: 0.6 },
    },
    { name: "Amazon", logo: "/logos/amazon.png", w: 917, h: 281, ink: 0.42 },
    { name: "Lexar", logo: "/logos/lexar.svg", w: 2500, h: 714, ink: 0.37 },
    {
      name: "Ducati",
      logo: "/logos/ducati.svg",
      w: 2500,
      h: 2500,
      ink: 0.68,
      // 82% of this file is empty space — sized by its box the wordmark
      // rendered about a fifth of everything around it.
      trim: { w: 0.97, h: 0.185 },
    },
    { name: "PGYTECH", logo: "/logos/pgytech.png", w: 1000, h: 500, ink: 0.04 },
    { name: "Insomniac", logo: "/logos/insomniac.png", w: 2548, h: 438, ink: 0.65 },
    { name: "Wynn Las Vegas", logo: "/logos/wynn.png", w: 1001, h: 450, ink: 0.13 },
    { name: "XS Las Vegas", logo: "/logos/xs-vegas.png", w: 146, h: 164, ink: 0.29 },
    { name: "Skybar", logo: "/logos/skybar.png", w: 216, h: 217, ink: 0.25 },
    { name: "Palmer House", logo: "/logos/palmer.png", w: 967, h: 642, ink: 0.11 },
    { name: "Club Quarters", logo: "/logos/club-quarters.png", w: 276, h: 72, ink: 0.28 },
    { name: "Mamitas", logo: "/logos/mamitas.png", w: 216, h: 210, ink: 0.32 },
    { name: "Bounce", logo: "/logos/bounce.png", w: 285, h: 313, ink: 0.35 },
    { name: "Jon Cotay", logo: "/logos/jon-cotay.png", w: 581, h: 458, ink: 0.25 },
    { name: "Flygta Airlines", logo: "/logos/flygta.png", w: 517, h: 659, ink: 0.3 },
    { name: "DTRL", logo: "/logos/dtrl.png", w: 3242, h: 836, ink: 0.46 },
    { name: "DTA", logo: "/logos/dta.png", w: 378, h: 165, ink: 0.23 },
    {
      name: "Samsung",
      logo: "/logos/samsung.svg",
      w: 2500,
      h: 667,
      ink: 0.57,
      trim: { w: 0.87, h: 0.505 },
    },
    {
      name: "Country Splash",
      logo: "/logos/country-splash.png",
      w: 1031,
      h: 574,
      ink: 0.89,
      mono: true,
    },
  ],
  capabilities: [
    "Brand Commercials",
    "Tourism Films",
    "Social Media Content",
    "Personal Branding",
    "Music Videos",
    "Direction & Cinematography",
  ],
  /**
   * Inquiry form on /contact. Priority:
   *   1. Google Forms iframe — if `googleFormsUrl` is set
   *   2. Built-in mailto form — fallback (works today, no setup needed)
   *
   * To attach a Google Form:
   *   - Open your Google Form → Send → <> (Embed) tab
   *   - Copy the value of `src=` (looks like:
   *     https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true)
   *   - Paste it as `googleFormsUrl` below.
   *   - Adjust `height` if the form is taller/shorter than 900px.
   *   - Submissions land in your linked Google Sheet automatically.
   */
  inquiryForm: {
    googleFormsUrl: "",
    /**
     * The /contact form submits directly to stefan@ascentstudios.co via the
     * serverless route at app/api/inquiry/route.ts (powered by Resend) — no
     * email-client redirect. Setup (one time):
     *   1. Create an account at https://resend.com and add + verify the
     *      sending domain (ascentstudios.co).
     *   2. Create an API key, then add it to Vercel as the env var
     *      RESEND_API_KEY (Project → Settings → Environment Variables).
     *   3. Optionally set INQUIRY_TO / INQUIRY_FROM env vars to override the
     *      defaults (to = site.email, from = inquiries@ascentstudios.co).
     * Until RESEND_API_KEY is set the route returns a friendly error and the
     * form tells visitors to email directly — so the page is never broken.
     */
    height: 900,
  },
} as const;

export type SiteConfig = typeof site;

/**
 * One entry in the client wall. Widened off the `as const` array so optional
 * keys (`ink`, `mono`) are visible on every member rather than only on the
 * literals that happen to carry them.
 */
export type Client = {
  name: string;
  logo: string;
  /** Intrinsic pixel width of the trimmed asset. */
  w: number;
  /** Intrinsic pixel height of the trimmed asset. */
  h: number;
  /** Opaque fraction of the ink box, 0–1. */
  ink?: number;
  /**
   * Fraction of `w`/`h` the artwork actually fills. Only needed for files with
   * empty space baked in — several of the SVG lockups sit inside a square
   * viewBox. Defaults to 1×1 (the trimmed PNGs).
   */
  trim?: { w: number; h: number };
  /** Render greyscale instead of knocked-out black. */
  mono?: boolean;
};
