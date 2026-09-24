---
title: "Moneta: Philippine Tax-Smart Companion"
subtitle: "Tax Decision Engine"
description: "One Income Profile live-computes 9 Filipino taxpayer types, ranks peso-valued legal savings with citations, and pairs it with 21 standalone calculators."
tags: ["Next.js 16", "Drizzle ORM", "Better Auth", "Neon Postgres"]
image: "/images/projects/moneta-tax.jpeg"
impact: "Tax Savings Made Visible"
order: 6
liveUrl: "https://moneta-lovat.vercel.app/"
repoUrl: "https://github.com/jerohalili/moneta"
---

> Moneta provides general tax **information**, not personalized professional advice. Simple cases only; complex ones still belong with a CPA.

## The Challenge

Filipino freelancers, sari-sari store owners, and small operators all ask the same question: *am I paying more tax than I legally have to?* The answer hides across the NIRC, TRAIN, CREATE, BMBE, and a maze of RRs — 8% vs. graduated, OSD vs. itemized, VAT-threshold timing. Generic calculators dump numbers without telling you what to do next.

## The Solution

I built **Moneta** as a decision engine, not a calculator dump. You build one Income Profile — how you earn, what you make, what you spend — and it live-computes every tax you owe, when it's due, and a ranked peso-valued plan of legal moves that lower the bill, each cited to its regulation in plain language.

**Live:** https://moneta-lovat.vercel.app/
**Repo:** https://github.com/jerohalili/moneta

---

## Technical Highlights

### Nine Taxpayer Profiles, One Engine
* **Dashboard (`/`):** Employee, multi-employer (1700 underwithholding estimate), minimum-wage (RA 9504 regional), OFW/non-resident (foreign income recorded, never taxed), freelancer/professional, sole proprietor (8% vs graduated, OSD vs itemized), mixed (RR 8-2018 ₱250k rule), corporation/OPC (CREATE RCIT/MCIT), estate/trust. Contributions, net pay, and 13th-month auto-compute — no Calculate button.
* **Line-by-line walkthroughs:** Gross → deductions → taxable → bracket slices → total per stream.
* **Rule-based advisor:** Ranked peso-valued actions (8% election, BMBE gating, OSD vs itemized, ₱90k bonus envelope, VAT-threshold timing) with citations (NIRC, TRAIN, CREATE, RA 9178, RRs).

### 21 Standalone Calculators
Independent state (not reading the profile) for focused what-ifs: freelancer, employee, variable-income, mixed, rental, passive-income; net-pay, 13th-month, overtime, contributions; corporate, VAT/percentage, BMBE, sole-prop-vs-corp, EWT; property transfer (5 modes); penalties, closure-penalty, filing-calendar; form-finder, 1701Q worksheet.

### Offline-First + Editable Rates
* **Editable rates (`/settings`):** Every figure in the `lib/taxConfig.js` registry, with per-value revert/reset/JSON import-export. Survives rate changes without redeploy.
* **Offline-first + sync:** `localStorage` mirror, window-event pushes, merge policy (unsent local wins on sign-in, history merge-by-id). Guest → Google/email upgrade preserves rows.
* **History (`/history`):** Full-figure snapshots, filter chips, expandable rows, JSON export, filing countdown + calendar + form finder.

---

## System Architecture

| Module | Technical Functionality |
| :--- | :--- |
| **Income Profile Engine** | Single profile blob driving live recompute + advisor + walkthroughs. |
| **Advisor Planner** | `buildAdvicePlan` — ranked, peso-valued, cited legal moves. |
| **Calculator Gallery** | 21 independent calculators under `/calculators/[slug]`. |
| **Rate Registry** | `lib/taxConfig.js` + `data/taxRates2026.js` hand-verified 2026 defaults. |
| **Sync Layer** | Better Auth (Google/email/guest) + Drizzle ORM on Neon Postgres. |

### Main API Endpoints (Next.js Route Handlers)

| Method | Path | What it does |
| :--- | :--- | :--- |
| GET+POST | `/api/auth/[...all]` | Better Auth handler (Google, email, guest) |
| GET | `/api/me/data` | One-shot sync: `{profile, rates, history}` |
| PUT | `/api/me/profile` | Upsert income-profile blob (Zod, 300KB cap) |
| PUT | `/api/me/rates` | Upsert rate overrides (100KB cap) |
| POST / DELETE | `/api/me/history` | Save entry / delete one or all |
| DELETE | `/api/me/account` | Delete user (cascade wipes profile/rates/history) |

---

## Impact & Key Takeaways

Moving from **Calculator Dump → Ranked Action Plan** turns "you owe ₱X" into "do these 3 legal things to owe less, here's how much each saves."

* **Engineering Growth:** Built a pure-function tax library (`employeeTax, freelancerTax, mixedIncomeTax, corporateTax, ...`) cleanly separated from React, plus offline-first sync with lossless guest upgrades.
* **Domain Insight:** Tax software is trust software — every figure needs a citation and a walkthrough, or users won't act on it.

---

## Roadmap

* **Short-Term:** Align auth error copy, keep bracket-boundary smoke tests green, verify build + lint clean.
* **Medium-Term:** Expanded filing-calendar coverage and form-finder depth.
* **Long-Term:** CPA-review pipeline for complex cases beyond simple profiles.

---

## How to Run This Project

```bash
git clone https://github.com/jerohalili/moneta.git
cd moneta
npm install
cp .env.example .env.local
# set DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
# optional: AUTH_GOOGLE_ID + AUTH_GOOGLE_SECRET
npx drizzle-kit push
npm run dev
# open http://localhost:3000 — fastest entry: one-tap guest account
```
