export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  link: string;
  isFlagship?: boolean;
}

export const featuredProjects: Project[] = [
    {
        id: "01",
        tag: "Flagship System",
        title: "Automated AI Marketing System",
        description: "A fully automated marketing pipeline that generates posts using a local LLM, creates images, and publishes to social media.",
        link: "/projects/automated-ai-marketing/",
        isFlagship: true
    },
    {
        id: "02",
        tag: "Management System",
        title: "School Org System",
        description: "Administrative dashboard for managing student organizations and events.",
        link: "/projects/school-org-system/"
    },
    {
        id: "03",
        tag: "Creative Showcase",
        title: "Artist Portfolio",
        description: "A high-performance portfolio site built for visual artists with smooth transitions.",
        link: "/projects/artist-portfolio/"
    }
];