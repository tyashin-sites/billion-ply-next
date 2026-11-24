# Asset debt: Billionply

Everything the site still needs from the client or the platform. Each slot is
built and **hidden while empty**: no placeholder text is shown publicly. Only a
real input clears a row.

| # | Item | Where it goes | Blocks |
|---|------|---------------|--------|
| 1 | ~~Natural veneer catalogue on Tyashin storage~~ **Done 2026-11-24**: in R2 bucket `billionply-site-assets`, served at `/downloads/billionply-natural-veneer-catalogue.pdf`. | `src/data/catalogues.ts` | — |
| 2 | **Official logo file** (SVG or transparent PNG). The site uses the 768x379 JPG from the current site (the header uses a whitespace-trimmed crop, `logo-header.jpg`). | `public/images/logo.*`, Header, Footer, schema | Quality only |
| 3 | **Thickness, size and grade tables per product** | `spec` rows with `value: null` in `src/data/products.ts` | Spec completeness |
| 4 | **Warranty terms** per product | `spec` "Warranty" rows | Spec completeness |
| 5 | **BIS licence (CM/L) numbers and certificate images** for IS 1328, IS 710, IS 1659 | `certifications` in `src/data/company.ts` (licenceNumber, image, validUntil) | Certifications page detail |
| 6 | **Dealer list** (name, city, state; optional address, pincode, phone) | `src/data/dealers.json` (format in `src/lib/dealer-search.ts`) | Locator results (shows "Contact us for your nearest dealer" until then) |
| 7 | **Named projects / case studies** with photos | `caseStudies` in `src/data/company.ts` | Projects page case-study grid |
| 8 | **Dated legacy milestones** (beyond 1997; the timeline ends on "Billionply today") | `timeline` in `src/data/company.ts` | About timeline depth |
| 9 | **Confirm E1, 4 Quad Press, Italian sanders and termite/borer protection apply to every product.** The current site states them company-wide (home FAQ); the site shows them on every product page. | `manufacturing` and product spec block | Spec accuracy |
| 10 | **Prelam, flexible and flush door standards** (if any) | `standard` in `src/data/products.ts` | Compare table ("Ask us") |

## Imagery provenance

- Product, veneer, prelam, team, plant and Matecia 2025 photos: all from the
  current billionply.com uploads (the client's own material).
- `public/images/mood/*` (living room, kitchen): lifestyle images from the
  current site's home page and blog. Used for mood only, never captioned as a
  Billionply project.
- The three portrait photos next to the testimonials on the old home page carry
  different names from the testimonials (stock-looking). They are **not used**.

## Platform setup (done 2026-11-24)

- Tyashin project: "Billionply" `6aff44f34a248d00ad16dc21`, owned by sales@billionply.com (team `6aff44f24741cde615e868b1`), slug `varun-website-mwnwnuc6`. Repo adopted, deploys on push to `main`.
- Plugins installed: Contact Form & Lead Capture, Blog (auto-publish and AI suggestions off), YOM analytics (lead tracking on). Custom events: `catalogue_download`, `whatsapp_click`, `generate_lead`, `woodlark_click`.
- Blog: both posts from `docs/blog-migration/posts.json` published with their original dates.
- Domain: `www.billionply.com` registered (pending validation). At go-live the client sets, at Hostinger: CNAME `www` → `sites.tyashin.com`, the TXT `_cf-custom-hostname.www` record shown in the project's Domains tab, and a 301 from `billionply.com` to `https://www.billionply.com/`. Then flip `src/config/launch.ts` `indexable` + `ROBOTS_NOINDEX`, and install SEO Co-Pilot (needs the domain active).
