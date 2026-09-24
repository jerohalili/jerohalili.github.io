---
title: "MonAmi: Interactive Networking Constellation"
subtitle: "Graph-Based Relationship OS"
description: "A force-directed network graph that turns contacts into contextual nodes and edges — with GitHub sync and scored people/repo recommendations."
tags: ["Next.js 15", "TypeScript", "Prisma", "d3-force"]
image: "/images/projects/monami-network.jpeg"
impact: "Intentional Networking"
order: 7
liveUrl: "https://monami-one.vercel.app/"
repoUrl: "https://github.com/jerohalili/monami"
---

## The Challenge

Professional networks live as flat lists — phone contacts, LinkedIn connections, GitHub followers — with zero memory of *how* you met, *what* you share, or *who* you should talk to next. Lists don't show clusters, don't surface warm introductions, and don't grow deliberately.

## The Solution

I built **MonAmi** on a simple thesis: *your network is a graph, not a list.* Each person is a node (avatar, headline, skills, tags, notes) and each edge carries real context (how you met, shared communities, strength, date). GitHub import plus people- and repo-recommendations adapt as the network evolves.

**Live:** https://monami-one.vercel.app/
**Repo:** https://github.com/jerohalili/monami

---

## Technical Highlights

### Interactive Force-Directed Graph
* **Canvas constellation:** `react-force-graph-2d` + `d3-force-3d`, centered on your glowing `You` node. Nodes color-coded by name with avatar/DiceBear fallback; edges colored by origin (in-person, GitHub, school, work, introduction, online, other) and styled by strength (dashed weak / solid / double strong).
* **Full interaction:** Live search filtering, drag-to-place, zoom/fit, click node/edge for a detail sidebar (desktop) / bottom-sheet (mobile) with inline edit and a custom confirm dialog for deletes.
* **Rich context model:** Person fields (nickname, headline, company, location, email, skills/interests/tags, links, notes, githubLogin) + edge fields (origin, context, communities, projects, strength 1–3, met date).

### GitHub Integration + Discover
* **Profile + connection sync:** Overwrite your `You` node from your GitHub profile; import followers/following (all / following-only / mutual-only) with cross-edges between imported people who follow each other; second-degree indirect sweep; your repos grid.
* **Discover tab:** People recommendations scored by shared contributors, mutuals, skills overlap, and company/location — with reasons + expandable breakdown + one-tap Add (prefilled form). Repo recommendations (`connections×2 + language×3`), Starred, and Yours tabs.

### Auth + Resilience
* **NextAuth v5:** GitHub OAuth + email/password (bcrypt) + one-click guest demo. `requireUserId()` on every API route; middleware redirects pages while API routes return 401s.
* **Account management (`/settings`):** View info, change email/password, link/unlink GitHub, cascade delete. Star-field dark theme + responsive throughout.

---

## System Architecture

| Module | Technical Functionality |
| :--- | :--- |
| **Graph View** | Force-directed canvas with search, legend, and zoom controls. |
| **People & Edges API** | Full CRUD, owner-scoped, rejects self-links and duplicate pairs. |
| **GitHub Sync** | Profile, connections, indirect discovery, repo surfacing. |
| **Recommender** | Scored people + repos with explainable reasons. |
| **Identity Layer** | NextAuth sessions over Prisma 6 + Neon Postgres (`User, Person, Edge`). |

### Main API Endpoints

| Method | Path | What it does |
| :--- | :--- | :--- |
| GET | `/api/graph` | Whole constellation `{people, edges}`; auto-creates `You` |
| GET / POST | `/api/people` | List / create person |
| GET / PATCH / DELETE | `/api/people/[id]` | Fetch / edit / delete person |
| GET / POST | `/api/edges` | List / create tie (409 on duplicate pair) |
| GET | `/api/recommendations` | People recommendations (top 30, enriched top 10) |
| POST | `/api/github/sync-profile` | Overwrite `You` from GitHub profile |
| POST | `/api/github/sync-connections` | Import followers/following + cross-edges |
| POST | `/api/github/sync-indirect` | Second-degree sweep |

---

## Impact & Key Takeaways

Moving from **Contact List → Living Constellation** makes relationship context first-class data and turns "who do I know?" into "who should I grow with next?"

* **Engineering Growth:** Tuned force-directed layouts for readability at 20–100 nodes, built an explainable recommender (scores + reasons, not black-box), and hardened multi-provider auth with guest sandboxing.
* **Product Insight:** Edges matter more than nodes — origin, strength, and shared context are what make a network actionable.

---

## Roadmap

* **Short-Term:** Sanitize GitHub error paths, unify password policy to 8+, final responsive pass.
* **Medium-Term:** Smarter clustering views and introduction-path finding ("how am I connected to X?").
* **Long-Term:** Calendar/inbox signals for relationship decay and re-engagement nudges.

---

## How to Run This Project

```bash
git clone https://github.com/jerohalili/monami.git
cd monami
npm install
cp .env.example .env
# set DATABASE_URL, AUTH_SECRET (npx auth secret)
# optional: AUTH_GITHUB_ID + AUTH_GITHUB_SECRET
npm run setup
# = prisma generate && prisma db push
npm run dev
# open http://localhost:3000 — sign in via GitHub, email, or guest
```
