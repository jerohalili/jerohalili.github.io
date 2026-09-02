---
title: "Database Schema Design: Think Before You Migrate"
description: "Why schema-first design saves you from infinite migration loops and how to get it right from day one."
pubDate: 2026-02-05
category: "Engineering"
readTime: "7 min read"
tags: ["Database", "PostgreSQL", "Design"]
draft: false
---

# Database Schema Design: Think Before You Migrate

The fastest way to accumulate tech debt in a database project is to skip the design phase. "We'll migrate later" is a lie you tell yourself. Migrations compound. Each one adds edge cases, data transformations, and rollback complexity.

### Schema-First, Always

Before writing a single migration, I sketch the full schema on paper. Not in code — on paper. The physical act of drawing tables and relationships forces you to think about:

- What entities actually exist?
- What are the real relationships (1:1, 1:N, M:N)?
- What queries will this schema need to support?

### Normalization Is a Spectrum

Full normalization (3NF+) eliminates redundancy but creates joins everywhere. For read-heavy applications, strategic denormalization improves performance without sacrificing integrity.

```sql
-- Normalized: two joins to get user's posts with author name
SELECT p.title, u.name 
FROM posts p 
JOIN users u ON p.author_id = u.id;

-- Denormalized: zero joins, updated via trigger
SELECT title, author_name FROM posts;
```

The key is choosing **where** to denormalize based on actual query patterns, not hypothetical ones.

### Migration Discipline

Every migration should be:
1. **Reversible** — you can always roll back
2. **Non-destructive** — never drop columns in the same migration that adds replacements
3. **Tested** — run it against a production-sized dataset before deploying

### The Naming Convention

Consistent naming saves hours of cognitive overhead:

```
users           → plural nouns
user_posts      → junction tables use both singular names
created_at      → _at suffix for timestamps
is_published    → is_ prefix for booleans
```

### When to Break the Rules

If your reads are 100:1 over writes, denormalize aggressively. If you need strong consistency, normalize fully. The schema should reflect your actual access patterns, not academic purity.
