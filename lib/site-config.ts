export const site = {
  name: "Ascent Creative Co.",
  shortName: "Ascent",
  tagline: "Films & photography for brands that mean it.",
  description:
    "Ascent Creative Co. is a video and photography studio crafting cinematic brand films, commercials, and editorial campaigns.",
  email: "hello@ascentcreative.co",
  location: "—",
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
    "Brand Films",
    "Commercials",
    "Product Photography",
    "Editorial",
    "Direction",
    "Color & Finish",
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
