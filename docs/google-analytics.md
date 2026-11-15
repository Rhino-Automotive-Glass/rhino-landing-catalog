# Google Analytics 4

Baseline from the `landing-page-ga` skill (shared code, taxonomy and privacy
defaults across landing pages). Installed 2026-11-15 on branch `feat/ga4-baseline`.

## Where things live

| What | Where |
|---|---|
| Measurement ID | `NEXT_PUBLIC_GA_ID` (Vercel env, Production + Preview). Property ID `G-P4B7CBWF83`. Never hard-code it. |
| Canonical origin | `NEXT_PUBLIC_SITE_URL=https://rhinoautoglass.mx` (matches `metadata.alternates.canonical`) |
| Debug | `NEXT_PUBLIC_GA_DEBUG=true` in Preview only (sends to DebugView with `debug_mode`; ignored on the production host) |
| Start-up | `src/instrumentation-client.ts` → `initAnalytics()` (runs before hydration; injects gtag.js from the bundle, no `<Script>` tags) |
| Page views | `src/components/analytics/PageAnalytics.tsx`, mounted once in `src/app/layout.tsx` |
| Core module | `src/lib/analytics.ts` (pure helpers + taxonomy types), `src/lib/analytics.client.ts` (gates, GA destination, `track()`) |
| Component API | `src/lib/gtm.ts`: `trackEvent()` and `trackCta()`; fans out to GA (`track()`) and PostHog |
| Tests | `src/lib/analytics.test.ts` (`npm test`, Vitest) |

`NEXT_PUBLIC_*` values are inlined at **build** time. Changing one in Vercel
needs a redeploy. Proof that the ID shipped: `grep -rl G-P4B7CBWF83 .next/static` after a build.

## Gates (GA loads only when all hold)

1. Hostname equals `NEXT_PUBLIC_SITE_URL`'s hostname (`rhinoautoglass.mx`). Previews,
   `*.vercel.app` (including the production alias) and localhost stay off, unless
   `NEXT_PUBLIC_GA_DEBUG=true`, which enables them with `debug_mode`.
   **`www.rhinoautoglass.mx` is not tracked**: it must 308-redirect to the apex in
   Vercel → Domains (as of 2026-11-15 it serves 200 without redirecting).
2. No Do Not Track / Global Privacy Control signal.
3. `NEXT_PUBLIC_GA_ID` is a valid `G-…` ID.

Privacy settings sent with every hit: `set` queued before `js`, `send_page_view: false`,
Google signals off, ad personalization off (`npa=1`), `page_location` stripped to
`utm_*` only (no `?id=`, `?tab=`, `gclid`, fragments), external referrers reduced to
their origin, `_ga` cookies ~13 months.

## Pages

| Path | `page_type` | Notes |
|---|---|---|
| `/` | `landing` | `?tab=` is stripped from `page_location` |
| `/catalog/groups/<slug>` | `catalog_group` | slug is a public product-group name |
| `/catalog/groups` | — | server redirect to `/?tab=vehicle#catalogo`; no page view of its own |
| `/agent` | `agent` | agent code is in `?id=` and is stripped. The agent's **name** is in `<title>` and so reaches GA as `page_title` (a public business-card name, not visitor data); that is currently the only per-agent signal in GA |
| `/aviso-de-privacidad` | `legal` | |
| `/admin` | `internal` | internal QR URL list; filter it out in reports |

All pages send `locale: es-MX`.

Secret-URL check (`isTrackablePath`): not set. No route carries a credential or
private value in its **path**; agent codes travel in the query string, which
`campaignUrl` removes. Revisit if a route like `/agent/<id>` or a tokenized link is added.

## Events

| Event | When | Params |
|---|---|---|
| `page_view` | each route, from `PageAnalytics` | `page_type`, `locale` |
| `cta_click` | click on a phone / WhatsApp / email / directions CTA (beacon transport) | `cta_type`, `cta_location`, `link_domain` (outbound only) |
| `form_submit` | contact form submitted, before the server answers | `form_name: contact` |
| `generate_lead` | server action returned `success: true` (email delivered to Resend) | `form_name: contact` |
| `form_error` | server action returned `success: false` | `form_name: contact`, `error_type: validation \| server` |

`cta_type`: `phone`, `whatsapp`, `email`, `directions`.
`cta_location`: `header`, `hero`, `contact`, `location`, `footer`, `mobile_bar`,
`whatsapp_float`, `agent`.

CTAs call `trackCta()` explicitly rather than using `data-cta` attributes, because
`PageAnalytics`'s `data-cta` listener sends to GA only and PostHog must keep
receiving the same events. When PostHog becomes a destination of
`analytics.client.ts`, these calls can become `data-cta` / `data-cta-location`
attributes. Do not mix both on one element (double `cta_click`).

