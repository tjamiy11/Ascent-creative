export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional slug to link to the related case study in /work */
  projectSlug?: string;
  featured?: boolean;
};

/**
 * Placeholder testimonials. Replace `quote` and `author` blocks with
 * real client feedback as it comes in. `featured: true` projects render
 * larger on /testimonials.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Stefan and the Ascent team turned a half-formed idea into the brand film we'd been chasing for two years. We've never had a partner show up so prepared.",
    author: "Mara Chen",
    role: "Brand Director",
    company: "Lumen Botanicals",
    projectSlug: "midnight-bloom",
    featured: true,
  },
  {
    quote:
      "Footage from our shoot is still the strongest material in our marketing — three years later. Hire them once and you'll never go anywhere else.",
    author: "Joaquín Vargas",
    role: "Founder",
    company: "Verre Skin",
    projectSlug: "saltwater",
    featured: true,
  },
  {
    quote:
      "Authentic moments captured beautifully. They didn't just film us — they understood us. Every frame felt like our brand at its best.",
    author: "Eleanor Halcyon",
    role: "Co-founder",
    company: "Halcyon Coffee Co.",
    projectSlug: "first-pour",
    featured: true,
  },
  {
    quote:
      "Ascent walked into a tight three-day window in Reykjavík and came back with a campaign that out-performed every prior season. The work is unrushed in spite of the schedule.",
    author: "Sigrún Pálsdóttir",
    role: "Creative Director",
    company: "Atelier Hús",
    projectSlug: "north-light",
  },
  {
    quote:
      "Calm on set, exacting in post. The kind of partner you trust to bring your most ambitious idea down to earth without losing what made it ambitious.",
    author: "Dahlia Reyes",
    role: "Head of Brand",
    company: "Nido Wear",
    projectSlug: "soft-machine",
  },
  {
    quote:
      "We told Stefan we wanted something quieter than what's typical in food editorial. He delivered a series we now reuse across every channel and every season.",
    author: "August Pomme",
    role: "Owner",
    company: "Pomme & Fern",
    projectSlug: "the-table",
  },
];

export function getFeaturedTestimonials() {
  return testimonials.filter((t) => t.featured);
}
