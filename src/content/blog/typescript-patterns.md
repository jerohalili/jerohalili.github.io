---
title: "TypeScript Patterns I Use Every Day"
description: "Discriminated unions, branded types, and other patterns that make TypeScript more than just type annotations."
pubDate: 2026-02-20
category: "Engineering"
readTime: "5 min read"
tags: ["TypeScript", "Patterns", "DX"]
draft: false
---

Most TypeScript code I review uses TypeScript as "JavaScript with annotations." That misses the point. TypeScript's real power is making invalid states unrepresentable.

### Discriminated Unions

Instead of optional properties, use a `type` field to discriminate between states:

```typescript
type Request<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

Now your component can exhaustive-match on `status` and the compiler ensures you handle every case. No more checking `if (data && !error)`.

### Branded Types

Prevent mixing up primitives that have the same type but different meaning:

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function getUser(id: UserId) { /* ... */ }

const userId = 'abc' as UserId;
const postId = 'xyz' as PostId;

getUser(userId);  // ✓
getUser(postId);  // ✗ Compile error
```

### The `satisfies` Operator

TypeScript 4.9 added `satisfies` — it validates the type without widening it:

```typescript
const config = {
  port: 3000,
  host: 'localhost',
} satisfies Record<string, string | number>;

// config.port is `number`, not `string | number`
```

### Exhaustive Switch with Never

When you add a new variant to a union, TypeScript can force you to handle it:

```typescript
function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`);
}

function handle(status: RequestStatus) {
  switch (status) {
    case 'idle': /* ... */ break;
    case 'loading': /* ... */ break;
    // Forgetting 'success' or 'error' → compile error
    default: return assertNever(status);
  }
}
```

### The Pattern

The common thread: use the type system to enforce invariants at compile time, not runtime. If your code compiles, certain classes of bugs are structurally impossible.
