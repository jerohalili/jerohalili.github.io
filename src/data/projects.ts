export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  slug: string; // Changed from 'link' to 'slug' for clarity
  isFlagship?: boolean;
  details: {
    subtitle: string;
    tags: string[];
    image: string;
    challenge: string;
    architecture: string[];
    features: string[];
  }
}

export const featuredProjects: Project[] = [
  {
    id: "01",
    tag: "Flagship System",
    title: "Automated AI Marketing System",
    description: "A fully automated marketing pipeline that generates posts using a local LLM.",
    slug: "automated-ai-marketing", 
    isFlagship: true,
    details: {
      subtitle: "Local AI Content Engine",
      tags: ["AI Automation", "LLM", "n8n", "ComfyUI"],
      image: "/images/ai-marketing-hero.jpg",
      challenge: "Marketing teams face a content treadmill. I needed a system that was free, private, and fully autonomous.",
      architecture: ["Meta-Llama-3.1-8B via LM Studio", "n8n via Docker", "ComfyUI", "Ngrok"],
      features: ["Daily Tech Scraper", "Llama 3.1 Copywriting", "Stable Diffusion Visuals", "Auto-push to LinkedIn/IG"]
    }
  },
  {
    id: "02",
    tag: "Management System",
    title: "School Org System",
    description: "Administrative dashboard for managing student organizations and events.",
    slug: "school-org-system",
    details: {
      subtitle: "Management System",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Auth.js"],
      image: "/images/school-system-hero.jpg",
      challenge: "Student organizations struggle with fragmented communication and paper-heavy approval processes.",
      architecture: ["PostgreSQL on Supabase", "Next.js Server Actions", "Role-based Access Control", "Shadcn UI"],
      features: ["Digital Workflow Engine", "Instant Admin Notifications", "Auto-updating Public Calendar"]
    }
  },
  {
    id: "03",
    tag: "Creative Showcase",
    title: "Artist Portfolio",
    description: "A high-performance portfolio site built for visual artists.",
    slug: "artist-portfolio",
    details: {
      subtitle: "Creative Showcase",
      tags: ["Astro", "Framer Motion", "Tailwind", "Vercel"],
      image: "/images/artist-portfolio-hero.jpg",
      challenge: "Visual artists need a digital space that doesn't distract from their work.",
      architecture: ["Astro Static Generation", "Framer Motion Transitions", "Tailwind CSS", "Cloudinary Optimization"],
      features: ["Immersive Masonry Galleries", "Zero-flicker Navigation", "Color-accurate Dark Mode"]
    }
  }
];