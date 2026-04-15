export interface Service {
  titleTop: string;
  titleBottom: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  iconPath: string;
}

export const services: Service[] = [
  {
    titleTop: "Full-Stack",
    titleBottom: "Systems",
    description: "Scaling businesses with robust MERN stack applications, optimized database architecture, and high-performance REST APIs.",
    features: ["MERN Stack Development", "Database Architecture", "Performance Optimization"],
    iconPath: "M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
  },
  {
    titleTop: "AI & Workflow",
    titleBottom: "Automation",
    description: "Eliminating manual bottlenecks using n8n/Make, LLM integrations, and custom autonomous marketing pipelines.",
    features: ["Autonomous AI Agents", "Low-code Automation", "Prompt Engineering"],
    isFeatured: true,
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
  },
  {
    titleTop: "Product",
    titleBottom: "& UI Design",
    description: "Designing high-conversion landing pages and intuitive UI/UX workflows that turn visitors into loyal users.",
    features: ["UI/UX Design (Figma)", "Conversion Strategies", "Visual Identity"],
    iconPath: "M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
  }
];