# Asset debt: Billion Ply

Everything the site still needs from the client or the platform. Each slot is
built and **hidden while empty**: no placeholder text is shown publicly. Only a
real input clears a row.

| # | Item | Where it goes | Blocks |
|---|------|---------------|--------|
| 1 | **Natural veneer catalogue on Tyashin storage.** The original PDF is 60 MB, over Cloudflare's 25 MiB per-file limit, so it cannot ship inside the Worker. Upload it to the project's Media Library and set `NEXT_PUBLIC_NATURAL_CATALOGUE_URL` (or edit `src/data/catalogues.ts`). Until then every "Download catalogue" button links to the WordPress original. | `src/data/catalogues.ts` | WordPress shutdown |
| 2 | **Official logo file** (SVG or transparent PNG). The site uses the 768x379 JPG from the current site. | `public/images/logo.*`, Header, Footer, schema | Quality only |
| 3 | **Thickness, size and grade tables per product** | `spec` rows with `value: null` in `src/data/products.ts` | Spec completeness |
| 4 | **Warranty terms** per product | `spec` "Warranty" rows | Spec completeness |
| 5 | **BIS licence (CM/L) numbers and certificate images** for IS 1328, IS 710, IS 1659 | `certifications` in `src/data/company.ts` (licenceNumber, image, validUntil) | Certifications page detail |
| 6 | **Dealer list** (name, city, state; optional address, pincode, phone) | `src/data/dealers.json` (format in `src/lib/dealer-search.ts`) | Locator results (shows "Contact us for your nearest dealer" until then) |
| 7 | **Named projects / case studies** with photos | `caseStudies` in `src/data/company.ts` | Projects page case-study grid |
| 8 | **Matecia 2025 dates and venue** | `events[0].dates/venue` in `src/data/company.ts` | Events page detail |
| 9 | **Dated legacy milestones** (beyond 1997 and 2025) | `timeline` in `src/data/company.ts` | About timeline depth |
| 10 | **Confirm E1, 4 Quad Press, Italian sanders and termite/borer protection apply to every product.** The current site states them company-wide (home FAQ); the site shows them on every product page. | `manufacturing` and product spec block | Spec accuracy |
| 11 | **Prelam, flexible and flush door standards** (if any) | `standard` in `src/data/products.ts` | Compare table ("Ask us") |

## Imagery provenance

- Product, veneer, prelam, team, plant and Matecia 2025 photos: all from the
  current billionply.com uploads (the client's own material).
- `public/images/mood/*` (living room, kitchen): lifestyle images from the
  current site's home page and blog. Used for mood only, never captioned as a
  Billion Ply project.
- The three portrait photos next to the testimonials on the old home page carry
  different names from the testimonials (stock-looking). They are **not used**.

## Platform setup (requester side)

- Tyashin project for Billion Ply, `/adopt` of `tyashin-sites/billion-ply-next`.
- Plugins: SEO Co-Pilot (phone +91 8344444635), Contact Form & Lead Capture,
  Blog, Media Library + Image Optimization, YOM analytics (custom events:
  `catalogue_download`, `whatsapp_click`, `generate_lead`, `sister_brand_click`).
- Blog: publish the two posts in `docs/blog-migration/posts.json`.
