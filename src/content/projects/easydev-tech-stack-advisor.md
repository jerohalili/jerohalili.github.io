---
title: "EasyDev: Tech Stack Decision Engine"
subtitle: "Full-Stack Recommendation System"
description: "A branching questionnaire that returns scored tech-stack picks across Language, Frontend, Backend, Database, and Infrastructure — with plain-language reasoning and trade-offs."
tags: ["React 19", "Express 5", "PostgreSQL", "Vercel"]
image: "/images/projects/easydev-decision-engine.jpeg"
impact: "Decision Clarity"
order: 5
liveUrl: "https://easydev-nine.vercel.app/"
repoUrl: "https://github.com/jerohalili/easydev"
---

## The Challenge

Junior developers and recent grads face a paralyzing question at the start of every project: *what should I build this with?* Blog posts go stale, boilerplates hide trade-offs, and hardcoded "use X for Y" advice ignores team size, scale, and constraints.

## The Solution

I built **EasyDev** as a decision engine, not a lookup table. You answer a short branching questionnaire about your project, team, scale, and constraints, and it returns a scored recommendation across five categories — Language, Frontend, Backend, Database, Infrastructure — each with plain-language reasoning and pros/cons. You can also build your own stack manually from the same catalog and compare it against the recommendation.

**Live:** https://easydev-nine.vercel.app/
**Repo:** https://github.com/jerohalili/easydev

---

## Technical Highlights

### Weighted Scoring, Not If/Else
* **Branching question tree:** Questions flow via `next_question_id` (e.g. "API / Microservice" skips frontend-platform). Multi-select where realistic, with inline contradiction warnings (e.g. realtime + no-backend-logic).
* **Weighted-sum scoring:** Each category scores picks with a `PRIMARY_BOOST x5`, `SAFE_DEFAULTS` on all-zero layers, and `needs_confirmation` flags on thin margins. Every pick shows reasoning text + trade-offs.
* **Seeded catalog:** 8 tables (`projects, questions, options, tech_items, weights, answers, results, user_stacks`), ~60 options, a weight matrix, and ~30 tech items.

### Review → Results → Compare → History
* **Review screen:** Grouped answer summary; click any row to jump back and edit (forward branch is discarded and rebuilt).
* **Compare view:** Assemble your own stack from the same catalog and see match/override per category.
* **History:** Every project and every re-score is preserved (append, not overwrite). Reopen, delete, restart.

### Prod-Parity Deployment
* **Client:** React 19 + Vite + Tailwind v4 with dark/light theme (`data-theme` + `localStorage`) and a resilient fetch helper.
* **API:** Express 5 running as a single Vercel serverless function (`api/index.js`), PostgreSQL on Neon via `pg` (no ORM).
* **`vercel.json`:** Builds `client/dist`, rewrites `/api/*` to the function, everything else to `index.html`.

---

## System Architecture

| Module | Technical Functionality |
| :--- | :--- |
| **Quiz Engine** | Serves branching questions with `remaining_steps` progress tracking. |
| **Scoring Engine** | Weighted-sum per category with boost, safe defaults, and thin-margin flags. |
| **Comparison View** | Manual stack builder backed by the same tech catalog. |
| **History Store** | Append-only projects + results with full reopen/delete/restart. |
| **Theme Engine** | Dark/light toggle persisted across sessions. |

### Main API Endpoints

| Method | Path | What it does |
| :--- | :--- | :--- |
| GET | `/api/health` | DB healthcheck (`SELECT NOW()`) |
| GET / POST | `/api/projects` | List projects / create `{title, description}` |
| GET / DELETE | `/api/projects/:id` | Single project + results / delete (cascades) |
| GET | `/api/questions/:id` | Quiz step: question + options + `remaining_steps` |
| POST | `/api/projects/:id/answers` | Save answers, returns `{next_question_id, warnings}` |
| POST | `/api/projects/:id/score` | Run weighted scoring, append result row |
| GET / POST | `/api/projects/:id/user-stack` | Manual picks catalog / upsert pick |

---

## Impact & Key Takeaways

Moving from **Opinion Threads → Scored Decisions** gives juniors a defensible starting stack plus the reasoning to change it later.

* **Engineering Growth:** Designed a data-driven scoring model instead of nested conditionals, and learned to keep one Express app working both locally and as a serverless function.
* **Product Insight:** Explanations matter more than answers — reasoning text and trade-off analysis are what make a recommendation trustworthy.

---

## Roadmap

* **Short-Term:** Stricter server validation, restricted CORS, pagination on history.
* **Medium-Term:** Auth + per-user history with ownership scoping.
* **Long-Term:** Team workspaces and stack drift tracking as projects grow.

---

## How to Run This Project

**Prod parity (client + `/api` on one port, same as production):**
```bash
git clone https://github.com/jerohalili/easydev.git
cd easydev
npm run install:all
cp .env.example .env
# set DATABASE_URL (Neon pooled string, sslmode=require)
psql "$DATABASE_URL" -f db/schema.sql
vercel dev
```

**Split local dev (no Vercel account needed):**
```bash
npm run dev
# API on http://localhost:3001, client on http://localhost:5173
```
