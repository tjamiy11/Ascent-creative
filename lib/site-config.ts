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
  // Marquee of past + current clients. Each entry pairs the brand name (alt
  // text + accessibility label) with a logo file in /public/logos/.
  clients: [
    { name: "Nike", logo: "/logos/nike.svg" },
    { name: "Hoka", logo: "/logos/hoka.png" },
    { name: "Adidas", logo: "/logos/adidas.png" },
    { name: "Arc'teryx", logo: "/logos/arcteryx.svg", compact: true },
    { name: "Amazon", logo: "/logos/amazon.png" },
    { name: "Lexar", logo: "/logos/lexar.svg" },
    { name: "Ducati", logo: "/logos/ducati.svg", compact: true },
    { name: "PGYTECH", logo: "/logos/pgytech.png" },
    { name: "Insomniac", logo: "/logos/insomniac.png" },
    { name: "Wynn Las Vegas", logo: "/logos/wynn.png" },
    { name: "XS Las Vegas", logo: "/logos/xs-vegas.png", compact: true },
    { name: "Skybar", logo: "/logos/skybar.png", compact: true },
    { name: "Palmer House", logo: "/logos/palmer.png" },
    { name: "Club Quarters", logo: "/logos/club-quarters.png" },
    { name: "Mamitas", logo: "/logos/mamitas.png", compact: true },
    { name: "Bounce", logo: "/logos/bounce.png", compact: true },
    { name: "Jon Cotay", logo: "/logos/jon-cotay.png", compact: true },
    { name: "Flygta Airlines", logo: "/logos/flygta.png", compact: true },
    { name: "DTRL", logo: "/logos/dtrl.png" },
    { name: "DTA", logo: "/logos/dta.png" },
    { name: "Samsung", logo: "/logos/samsung.svg" },
    { name: "Country Splash", logo: "/logos/country-splash.png", mono: true },
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
