# Jero Halili — Portfolio Website

Personal portfolio website built as a single-file HTML/CSS/JS site, styled after a dark agency template.

## Stack
- Vanilla HTML, CSS, JavaScript (zero dependencies)
- Google Fonts: Syne (headings) + DM Sans (body)
- Canvas API for the interactive skills constellation
- IntersectionObserver for scroll reveal animations

## Features
- 8 sections: Hero, About, Work, Skills, Journey, Testimonials, Certifications, Blog, Contact
- Animated skills constellation (hover-reactive canvas)
- Smooth scroll reveal animations on every section
- Auto-scrolling ticker marquee
- Floating hero card
- Counter animations on stats
- Fully responsive (mobile hamburger menu)
- Dark theme matching the NexGen agency template aesthetic

## Local Development
Just open `index.html` in your browser — no build step needed.

```bash
# Or use a local server (recommended)
npx serve .
# or
python3 -m http.server 8080
```

## Deploy to GitHub Pages

### One-time setup:
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the site deploys automatically

Your site will be live at: `https://yourusername.github.io/your-repo-name`

## Updating Content
All content is in `index.html`. Each section is clearly commented:
- `<!-- HERO -->` — tagline, headline, stats
- `<!-- ABOUT -->` — bio paragraphs, card info
- `<!-- WORK -->` — project cards
- `<!-- SKILLS -->` — skill nodes array in the `<script>` section
- `<!-- JOURNEY -->` — timeline items
- `<!-- TESTIMONIALS -->` — quotes
- `<!-- CERTIFICATIONS -->` — cert cards
- `<!-- BLOG -->` — post cards
- `<!-- CONTACT -->` — links + form

## Migrating to React + Vite (future)
When ready to upgrade:
```bash
npm create vite@latest portfolio -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Each section can be extracted into its own component under `src/components/`.
