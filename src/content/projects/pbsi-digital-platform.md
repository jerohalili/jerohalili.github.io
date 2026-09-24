---
title: "PBSI: Digital Transformation Platform"
subtitle: "Institutional Infrastructure"
description: "The official digital platform for Presbyterian Bible Seminary Inc. — replacing paper-based intake with a fast, static-first admissions and program hub."
tags: ["Astro 6", "React 19", "Tailwind v4", "Content Collections"]
image: "/images/projects/pbsi-platform.png"
impact: "Institutional Efficiency"
order: 2
liveUrl: "https://pbsi1992.github.io"
repoUrl: "https://github.com/pbsi1992/pbsi1992.github.io"
---

**Live:** https://pbsi1992.github.io
**Repo:** https://github.com/pbsi1992/pbsi1992.github.io

## The Challenge

Presbyterian Bible Seminary Inc. ran on paper: student records were manual, program information was fragmented and hard to maintain, and inquiries moved slowly through disconnected channels. Prospective students — often on low-bandwidth mobile connections — had no central, reliable source of truth.

## The Solution

I architected the official PBSI digital platform as a static-first ecosystem: automated admissions intake, a JSON-driven academic hub for Master's / Bachelor's / Diploma tracks, a centralized inquiry router to the Registrar, and a persistent light/dark theme — all deployable free on GitHub Pages with GitHub Actions.

---

## Technical Highlights

### Performance-First Static Architecture
* **Astro 6 + Content Collections:** Island architecture with near-zero client JS, strong SEO, and free GitHub Pages hosting.
* **JSON-driven programs:** Typed collections render every academic track without database overhead.

### Interactive Islands + Theme Engine
* **React 19 islands:** Scoped state machines for the multi-step admissions form and intake validation.
* **Blocking-script theme toggle:** Zero-flash light/dark hydration persisted in `localStorage`.

### CI/CD
* GitHub Actions validates types, builds Astro, and deploys to Pages on every push.

---

## System Architecture

| Module | Technical Functionality |
| :--- | :--- |
| **Admissions Engine** | Multi-step registration state and requirement submission tracking. |
| **Academic Hub** | Program directory rendered from JSON collections. |
| **Inquiry Hub** | Centralized router connecting prospects with the Registrar. |
| **Theme Engine** | Zero-flash preference hydration across sessions. |

---

## Impact & Key Takeaways

Moving from **Manual Paper Trails → Digital Infrastructure** cut administrative friction and gave the seminary a mobile-friendly front door. Biggest lesson: balance technical ambition with adoption cost when stakeholders are non-technical.

---

## Roadmap

* **Short-Term:** Schema-based form validation and global static search.
* **Medium-Term:** Supabase-backed admin dashboard and automated notifications.
* **Long-Term:** Full enrollment pipeline with LMS and payment integration.

---

## How to Run This Project

```bash
git clone https://github.com/pbsi1992/pbsi1992.github.io.git
cd pbsi1992.github.io
npm install
npm run dev
npm run build
```
