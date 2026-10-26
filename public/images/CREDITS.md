# Image credits and usage

All imagery in this folder was **generated with an AI image model specifically for the AutoVault
Motors concept project** (Growthly, 2026). Nothing was scraped from dealership websites, stock
libraries, or search results, and no third-party logos or trademarks are used as brand assets.

| File | Description | Provenance |
| --- | --- | --- |
| `hero-autovault.jpg` | Dark saloon in a showroom, homepage hero | AI-generated for this project |
| `showroom-autovault.jpg` | Showroom interior used on the about page and discovery CTA | AI-generated for this project |
| `og-autovault.jpg` | 1200×630 social card composed from `hero-autovault.jpg` with local text overlay | Derived locally (ImageMagick) |
| `vehicles/*.jpg` | 27 vehicle listing photographs (see the gallery sets below) | AI-generated for this project |
| `vehicles/gallery/*.jpg` | 14 representative body-style views (rear, interior, boot) shared across listings | AI-generated for this project |

### Multi-photograph gallery sets

Several listings carry a full gallery rather than a single image:

| Listing | Files |
| --- | --- |
| `toyota-camry-2021` | `toyota-camry-2021-1/2/3.jpg` (front, back, inside) |
| `toyota-sienna-2019` | `toyota-sienna-2019-1/2/4.jpg` (front, back, inside) |
| `lexus-es-350-2020` | `lexus-es-350-2020-1/2/3.jpg` (front, back, inside) |
| `honda-crv-2019` | `honda-crv-2019-1/2/3.jpg` (front, back, inside) |
| `mercedes-benz-gle-2018` | `mercedes-benz-gle-2018-1/2/3.jpg` (front, back, inside) |
| `toyota-hilux-2021` | `toyota-hilux-2021-1/2.jpg` (front, back) |
| `toyota-rav4-2020` | `toyota-rav4-2020-1/2.jpg` (front, inside) |

### How every listing gets exactly four photographs

The brief requires **four distinct angles per listing — front, back, inside and boot — with no
repeated view**. `withGallery()` in `src/data/vehicles.ts` enforces that:

1. Each listing's own photographs are tagged with the view they show (`view: "front" | "back" |
   "inside" | "boot"`), so a rear shot is never used as an opener.
2. Any missing angle is filled from the body-style reference set in `vehicles/gallery/`, matched on
   `bodyStyle`: `sedan-*`, `suv-*`, `hatchback-*`, `pickup-*`, `minivan-*`.
3. The result is de-duplicated and sorted front → back → inside → boot.

Every one of the 50 listings therefore has a **four-photograph gallery**, and the front view is
always the listing's own cover photograph:

| Body style | Back reference | Inside reference | Boot reference |
| --- | --- | --- | --- |
| Sedan | `gallery/sedan-rear.jpg` | `gallery/sedan-interior.jpg` | `gallery/sedan-boot.jpg` |
| SUV | `gallery/suv-rear.jpg` | `gallery/suv-interior.jpg` | `gallery/suv-boot.jpg` |
| Hatchback | `gallery/hatchback-rear.jpg` | `gallery/hatchback-interior.jpg` | `gallery/hatchback-boot.jpg` |
| Pickup | `gallery/pickup-rear.jpg` | `gallery/pickup-interior.jpg` | `gallery/pickup-boot.jpg` |
| Minivan | `toyota-sienna-2019-2.jpg` | `gallery/minivan-interior.jpg` | `gallery/minivan-boot.jpg` |

Reference photographs carry alt text beginning "Representative…", because they illustrate the body
style rather than the specific unit for sale. `toyota-sienna-2019-3.jpg` (a side profile) was retired
with the four-view rule; the Sienna's interior view now uses `toyota-sienna-2019-4.jpg`.

### Colour swatches

The `availableColours` entries (2–4 per listing) are **sample data** shipped with the demo dataset;
the hex values are illustrative exterior paint approximations, not manufacturer paint codes. The
detail page labels them "Sample colour options" so no availability claim is implied.

`src/app/icon.png`, `src/app/apple-icon.png` and `src/app/favicon.ico` were drawn locally
(ImageMagick) from the AutoVault "A" mark used in the site header.

## Important caveats

- These images **illustrate the concept**; they are not photographs of the specific vehicles
  described in `src/data/vehicles.ts`, and those vehicles do not exist for sale.
- AI-generated imagery may not accurately represent a specific model year, trim or specification.
  Do not use it as evidence of a car's condition or features.
- Generated images carry no third-party licence obligations, but they are also **not** a substitute
  for the dealership's own photography.

## Before a commercial launch

1. Replace every file in `vehicles/` with licensed photographs of the dealership's real stock.
2. Replace `hero-autovault.jpg`, `showroom-autovault.jpg` and `og-autovault.jpg` with the client's own
   licensed photography.
3. Keep each image's file name and aspect ratio, or update the `images` arrays in
   `src/data/vehicles.ts` and the `Image` calls in the components.
4. Record the photographer, licence and permitted usage for each replacement in this file.
5. Keep alt text meaningful and descriptive, and remove the "illustrative studio imagery" wording
   from `src/app/inventory/[slug]/page.tsx` and `src/components/home/hero-section.tsx` once real
   photography is in place.
