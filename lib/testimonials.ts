export type Testimonial = {
  /** Short headline the client gave the review (acts as the display H2) */
  title: string;
  /** Full body of the review */
  quote: string;
  author: string;
  role?: string;
  company?: string;
  /** Optional slug to link to the related case study in /work */
  projectSlug?: string;
  featured?: boolean;
};

/**
 * Real client testimonials (provided 2026-04-29). All four are marked
 * featured — the /testimonials page renders each as its own scroll
 * section; the home page surfaces the first two.
 */
export const testimonials: Testimonial[] = [
  {
    title: "Talented is an understatement",
    quote:
      "Stefan is a creative with a vision. After the initial meeting to discuss what you're looking for, he executes a plan and doesn't leave a detail forgotten. Talented is an understatement. You will be more than satisfied with the finished product — whatever your project may be.",
    author: "Rachel Thiakos",
    featured: true,
  },
  {
    title: "Highly recommend for your video needs",
    quote:
      "Worked with Stefan and the team at Ascent Studios to produce a video for my brand and it came out amazing! He was very knowledgeable about the whole process of producing a professional video and I will be back for future projects. Stefan had great energy during the whole project and I highly recommend him for your video production needs in Chicago!",
    author: "Caleb Schaftlein",
    featured: true,
  },
  {
    title: "Not only great at what he does — a joy to be around",
    quote:
      "Working with Stefan is as easy as pie! He's not only great at what he does, but he's a joy to be around. Steffy's work speaks for itself. Completely original and amazing.",
    author: "Nick Blum",
    featured: true,
  },
  {
    title: "Our photos and videos were phenomenal",
    quote:
      "The business I work for has used Stefan and his team numerous times for multiple projects. He is the best and his work speaks for itself. He is a ball of creative energy and can take a vision, an idea, and run with it. In a world where you can work with anyone, he stands out. In each project I have booked and worked with him directly, he is professional, responsive, and delivers quick.",
    author: "Anne",
    featured: true,
  },
];

export function getFeaturedTestimonials() {
  return testimonials.filter((t) => t.featured);
}
