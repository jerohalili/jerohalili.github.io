---
id: "02"
title: "Academic Governance Portal"
subtitle: "Full-Stack Management"
description: "A centralized administrative dashboard for student organizations to manage digital approvals, event tracking, and member databases."
tags: ["Next.js", "PostgreSQL", "Prisma", "RBAC"]
image: "/images/projects/school-org.jpg"
impact: "Governance"
isFlagship: false
order: 2
---

### The Challenge
The student organization was bogged down by fragmented communication in messenger apps and physical paper trails for event approvals, leading to delays and lost records.

### The Solution
I built a robust **Management System** featuring Role-Based Access Control (RBAC). This allows student leaders to submit proposals digitally, which admins can then approve or comment on in real-time.

### Technical Highlights
- **Stack:** Built with Next.js 14 and Server Actions for snappy performance.
- **Database:** PostgreSQL hosted on Supabase with Prisma ORM for type-safe queries.
- **Workflow:** Implemented a custom state machine to track document status from 'Draft' to 'Approved'.