/* ============================================================
   DATA.JS — Single source of truth for all portfolio content
   Edit this file to update your portfolio — no framework needed
   ============================================================ */

const PORTFOLIO_DATA = {

  /* ─────────────────────────────────────
     OWNER INFO
  ───────────────────────────────────── */
  owner: {
    name: "Jero Halili",
    initials: "JH",
    title: "Full-Stack Developer & AI Automation Engineer",
    tagline: "I build systems that think, scale & grow.",
    location: "Angeles, Philippines",
    remoteNote: "Open to remote",
    email: "jerobusiness20@gmail.com",
    github: "https://github.com/jerohalili",
    linkedin: "https://linkedin.com/in/jerohalili",
    available: true,
    availableText: "Available for work",
  },

  /* ─────────────────────────────────────
     PROJECTS
  ───────────────────────────────────── */
  projects: [
    {
      id: "ai-marketing-system",
      featured: true,
      num: "01",
      title: "Automated AI Marketing System",
      subtitle: "SaaS Content Engine",
      description: "A fully automated marketing pipeline that generates posts using a local LLM, creates images, schedules and publishes to social media — operating continuously with near-zero marginal cost.",
      problem: "The SaaS company lacked consistent content output, limiting reach and engagement. Manual content creation was slow and unscalable.",
      solution: "Built an end-to-end automation pipeline: LLaMA generates copy, ComfyUI renders visuals, n8n orchestrates the entire workflow and publishes to platforms on a defined schedule.",
      outcome: "Dramatically increased posting frequency, improved algorithmic reach, and reduced content production cost to near-zero. Created a compounding growth flywheel: more content → more impressions → better targeting data.",
      tech: ["LLaMA (local LLM)", "ComfyUI", "n8n", "Local API Orchestration"],
      tags: ["AI Automation", "LLM", "Workflow", "Marketing"],
      impact: "Content cost → $0 marginal · Reach ↑ significantly",
      placeholder: "AI",
      bgColor: "#f0f0ec",
    },
    {
      id: "school-org-system",
      featured: false,
      num: "02",
      title: "School Organization System",
      subtitle: "Full Digital Management Platform",
      description: "A complete digital transformation of a paper-based school organization — official website, enrollment system, centralized database, and admin dashboard built on the MERN stack.",
      problem: "Manual paper workflows caused slow enrollment, data inconsistency, difficult document retrieval, and zero centralized access for administrators.",
      solution: "Designed and built a full MERN stack application with REST API, handling enrollment flows, database-driven record management, digitalized paperwork, and a role-based admin interface.",
      outcome: "Replaced all manual paperwork with digital workflows. Reduced operational latency, improved data integrity, and created scalable infrastructure for future growth.",
      tech: ["MongoDB", "Express", "React", "Node.js", "REST API"],
      tags: ["Full-Stack", "Database", "MERN", "System Design"],
      impact: "Paper → digital · Admin efficiency ↑ · Zero data duplication",
      placeholder: "DB",
      bgColor: "#efefeb",
    },
    {
      id: "artist-portfolio",
      featured: false,
      num: "03",
      title: "Artist Portfolio Website",
      subtitle: "Digital Presence for a Visual Artist",
      description: "A permanent digital portfolio for a painter — featuring a curated gallery, artist biography, exhibition announcements, and direct inquiry functionality.",
      problem: "The artist had no centralized platform, limiting visibility, discoverability, and sales opportunities beyond social media.",
      solution: "Designed and shipped a clean static portfolio site with gallery, bio, news section, and contact form. Deployed on GitHub Pages for zero ongoing hosting cost.",
      outcome: "Created a professional online presence that increased perceived legitimacy, improved direct buyer communication, and eliminated dependency on social media algorithms.",
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      tags: ["Web Design", "Static Site", "UI/UX", "Frontend"],
      impact: "Zero to live in days · Direct buyer inquiries enabled",
      placeholder: "Art",
      bgColor: "#f5f5f0",
    },
  ],

  /* ─────────────────────────────────────
     SKILLS
  ───────────────────────────────────── */
  skills: [
    {
      category: "Engineering",
      items: [
        { name: "Full-Stack Development", level: 85, label: "Advanced" },
        { name: "Database Architecture", level: 88, label: "Advanced" },
        { name: "REST API Design", level: 82, label: "Advanced" },
        { name: "MERN Stack", level: 80, label: "Advanced" },
      ]
    },
    {
      category: "AI & Automation",
      items: [
        { name: "AI Workflow Automation", level: 85, label: "Advanced" },
        { name: "LLM Integration", level: 78, label: "Proficient" },
        { name: "n8n / Make / Zapier", level: 82, label: "Advanced" },
        { name: "Prompt Engineering", level: 80, label: "Proficient" },
      ]
    },
    {
      category: "Design & Marketing",
      items: [
        { name: "UI/UX Design", level: 75, label: "Proficient" },
        { name: "Conversion-Focused Landing Pages", level: 78, label: "Proficient" },
        { name: "Digital Marketing Strategy", level: 72, label: "Proficient" },
        { name: "Content Systems", level: 76, label: "Proficient" },
      ]
    },
    {
      category: "Tools & Languages",
      items: [
        { name: "JavaScript / HTML / CSS", level: 90, label: "Advanced" },
        { name: "Python", level: 72, label: "Proficient" },
        { name: "Git & GitHub", level: 85, label: "Advanced" },
        { name: "Figma", level: 70, label: "Proficient" },
      ]
    },
  ],

  /* Skills constellation data for canvas vis */
  skillNodes: [
    { label: "Full-Stack Dev", x: 0.5, y: 0.2, size: 14, group: "engineering" },
    { label: "Database Arch.", x: 0.75, y: 0.35, size: 13, group: "engineering" },
    { label: "REST APIs", x: 0.8, y: 0.6, size: 11, group: "engineering" },
    { label: "MERN Stack", x: 0.65, y: 0.75, size: 11, group: "engineering" },
    { label: "AI Automation", x: 0.3, y: 0.25, size: 14, group: "ai" },
    { label: "LLM Integration", x: 0.15, y: 0.45, size: 12, group: "ai" },
    { label: "n8n / Make", x: 0.2, y: 0.65, size: 11, group: "ai" },
    { label: "Prompt Eng.", x: 0.35, y: 0.78, size: 10, group: "ai" },
    { label: "UI/UX Design", x: 0.5, y: 0.88, size: 11, group: "design" },
    { label: "Marketing Tech", x: 0.68, y: 0.18, size: 10, group: "design" },
    { label: "JavaScript", x: 0.18, y: 0.22, size: 12, group: "tools" },
    { label: "Python", x: 0.82, y: 0.25, size: 10, group: "tools" },
    { label: "Git & GitHub", x: 0.12, y: 0.75, size: 11, group: "tools" },
    { label: "Figma", x: 0.88, y: 0.75, size: 10, group: "tools" },
  ],

  /* ─────────────────────────────────────
     TIMELINE
  ───────────────────────────────────── */
  timeline: [
    {
      date: "2022",
      title: "Started CS degree",
      sub: "Enrolled in Bachelor of Science in Computer Science. Immediately drawn to databases, systems thinking, and the mechanics of how software actually works at scale.",
    },
    {
      date: "2023",
      title: "First real project shipped",
      sub: "Built and deployed the Artist Portfolio Website — first production site for a real client. Learned that building for someone else's livelihood is a different level of responsibility.",
    },
    {
      date: "2023",
      title: "Dean's List recognition",
      sub: "Achieved academic honors while simultaneously working on side projects. Proved that excellence in both theory and practice is possible with intentional effort.",
    },
    {
      date: "2024",
      title: "School Organization System",
      sub: "Led the full design and development of a MERN-stack digital management platform, replacing paper workflows for an entire organization. First major full-stack system.",
    },
    {
      date: "2024",
      title: "Went deep on AI automation",
      sub: "Built the Automated AI Marketing System using local LLMs, ComfyUI, and n8n. Discovered a passion for making AI do real, repeatable work — not just demos.",
    },
    {
      date: "2025 →",
      title: "Targeting global remote roles",
      sub: "Actively seeking full-stack or AI automation roles with US startups and SaaS companies. Building, shipping, and learning every week.",
    },
  ],

  /* ─────────────────────────────────────
     TESTIMONIALS
  ───────────────────────────────────── */
  testimonials: [
    {
      text: "The website completely changed how I present my work. I can now easily showcase my paintings and share updates without relying on social media. Clients often tell me it makes my work look more professional and trustworthy.",
      name: "Kisinamal",
      role: "Visual Artist & Client",
      initials: "K",
    },
    {
      text: "The system greatly improved our operations. Enrollment is faster, records are organized, and paperwork is now fully digital — making management much more efficient.",
      name: "President, PBSI",
      role: "Organization Leadership",
      initials: "P",
    },
    {
      text: "Our content output increased dramatically without increasing our team size. The automation system allowed us to maintain consistent posting across platforms, which directly improved engagement and visibility.",
      name: "Marketing Lead",
      role: "Technobyte",
      initials: "TN",
    },
  ],

  /* ─────────────────────────────────────
     CERTIFICATIONS
  ───────────────────────────────────── */
  certifications: [
    {
      icon: "🎓",
      name: "BS Computer Science",
      issuer: "University — In Progress",
      status: "in-progress",
      statusLabel: "In Progress",
    },
    {
      icon: "⭐",
      name: "Dean's List — Academic Honors",
      issuer: "University Recognition",
      status: "earned",
      statusLabel: "Earned",
    },
    {
      icon: "☁️",
      name: "Cloud / AI Certification",
      issuer: "In Progress — AWS / Google / Meta",
      status: "in-progress",
      statusLabel: "In Progress",
    },
    {
      icon: "🤖",
      name: "AI & Automation Practitioner",
      issuer: "Self-directed + Project-proven",
      status: "earned",
      statusLabel: "Project Proven",
    },
  ],

  /* ─────────────────────────────────────
     BLOG POSTS
  ───────────────────────────────────── */
  blog: [
    {
      slug: "why-local-llms-change-everything",
      title: "Why local LLMs are changing how I build automation systems",
      excerpt: "Running LLaMA locally isn't just about privacy — it's about owning the stack. Here's what I learned after building a full marketing engine on local inference.",
      category: "AI & Automation",
      date: "2025-01-15",
      readTime: "5 min read",
      href: "blog/why-local-llms-change-everything.html",
    },
    {
      slug: "database-design-lessons",
      title: "Database design lessons from replacing a paper system",
      excerpt: "When you're digitizing an organization's entire workflow, the schema choices you make on day one echo forever. Here's what I'd do differently.",
      category: "Engineering",
      date: "2024-11-08",
      readTime: "7 min read",
      href: "blog/database-design-lessons.html",
    },
    {
      slug: "content-automation-flywheel",
      title: "How I built a content flywheel that runs without me",
      excerpt: "Combining n8n, a local LLM, and ComfyUI to create a zero-marginal-cost content engine. The architecture, the tradeoffs, and what actually worked.",
      category: "AI & Automation",
      date: "2024-09-22",
      readTime: "9 min read",
      href: "blog/content-automation-flywheel.html",
    },
  ],

};

/* Make available globally */
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
