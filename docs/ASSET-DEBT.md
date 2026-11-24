# Asset debt: Billionply

What the site still needs from the client. Every slot is built and **hidden while
empty**; nothing shows a placeholder publicly. Only a real input clears a row.

| # | Item | Where it goes | Blocks |
|---|------|---------------|--------|
| 1 | **Official logo** (SVG or transparent PNG). The brand kit holds the JPG from the old site (light logo). Upload the new file in the Tyashin admin → Brand Kit; the site picks it up within 5 minutes, no rebuild. A dark-background version goes in the "Dark" slot (the footer shows the wordmark until then). | Tyashin Brand Kit | Quality only |
| 2 | **Thickness, size and grade tables per product; warranty terms** | `spec` rows with `value: null` in `src/data/products.ts` | Spec completeness |
| 3 | **BIS licences**: IS 1328 is CM/L-9693005 (from the catalogue, shown on the site). Still needed: IS 710 and IS 1659 numbers, validity dates and certificate images | `certifications` in `src/data/company.ts` | Certifications detail |
| 4 | **Dealer list** (firm, city, state; optional address, pincode, phone) | `src/data/dealers.json` (format in `src/lib/dealer-search.ts`) | Locator results ("Contact us for your nearest dealer" until then) |
| 5 | **Named projects / case studies** with photos | `caseStudies` in `src/data/company.ts` | Projects case-study grid |
| 6 | **Dated legacy milestones** | `timeline` in `src/data/company.ts` | About timeline |
| 7 | **Confirm E1, 4 Quad Press, Italian sanders and termite/borer protection apply to every product** (the old site states them company-wide) | product spec block | Spec accuracy |
| 8 | **Any IS standard for prelam, flexible ply and flush doors** | `standard` in `src/data/products.ts` | Compare table shows "Ask us" |
| 9 | **In-use photos for Block Board, Flexible Plywood and Flush Doors** (their pages use product shots). Alternative: AI scenes, ≈ $0.34 total, needs Aditya's approval on the coder machine (cost gate). | `image.src` on those pages | Lifestyle look |
| 10 | **Confirm the QR codes printed on boards** open `billionply.com/billionply-product-verification/`. The new site serves that page at the same URL (do not move or remove it). | `src/app/billionply-product-verification` | Product verification after cutover |
| 11 | **billionveneers.com** (QR on the back of the natural veneer catalogue) has no DNS and leads nowhere. Point it at Tyashin and 301 it to www.billionply.com, or reprint. | DNS (client, GoDaddy) | Catalogue QR |

## Done (24 Nov 2026)
- Tyashin project "Billionply" `6aff44f34a248d00ad16dc21`, owned by sales@billionply.com; repo adopted, deploys on push to `main`.
- Brand kit: logo (light), primary #2F6B1E, accent #B07A45, background #F8F5EF, text #14231B.
- Plugins: Contact Form & Lead Capture, Blog (auto-publish and AI suggestions off), YOM analytics (lead tracking on). SEO Co-Pilot installs once `www.billionply.com` is active.
- Blog: both old posts published on the platform blog (`/blog`) with their original dates.
- Catalogues: Natural (60 MB) and Recon (14 MB) in R2 bucket `billionply-site-assets`, served at `/downloads/<file>`.
- Domain: `www.billionply.com` registered (pending client DNS: CNAME `www` → `sites.tyashin.com`, TXT `_cf-custom-hostname.www.billionply.com`, 301 apex → www).

## Imagery provenance
All photos are the client's own from the old billionply.com uploads. The living-room, kitchen and study images are interior mood shots from the old site, never captioned as Billionply projects.

## Decisions
- Testimonials stay hardcoded, verbatim from the old home page (Aditya, 24 Nov 2026), although the addendum prefers the Testimonials plugin.
