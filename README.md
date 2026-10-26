# AutoVault Motors

A production-quality automotive dealership website concept built by **Growthly** as a portfolio
demonstration for Nigerian car dealerships.

AutoVault Motors is **not a real dealership**. Every vehicle, price and specification in the
inventory is fictional sample data created to demonstrate the experience: a searchable inventory,
side-by-side comparison, detailed vehicle pages and vehicle-specific WhatsApp enquiries.

The demonstration catalogue holds **50 listings — ten per brand** across Toyota, Lexus, Honda,
Mercedes-Benz and Hyundai — spanning saloons, SUVs, pickups, hatchbacks and minivans from 2014 to
2022, so every filter combination has enough results to feel like a real forecourt.

---

## Contents

- [What the site does](#what-the-site-does)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Replacing the demo inventory](#replacing-the-demo-inventory)
- [What is configured by default](#what-is-configured-by-default)
- [Deployment](#deployment)
- [Testing](#testing)
- [Implementation decisions](#implementation-decisions)
- [Known limitations](#known-limitations)
- [Image credits](#image-credits)

---

## What the site does

| Route | Purpose |
| --- | --- |
| `/` | Hero, quick search, four featured vehicles, benefits, discovery CTA, FAQ |
| `/inventory` | Brand index, search, nine combined filters, five sort orders, shareable URLs, compare tray |
| `/inventory/[slug]` | Vehicle detail: four-view gallery (front/back/inside/boot), specs, colour options, features, availability state, WhatsApp enquiry |
| `/compare` | Up to three vehicles compared side by side (persisted in `localStorage`) |
| `/about` | The concept, the customer experience, how enquiries work |
| `/contact` | WhatsApp/email options plus a validation-only enquiry form |
| `/sitemap.xml`, `/robots.txt` | Generated with Next.js metadata routes |
| any other URL | Branded 404 with a genuine `404` status |

Key behaviour worth knowing:

- **Brand depth.** Ten listings per brand, with at least one featured per brand, plus a brand index
  above the results (`?make=Hyundai`) and brand links in the footer that carry live counts.

- **Server-rendered filtering.** `/inventory?make=Toyota&maxPrice=15000000` is parsed and applied on
  the server, so a shared or refreshed link shows the right cars in the first response. Client-side
  interactions then update the URL with `history.replaceState` (no server round trip per keystroke).
- **Honest contact handling.** WhatsApp actions only exist when a valid number is configured. With no
  number, the interface says so and offers the contact page instead of a dead button.
- **Honest form.** The contact form validates and then hands the message to the visitor's email app
  or WhatsApp. It never claims an enquiry was received.
- **Real 404s.** `src/proxy.ts` checks vehicle slugs against the dataset so an unknown slug returns
  HTTP 404 instead of a streamed "not found" page with a 200 status.
- **No fabricated trust signals.** No testimonials, awards, years in business, registration numbers,
  inspections, guarantees, phone numbers or addresses.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Cache Components, Partial Prefetching) |
| UI | React 19, TypeScript (strict), Tailwind CSS 4 |
| Icons | `lucide-react` |
| Fonts | Geist Sans / Geist Mono, self-hosted via the `geist` package |
| Quality | ESLint (`eslint-config-next`), `tsc --noEmit` |
| Tests | Vitest (unit + jsdom interaction tests with Testing Library) |
| Package manager | npm |

No database, authentication, payment provider, analytics or paid API is required.

## Getting started

Requirements: **Node.js 20.9+** (Node 22 LTS recommended) and npm 10+. A `.nvmrc` pins 22 so both
Vercel and Netlify pick the same runtime automatically.

```bash
# 1. Clone
git clone <your-repository-url>
cd AutoVault-Motors

# 2. Install dependencies
npm install

# 3. Optional configuration
cp .env.example .env.local   # then edit values you actually have

# 4. Develop
npm run dev                  # http://localhost:3000

# 5. Verify
npm run lint
npm run typecheck
npm test

# 6. Production build
npm run build
npm start                    # http://localhost:3000
```

## Environment variables

All variables are optional and public (`NEXT_PUBLIC_*`). They are read in `src/lib/config.ts` only.
Nothing secret belongs in this project.

**The concept's own public contact details ship in the committed `.env.production`**, so importing
the repository into Vercel or Netlify produces a fully working site with no dashboard configuration.
Precedence is the Next.js standard: real host environment variables override `.env.production`, and
`.env.local` (git-ignored) overrides it for local development. A real dealership should set its own
values in the host dashboard instead of editing the committed file.

| Variable | Required | Effect when empty |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Falls back to `2348129391626` from `.env.production`. Set it to an invalid value to disable every WhatsApp action, in which case the UI explains that no number is configured. Format: digits only, international. `+234 801 234 5678` and `002348012345678` are normalised too. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Falls back to `growthly.business.scale@gmail.com` from `.env.production`. If unset or invalid, email is hidden and the form falls back to WhatsApp, or explains that no channel is configured. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical tags and sitemap entries are omitted, so no unverified domain is ever published. `og:url`/`og:image` fall back to the current deployment host (Vercel or Netlify expose it automatically), so preview links still unfurl correctly. Set to your final origin (no trailing slash) before launch to add canonicals and the sitemap. |

`.env.local` is git-ignored; `.env.example` is committed.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the whole repo |
| `npm run typecheck` | Generates route types (`next typegen`) then runs `tsc --noEmit` |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest in watch mode |
| `npm run check` | Lint + typecheck + tests |

## Project structure

```
src/
  app/
    layout.tsx                 Root layout, fonts, metadata defaults, header/footer
    page.tsx                   Homepage
    globals.css                Tailwind import + design tokens (@theme) + base/component layers
    icon.png, apple-icon.png, favicon.ico
    inventory/
      page.tsx                 Inventory (static shell + Suspense-streamed results)
      [slug]/page.tsx          Vehicle detail (generateStaticParams + generateMetadata)
    about/page.tsx
    contact/page.tsx
    compare/page.tsx
    not-found.tsx              404 experience
    error.tsx                  Route error boundary
    sitemap.ts, robots.ts      Metadata routes
  components/
    layout/                    header, desktop-nav, mobile-navigation, footer, logo, page-header, whatsapp-cta
    home/                      hero-section, vehicle-search, featured-vehicles, why-autovault, discovery-cta, faq-section
    vehicles/                  vehicle-card, vehicle-photo, vehicle-gallery, vehicle-specifications,
                               inventory-browser, inventory-filters, inventory-skeleton,
                               comparison-provider, compare-toggle, compare-tray, comparison-view,
                               whatsapp-enquiry
    contact/                   enquiry-form
    ui/                        button, input/select/textarea, empty-state, availability-badge,
                               section-heading, breadcrumbs
  data/
    vehicles.ts                50 demonstration listings (10 per brand) + derived helpers
  lib/
    config.ts                  Brand, contact + site configuration (env reads live here)
    whatsapp.ts                Link + message builders and number validation
    vehicle-filters.ts         Query parsing, filtering, sorting, URL serialisation
    comparison.ts              Comparison selection rules
    formatters.ts              Naira, mileage, name and text formatting
    seo.ts                     Shared page metadata builder
    cn.ts                      Class-name joiner
  types/
    vehicle.ts                 Vehicle, Transmission, Condition, Availability, SortKey
  proxy.ts                     Slug validation → real 404 status
public/
  images/
    hero-autovault.jpg
    showroom-autovault.jpg
    og-autovault.jpg
    vehicles/*.jpg             Per-listing photography
    vehicles/gallery/*.jpg     Representative body-style views (rear, interior, boot) that fill
                               any angle a listing cannot supply itself
    CREDITS.md                 Asset provenance and licensing notes
```

### Design tokens

Colours, radii, shadows and type scales live in `src/app/globals.css` under `@theme` (Tailwind 4).
Use the semantic names (`bg-ink-950`, `text-moss-700`, `border-bone-300`, …) rather than raw hex
values so the palette can be changed in one place.

## Replacing the demo inventory

1. Open `src/data/vehicles.ts` and replace the array. The `Vehicle` type in `src/types/vehicle.ts`
   is the contract — keep `slug` unique and URL-safe (`toyota-camry-2021`).
2. Add photography under `public/images/vehicles/` using the paths referenced in each `images` entry,
   and tag each one with the angle it shows (`view: "front" | "back" | "inside" | "boot"`). Each image
   needs meaningful `alt` text. `withGallery()` fills any missing angle from the body-style reference
   set, so a listing with a single front photograph still shows four distinct views — replace the
   reference set with real stock photography before launch.
   `npm test` fails if a `src` in the dataset has no matching file under `public/`, so missing
   photography is caught before deployment.
3. Delete or hard-code the demonstration notices when real stock replaces sample data:
   - `DEMO_NOTICE` / `DEMO_NOTICE_SHORT` in `src/lib/config.ts`
   - the "Demonstration project" blocks in `src/components/layout/footer.tsx`,
     `src/app/about/page.tsx` and the inventory header
   - set `IS_CONCEPT_PROJECT` to `false` and update copy that refers to a concept.
4. Set `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL`.
5. Update the metadata copy in each `page.tsx` (it currently states that listings are demonstrations).

All filters, sorts, comparison and metadata derive from the dataset, so no component changes are
needed for a new list of cars.

## What is configured by default

Out of the box, with no environment variables:

- WhatsApp number: **not configured** → WhatsApp buttons are replaced with contact-page links, and
  vehicle pages show the composed message in a preview panel.
- Email: **not configured** → no email address is displayed anywhere.
- Site URL: **not configured** → no canonical tags and an empty sitemap (no invented domain).

This is deliberate: a portfolio demo must never route enquiries to a phone number or domain that
does not belong to the client.

## Deployment

The project is a standard Next.js App Router app with no platform-specific features, so it deploys to
either host. Both need the environment variables you configured locally.

### Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset is detected as **Next.js**. Leave build `npm run build`, output default.
4. Deploy. Contact details come from the committed `.env.production`, so this step needs nothing;
   add environment variables only to override them (e.g. a real dealership's own number).
5. Copy the production URL Vercel assigns. Add `NEXT_PUBLIC_SITE_URL` with that origin and redeploy
   so canonical links and the sitemap are emitted; do the same again if you later add a custom
   domain.

No `vercel.json` is required.

### Netlify

1. Push the repository to GitHub.
2. In Netlify: **Add new site → Import an existing project**.
3. Build command `npm run build`. The official Next.js runtime
   (`@netlify/plugin-nextjs`, v5) is installed automatically for Next.js sites; keep it enabled.
4. Deploy. Contact details come from the committed `.env.production`; host environment variables
   are only needed to override them.
5. Set `NEXT_PUBLIC_SITE_URL` to the live origin and redeploy to enable canonicals and the sitemap.

Notes for Netlify: use Node 20+ (set `NODE_VERSION=22` in the environment if the default is older). No
`netlify.toml` is required for this app; if you add one, keep the plugin's default publish handling.

## Testing

```bash
npm test
```

The suite covers:

- Query parsing (valid, invalid, repeated, out-of-range and reversed values)
- Filter combinations (including fuel type), inclusive price/year boundaries and empty results
- Brand depth: ten listings per brand and a featured vehicle for every brand
- All five sort orders and immutability of the source list
- Search across make/model/description with multi-token matching
- Naira/mileage formatting (explicit `en-US` grouping so SSR and client agree)
- WhatsApp number normalisation, missing-configuration behaviour, message encoding by availability
- Comparison rules (max three, de-duplication, corrupt `localStorage`)
- Metadata base resolution: configured URL wins, deployment host is the fallback, empty platform
  variables are skipped, malformed URLs never throw
- Gallery hydration: real server output is hydrated in jsdom and must produce no recovery warning
- Reference alt text reads correctly for screen readers (no "a SUV", vehicle named, not claimed
  as the actual unit)
- Dataset integrity (unique ids/slugs, complete specs, local images with alt text)
- Four-view gallery contract (exactly front/back/inside/boot, no repeated source, listing's own photo
  as the front view, body-style reference matching) and the colour-option contract
- Interaction tests in jsdom: live search, combined filters, sorting, URL sync, comparison tray and
  limit, gallery switching/wrapping/single-image layout and view labels, contact form validation and
  status copy

Run `npm run check` to run lint, typecheck and tests together.

### Audit performed before hand-off

| Check | Method | Result |
| --- | --- | --- |
| Accessibility rules | `axe-core` 4.14 against the server-rendered HTML of 9 route states (WCAG 2.0/2.1/2.2 A + AA + best practice) | **0 violations**; one heading-order defect found and fixed |
| Colour contrast | All text and control-border pairs computed against WCAG 2.2 AA | every text pair ≥ 4.5:1, control borders ≥ 4:1 |
| Touch targets | Every interactive element measured against the 24px WCAG 2.5.8 minimum | 0 below 24px; compare toggle and brand pills enlarged to 40px on small screens |
| Horizontal overflow | Static scan for fixed widths, `100vw`, `w-screen` and unclipped absolute elements | none outside intentionally scrollable regions |
| First-load weight | Measured from the production build | 18.7 KB HTML + 186.9 KB JS + 9.2 KB CSS (gzip) |
| Caching & headers | `curl -I` on the HTML, hashed JS and optimised images | `immutable` for hashed assets; `nosniff` + `Referrer-Policy` set; no `X-Powered-By` |

Layout at specific viewport widths, Lighthouse scores and cross-browser behaviour could **not** be
measured here: no browser binary is installable in this environment (the Chromium download hosts are
blocked). Those checks must be repeated in a real browser before launch.

## Implementation decisions

- **Next.js 16 conventions.** The project enables `cacheComponents` and `partialPrefetching` (the
  current defaults for new apps). The inventory page is a static shell with the results streaming
  inside `<Suspense>`; `/inventory/[slug]` opts into a blocking route (`instant = false`) so unknown
  slugs can return a true 404, with `src/proxy.ts` providing the slug check before rendering.
- **No `loading.tsx`.** Only real asynchronous work gets a loading treatment: the inventory's
  request-time read uses a layout-matched skeleton. Nothing is artificially delayed.
- **Data stays out of components.** All listings live in `src/data/vehicles.ts`; filtering/sorting are
  pure functions in `src/lib/vehicle-filters.ts`, reused by the server page, the client browser and
  the unit tests.
- **URL is the source of truth for filters.** Server parsing handles direct loads; client updates use
  `history.replaceState` (documented in Next's navigation guide) so typing does not re-render the
  route on the server, and `initialQuery` comparison keeps footer links like
  `/inventory?bodyStyle=SUV` working.
- **Native platform features over libraries.** The FAQ uses `<details>`; the mobile menu uses
  `<dialog>` (focus trapping, Escape handling and inertness built in); the homepage quick search is a
  plain GET form so it works without JavaScript. No carousel, animation or UI framework was added.
- **Comparison state via `useSyncExternalStore`.** `localStorage` is treated as an external store, so
  the server HTML and hydrated client agree without effect-driven state updates. Storage failures
  (private mode, blocked cookies) degrade to in-memory selections.
- **Accessibility.** Semantic landmarks and heading order, one `<h1>` per page, labelled controls,
  `aria-pressed`/`aria-expanded`/`aria-current` where relevant, `aria-invalid` plus
  `aria-describedby` errors with focus moved to the first invalid field, a skip link, 44px-ish touch
  targets, visible focus rings, an `aria-live` region for filter/comparison announcements, and
  `prefers-reduced-motion` support.
- **No structured data for vehicles.** Listing fictional cars as `Product`/`Offer` schema would
  publish misleading commerce data, so only standard metadata is emitted.
- **Colour contrast.** Every text pair was measured against WCAG 2.2 AA rather than eyeballed: body
  copy is `ink-900`/`ink-600`, small print and placeholders are `ink-500` (6.0–6.5:1 on light
  surfaces), and muted text on dark panels is `ink-300`/`ink-400` (4.6:1 and above). Form-control
  borders use `ink-400` (4.1:1 on white) instead of the decorative `bone-300`, so field boundaries
  meet the 3:1 non-text minimum in WCAG 1.4.11.

## Known limitations

- **Demonstration data.** Listings, prices, availability and photography are illustrative; images
  may not match the exact model year or trim described. The site
  says this in the footer, on the inventory page and on each vehicle page.
- **Some listings share a photograph.** There are 41 photographic assets (27 listing photographs plus
  14 representative body-style views) serving 50 listings. Every listing has **exactly four
  photographs — front, back, inside and boot** — never a repeated angle: its own photograph is used
  for whichever views it can supply, and missing views come from a body-style reference set whose alt
  text says "Representative…". Colour swatches are sample data as well. Every referenced file is
  asserted to exist by the test suite, so a missing asset fails CI instead of reaching a visitor.
- **No live contact backend.** There is no API route, database or email service. The contact form
  deliberately delegates to the visitor's mail client or WhatsApp.
- **Config-dependent links.** Until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, WhatsApp actions are
  replaced with contact-page links; that is the intended, honest fallback.
- **Sitemap is empty without a site URL.** Intentional — it avoids advertising a domain the project
  does not own.
- **Browser-level QA was not performed in this environment.** No browser binary was available (and
  browser downloads were blocked), so responsive layouts, Lighthouse scores and cross-browser
  behaviour were not measured here. Client behaviour is covered by jsdom interaction tests and the
  server output was verified with HTTP requests (see the project handover notes). Before presenting
  to a client, run `npm run build && npm start` and check the pages at 320/375/430/768/1024/1440px.

## Image credits

See [`public/images/CREDITS.md`](public/images/CREDITS.md). The vehicle and showroom photographs were
AI-generated for this concept project and are not photographs of specific vehicles for sale. The
brand mark, favicons and the Open Graph card were produced from those assets locally.

Replace them with licensed photography of the dealership's real stock before any commercial launch.

---

Built by Growthly · Concept demonstration, not a trading business.
