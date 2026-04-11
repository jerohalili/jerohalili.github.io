# Jero Halili — Portfolio

> Personal portfolio website for Jero Halili — Full-Stack Developer & AI Automation Engineer.
> Built with plain HTML, CSS, and JavaScript. No frameworks. No build step. No excuses.

**Live site:** https://jerohalili.github.io

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Plain HTML/CSS/JS | Zero build step, universally readable, GitHub Pages native |
| Fonts | DM Serif Display + DM Sans | Editorial warmth + modern legibility |
| Content | `js/data.js` | Single file to update — no CMS login required |
| Contact form | Formspree | Free, no backend needed |
| AI Chatbot | Anthropic API | Context-aware chatbot trained on portfolio data |
| Deployment | GitHub Pages + GitHub Actions | Free, fast, automatic on push |

---

## Project structure

```
jero-portfolio/
├── index.html                          # Main portfolio page
├── css/
│   ├── tokens.css                      # Design tokens (colors, spacing, type scale)
│   ├── reset.css                       # CSS reset + base styles
│   ├── main.css                        # All section styles
│   ├── components.css                  # Reusable component styles
│   ├── animations.css                  # Scroll reveals, transitions
│   ├── dark.css                        # Dark mode overrides
│   └── case-study.css                  # Case study page styles
├── js/
│   ├── data.js                         # ★ ALL CONTENT LIVES HERE — edit this
│   ├── theme.js                        # Dark/light mode toggle
│   ├── nav.js                          # Navigation scroll + mobile menu
│   ├── animations.js                   # Intersection observer reveals
│   ├── projects.js                     # Renders project cards from data.js
│   ├── skills.js                       # Canvas constellation + skill bars
│   ├── timeline.js                     # Journey timeline renderer
│   ├── testimonials.js                 # Testimonial carousel
│   ├── certifications.js               # Certifications grid renderer
│   ├── blog.js                         # Blog cards renderer
│   ├── contact.js                      # Contact form (Formspree)
│   ├── chatbot.js                      # AI chatbot (Anthropic API)
│   ├── cursor.js                       # Custom cursor follower
│   └── main.js                         # App init + smooth scroll
├── pages/
│   ├── case-study-ai-marketing-system.html
│   ├── case-study-school-org-system.html
│   ├── case-study-artist-portfolio.html
│   └── blog.html
├── assets/
│   ├── icons/favicon.svg
│   ├── images/
│   │   ├── projects/                   # Add project screenshots here
│   │   └── og/og-image.png             # Social share image (1200×630px)
│   └── resume-jero-halili.pdf          # Drop your resume here
├── blog/posts/                         # Future blog post HTML files
├── .github/workflows/deploy.yml        # GitHub Actions auto-deploy
└── README.md
```

---

## Quick start

### 1. Clone the repo

```bash
git clone https://github.com/jerohalili/jero-portfolio.git
cd jero-portfolio
```

### 2. Open locally

No build step needed — just open `index.html` in your browser:

```bash
# macOS
open index.html

# Windows
start index.html

# Or use VS Code Live Server extension (recommended)
```

### 3. Customize your content

**Everything you need to edit is in one file:** `js/data.js`

Open it and update:
- `owner` — your name, title, email, links
- `projects` — your project details, tech, outcomes
- `skills` — your skill categories and proficiency levels
- `timeline` — your journey milestones
- `testimonials` — client/collaborator quotes
- `certifications` — your credentials
- `blog` — your blog post metadata

---

## Setup checklist

### Contact form (required)
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your Form ID
3. Open `js/contact.js` and replace `YOUR_FORM_ID` with your actual ID

### AI Chatbot (optional but impressive)
The chatbot uses the Anthropic API. For GitHub Pages (client-side only), the API key is exposed — for production, proxy through a serverless function.

For now, the chatbot falls back gracefully to pre-written responses if the API call fails. To enable live AI responses, see `js/chatbot.js`.

### Resume download
1. Export your resume as a PDF
2. Rename it `resume-jero-halili.pdf`
3. Place it in the `assets/` folder

### OG image (for social sharing)
1. Create a 1200×630px image with your name and title
2. Save as `assets/images/og/og-image.png`

### Project screenshots
1. Take screenshots of your projects (16:10 ratio works best)
2. Place in `assets/images/projects/`
3. Update the `project-visual` section in `js/projects.js` to use `<img>` instead of the placeholder div

---

## Deployment to GitHub Pages

### Automatic (recommended)
The repo includes a GitHub Actions workflow that deploys on every push to `main`.

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. Push any change to `main` — it deploys automatically

**Your site will be live at:** `https://yourusername.github.io/jero-portfolio`

### Manual deployment
1. Go to **Settings → Pages**
2. Set source to **Deploy from a branch**
3. Select `main` branch, `/ (root)` folder
4. Click Save

---

## Adding a custom domain

1. Buy a domain (Namecheap, Porkbun, or Google Domains)
2. In your domain registrar, add these DNS records:
   ```
   Type: A     Name: @    Value: 185.199.108.153
   Type: A     Name: @    Value: 185.199.109.153
   Type: A     Name: @    Value: 185.199.110.153
   Type: A     Name: @    Value: 185.199.111.153
   Type: CNAME Name: www  Value: yourusername.github.io
   ```
3. In GitHub repo: **Settings → Pages → Custom domain**
4. Enter your domain and enable **Enforce HTTPS**
5. Wait 24–48h for DNS propagation

---

## Adding new projects

Open `js/data.js` and add a new object to the `projects` array:

```js
{
  id: "my-new-project",        // used for case study URL
  featured: false,              // true = large card (first only)
  num: "04",
  title: "My New Project",
  subtitle: "Short description",
  description: "1-2 sentence project overview...",
  problem: "What problem did it solve?",
  solution: "What did you build and how?",
  outcome: "What was the result?",
  tech: ["React", "Supabase", "Tailwind"],
  tags: ["Full-Stack", "SaaS"],
  impact: "Key metric or outcome",
  placeholder: "NP",           // shown in visual placeholder
  bgColor: "#f0f0ec",
}
```

Then create a case study page in `pages/case-study-my-new-project.html` (copy an existing one as template).

---

## Adding blog posts

1. Create `blog/posts/my-post-title.html` (copy `pages/blog.html` as template)
2. Add metadata to `js/data.js` in the `blog` array:

```js
{
  slug: "my-post-title",
  title: "My Post Title",
  excerpt: "A one-paragraph summary...",
  category: "AI & Automation",
  date: "2025-06-01",
  readTime: "5 min read",
  href: "blog/posts/my-post-title.html",
}
```

---

## Performance targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| Lighthouse Best Practices | 100 |
| First Contentful Paint | < 1s |
| Largest Contentful Paint | < 2s |

Achieved through: system font preloading, minimal JS, no render-blocking resources, proper semantic HTML, and deferred non-critical scripts.

---

## Design decisions

- **DM Serif Display + DM Sans** — editorial warmth meets modern readability
- **Neutral palette (black/white/grey)** — timeless, professional, works in any context
- **No framework** — demonstrates core web fundamentals; also faster than React for a portfolio
- **JSON-driven content** — edit one file to update the entire site
- **Canvas skills visualization** — interactive, memorable, shows technical range
- **AI chatbot** — conversion tool disguised as a feature; answers recruiter questions 24/7
- **WCAG AA compliant** — focus states, ARIA labels, semantic HTML, color contrast

---

## License

MIT — use this template freely. Attribution appreciated but not required.

---

*Built by Jero Halili · [jerobusiness20@gmail.com](mailto:jerobusiness20@gmail.com)*
