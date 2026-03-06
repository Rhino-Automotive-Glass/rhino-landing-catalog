# Rate Limiting & Client-Side Request Deduplication

**Date:** 2026-03-05
**Project:** Rhino Landing Catalog

---

## Overview

Added API-level rate limiting and client-side request deduplication to prevent abuse of the products and brands API endpoints.

---

## Changes

### 1. Rate Limit Utility (`src/lib/rate-limit.ts`)

New in-memory rate limiter with automatic cleanup.

- **Store:** `Map<string, { count, resetAt }>` — tracks request counts per key
- **Cleanup:** Expired entries are purged every 5 minutes via `setInterval`
- **Defaults:** 30 requests per 60-second window
- **Returns:** `{ allowed, remaining, resetAt }`

### 2. Products API (`src/app/api/products/route.ts`)

- Extracts client IP from `x-forwarded-for` or `x-real-ip` headers
- Calls `rateLimit("products:<ip>", { limit: 30, windowMs: 60_000 })`
- Returns `429 Too Many Requests` with `Retry-After` header when limit is exceeded
- Adds `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers to all responses

### 3. Brands API (`src/app/api/brands/route.ts`)

- Same rate limiting logic as products, keyed as `"brands:<ip>"`
- Independent limit from products (each endpoint gets its own 30 req/min budget)

### 4. Product Catalog Client (`src/components/ProductCatalog.tsx`)

- Replaced `useCallback` + separate `useEffect` with a single `useEffect` using `AbortController`
- When search term, brand filter, or page changes, any in-flight request is automatically cancelled before a new one is sent
- Aborted requests are silently ignored (no error state set)
- Works in combination with the existing 350ms debounce on search input

---

## How It Works

### API Rate Limiting Flow

```
Client Request
  -> Extract IP from headers
  -> rateLimit("endpoint:ip")
  -> If over limit: return 429 + Retry-After header
  -> If allowed: process request, return data + rate limit headers
```

### Client-Side Deduplication Flow

```
User types in search box
  -> 350ms debounce (existing)
  -> useEffect fires, creates new AbortController
  -> Previous in-flight fetch is aborted via cleanup function
  -> New fetch starts with current AbortController's signal
  -> Only the latest request's response is used
```

---

## Configuration

| Parameter   | Default | Description                     |
|-------------|---------|---------------------------------|
| `limit`     | 30      | Max requests per window         |
| `windowMs`  | 60,000  | Window duration in milliseconds |

Each API endpoint has its own rate limit counter per IP. A single client can make up to 30 product requests and 30 brand requests per minute independently.

---

## Response Headers

| Header                  | Description                                  |
|-------------------------|----------------------------------------------|
| `X-RateLimit-Remaining` | Number of requests remaining in the window   |
| `X-RateLimit-Reset`     | Timestamp (ms) when the window resets         |
| `Retry-After`           | Seconds until retry is allowed (429 only)     |

---

## Limitations

- **In-memory store:** Rate limit state is lost on server restart and is not shared across multiple server instances. For multi-instance deployments, consider Redis or a similar shared store.
- **IP-based:** Clients behind the same NAT/proxy share a rate limit budget.
