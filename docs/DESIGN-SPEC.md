# Design spec: Billionply

**Thesis:** "Leaf and grain". A three-generation family maker, shown through
real wood: warm ivory paper, forest ink, the logo's leaf green, oak warmth.
Calm, crafted, specifiable.

**Anti-goals:** no stock-photo heroes, no invented proof, no gimmicks that
hide content, no look borrowed from the Woodlark sister site (Woodlark is the
premium hybrid brand; Billionply must not look like it sells Woodlark).

## Tokens (src/app/globals.css)
- Ivory `#F8F5EF` background, forest ink `#14231B` text and dark sections,
  leaf `#4E9A2E` (logo) accent, leaf-deep `#2F6B1E` for text-on-light and
  primary buttons (AA), oak `#B07A45` second voice.
- Display: Fraunces 400–600 (weight 500 at display sizes, negative tracking).
  Body: Manrope.
- Radius 6px (controls) / 14px (cards). Shadows tinted by forest ink.
- One ease `cubic-bezier(.22,.8,.24,1)` for CSS and JS.

## Signature moments (three)
1. **Veneer leaf fan** in the home hero: three real veneer leaves fan open
   after first paint (transform-only; nothing hidden, LCP-safe), with a light
   pointer lean on fine pointers.
2. **Grain marquee**: swatches drift by, waking from grey to colour on hover.
3. **Legacy timeline** on About: the spine draws as you scroll (scaleY).

Plus: count-up legacy numbers, rise-and-settle reveals (below the fold only,
armed after hydration), header condense by shadow and logo scale (no height
change), gradient hairline on card hover.

## Laws
- LCP: hero images never hidden or masked. CLS: header height constant.
- `prefers-reduced-motion` kills all movement (CSS switch + JS checks).
- Every empty data slot hides its UI; no public placeholders.
- No ghost links: every href is a real route or external URL.

## Pages
`/`, `/products`, `/products/[slug]` (6), `/compare`, `/product-guide`,
`/catalogues`, `/dealers`, `/become-a-dealer`, `/sample-request`, `/contact`,
`/about`, `/certifications`, `/projects`, `/events`, `/blog`, `/blog/[slug]`,
legal pages (admin-edited, hidden until configured).

## Conversion
WhatsApp (header, floating, footer, every CTA band), enquiry form, separate
dealer-application and sample-request forms (own lead `source`), catalogue
downloads. Custom events on the Tyashin bus: `catalogue_download`,
`whatsapp_click`, `generate_lead`, `sister_brand_click`.
