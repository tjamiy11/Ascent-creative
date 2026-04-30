export const site = {
  name: "Ascent Studios",
  shortName: "Ascent Studios",
  tagline: "Chicago Video Production Agency",
  description:
    "Ascent Studios is a Chicago video production agency crafting brand commercials, tourism films, and social media content. Based in Chicago. Serving clients in Chicago, NYC, LA, and worldwide.",
  email: "hello@ascentstudios.com",
  location: "Chicago",
  social: {
    instagram: "https://instagram.com/",
    vimeo: "https://vimeo.com/",
    are_na: "https://are.na/",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  // Marquee of past + current clients. Each entry pairs the brand name (alt
  // text + accessibility label) with a logo file in /public/logos/.
  clients: [
    { name: "Nike", logo: "/logos/nike.svg" },
    { name: "Hoka", logo: "/logos/hoka.png" },
    { name: "Adidas", logo: "/logos/adidas.png" },
    { name: "Arc'teryx", logo: "/logos/arcteryx.png" },
    { name: "Amazon", logo: "/logos/amazon.png" },
    { name: "Lexar", logo: "/logos/lexar.webp" },
    { name: "PGYTECH", logo: "/logos/pgytech.png" },
    { name: "Insomniac", logo: "/logos/insomniac.png" },
    { name: "Wynn Las Vegas", logo: "/logos/wynn.png" },
    { name: "XS Las Vegas", logo: "/logos/xs-vegas.png" },
    { name: "Skybar", logo: "/logos/skybar.png" },
    { name: "Palmer House", logo: "/logos/palmer.png" },
    { name: "Club Quarters", logo: "/logos/club-quarters.webp" },
    { name: "Mamitas", logo: "/logos/mamitas.png" },
    { name: "Bounce", logo: "/logos/bounce.png" },
    { name: "Warpath × Wakaan", logo: "/logos/warpath-wakaan.jpg" },
    { name: "Jon Cotay", logo: "/logos/jon-cotay.png" },
    { name: "Flygta Airlines", logo: "/logos/flygta.png" },
    { name: "DTRL", logo: "/logos/dtrl.png" },
    { name: "DTA", logo: "/logos/dta.png" },
    { name: "JR", logo: "/logos/jr.png" },
  ],
  capabilities: [
    "Brand Commercials",
    "Tourism Films",
    "Social Media Content",
    "Personal Branding",
    "Music Videos",
    "Direction & Cinematography",
  ],
  honeybook: {
    // When you have your HoneyBook contact form embed, paste the form ID here.
    // Find it in HoneyBook → Tools → Contact Forms → Embed → look for the
    // value after data-hb-id or in the embedded <div id="...">.
    formId: "",
    // The full embed script src; HoneyBook usually serves it from this domain.
    scriptSrc: "https://widget.honeybook.com/assets_users_production/website_placements/widget.js",
  },
} as const;

export type SiteConfig = typeof site;
