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
    { label: "Work", href: "/work" },
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
    { name: "Arc'teryx", logo: "/logos/arcteryx.svg" },
    { name: "Amazon", logo: "/logos/amazon.png" },
    { name: "Lexar", logo: "/logos/lexar.svg" },
    { name: "Ducati", logo: "/logos/ducati.svg" },
    { name: "PGYTECH", logo: "/logos/pgytech.png" },
    { name: "Insomniac", logo: "/logos/insomniac.png" },
    { name: "Wynn Las Vegas", logo: "/logos/wynn.png" },
    { name: "XS Las Vegas", logo: "/logos/xs-vegas.png" },
    { name: "Skybar", logo: "/logos/skybar.png" },
    { name: "Palmer House", logo: "/logos/palmer.png" },
    { name: "Club Quarters", logo: "/logos/club-quarters.png" },
    { name: "Mamitas", logo: "/logos/mamitas.png" },
    { name: "Bounce", logo: "/logos/bounce.png" },
    { name: "Jon Cotay", logo: "/logos/jon-cotay.png" },
    { name: "Flygta Airlines", logo: "/logos/flygta.png" },
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
    height: 900,
  },
} as const;

export type SiteConfig = typeof site;
