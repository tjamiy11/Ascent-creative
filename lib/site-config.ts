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
    { label: "Contact", href: "/contact" },
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