`section_view` is wired in `PageAnalytics` but fires only for elements with
`data-analytics-section="<id>"`; none are marked yet.

### Rename on 2026-11-15 (new series in GA from the deploy date)

| Before | After |
|---|---|
| `whatsapp_click` | `cta_click` + `cta_type: whatsapp` |
| `cta_click` + `contact_method: phone/email` | `cta_click` + `cta_type: phone/email` |
| `cta_click` + `button_name: Location_Directions` | `cta_click` + `cta_type: directions` |
| `button_name` (`Footer_Phone`, `MobileBar_WhatsApp`, `Hero_CTA`, …) | `cta_location` (`footer`, `mobile_bar`, `hero`, …) |
| `button_label`, `destination` | dropped |
| `form_submit` + `button_name` | `form_submit` + `form_name: contact` |
| `form_submit_error` | `form_error` + `error_type` |
| `generate_lead` + `button_name` | `generate_lead` + `form_name: contact` (still only on server success) |

Reports comparing periods across the deploy date must join old and new names.

## PostHog (flagged, not redesigned)

PostHog receives the same event names and params through `trackEvent()`, but it
counts differently from GA and will not match:

- `capture_pageview: 'history_change'` sends `$pageview` on every history change
  with the raw URL (query strings included); GA sends one cleaned `page_view` per pathname.
- No host gate: previews, `*.vercel.app`, `www` and localhost (when the token is set) are captured.
- No DNT/GPC check. The draft privacy notice therefore says DNT/GPC applies to GA only.

Planned: make PostHog a destination in `analytics.client.ts` (see the skill's
`references/coexistence.md`) with `capture_pageview: false`, same gates, then switch CTAs to `data-cta`.

## Other analytics

`@vercel/analytics` (`<Analytics />` in the layout) is independent and cookieless; leave it.
Numbers across GA, PostHog and Vercel will differ; compare trends and ratios.

## Privacy notice

`/aviso-de-privacidad` (`src/app/aviso-de-privacidad/page.tsx`) is a **DRAFT** that
needs legal review (legal name of the *responsable* is a placeholder). It names GA, its
cookies, URL cleaning, signals/ad personalization off, DNT/GPC, PostHog and Vercel
Analytics. Update it whenever analytics settings change.

## Vercel environment

```bash
vercel env add NEXT_PUBLIC_GA_ID production      # G-P4B7CBWF83
vercel env add NEXT_PUBLIC_SITE_URL production   # https://rhinoautoglass.mx
vercel env add NEXT_PUBLIC_GA_ID preview         # G-P4B7CBWF83
vercel env add NEXT_PUBLIC_SITE_URL preview      # https://rhinoautoglass.mx
vercel env add NEXT_PUBLIC_GA_DEBUG preview      # true
```

The old `NEXT_PUBLIC_GA_DEBUG=1` convention is gone; only `true` enables debug.
Then redeploy.

## Verification

- `npm test`: 7 contract tests (host gate, DNT/GPC, `set`→`js`→`config` order, clean URLs, one view per route, beacon, secret-URL shutdown).
- Build: ID present in one `.next/static/chunks/*.js`; no gtag loader in prerendered HTML.
- After deploy: `bash ~/.claude/skills/landing-page-ga/scripts/audit.sh . --live https://rhinoautoglass.mx`,
  then DevTools → Network → `collect`: one `page_view` per route, `npa=1`, `dl` without
  `?id=`/`gclid`, no `_dbg` on production. Preview: DebugView with `NEXT_PUBLIC_GA_DEBUG=true`.
- Audit note: its `VERCEL_ENV gate` WARN matches the explanatory comment in
  `src/lib/analytics.ts`; there is no `VERCEL_ENV` gate in code.

`npm run lint` runs `next lint`, which Next.js 16 removed, and the repo has no ESLint
config, so it fails on `main` too. Changed files were linted with the
`eslint-config-next` flat presets (core-web-vitals + typescript): clean.

## GA Admin (manual)

```
GA4 manual steps for rhinoautoglass.mx (property G-P4B7CBWF83):
[ ] Enhanced measurement OFF (same release as this deploy, or every page counts twice)
[ ] Data retention 14 months
[ ] Developer traffic filter Active
[ ] Unwanted referrals: none needed (no payment/booking round-trips)
[ ] Custom dimensions (Event scope): page_type, locale, cta_type, cta_location, link_domain, form_name, error_type, section_id
[ ] Key events: generate_lead, contact_whatsapp, contact_phone
    - contact_whatsapp: derived event, event_name = cta_click AND cta_type = whatsapp
    - contact_phone:    derived event, event_name = cta_click AND cta_type = phone
[ ] Google signals stays OFF
[ ] Google tag settings: no extra GA tags in a linked container
```
