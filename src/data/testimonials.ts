export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The website completely changed how I present my work. I can now easily showcase my paintings and share updates without relying on social media. Clients often tell me it makes my work look professional and trustworthy.",
    author: "Artists, Kisinamal",
    role: "Visual Artist & Client"
  },
  {
    quote: "The system greatly improved our operations. Enrollment is faster, records are organized, and paperwork is now fully digital — making management much more efficient.",
    author: "President, PBSI",
    role: "Organization Leadership"
  },
  {
    quote: "Our content output increased dramatically without increasing our team size. The automation system allowed us to maintain consistent posting across platforms, which directly improved engagement and visibility.",
    author: "Marketing Lead, Angel",
    role: "Technobyte"
  },
  {
    quote: "The AI orchestration built for our data pipeline saved us roughly 20 hours of manual work per week. It's not just code; it's a force multiplier for our business.",
    author: "Tech Founder, Technobyte",
    role: "SaaS Startup"
  }
];