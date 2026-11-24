# billion-ply-next

Billionply (Jai Shiv Plywood Pvt. Ltd.) website on Tyashin. Project `6aff44f34a248d00ad16dc21`
(owner sales@billionply.com). Pushes to `main` deploy through `.github/workflows/deploy.yml`.

Built on the Tyashin Website Studio kit, per the Next.js addendum:
- `src/components/kit`, `src/lib/{brand-kit,brand-kit-css,seo,schema,img,site-config}.ts`,
  `src/app/globals.css` header and tokens: platform kit, rendered from a site spec
  (tyashin-platform `agent-runner` renderer). Header/footer logo and colours come from the
  project's Brand Kit at runtime.
- `src/config/site.ts`: every fact (rendered from the intake, plus `BRAND`).
- `src/components/custom/*`: Billionply sections (product spec, veneer ranges, compare table,
  product guide, catalogues, dealer locator, dealer/sample forms, timeline, galleries).
- `src/data/*`: products, company, catalogues, dealers (editable, empty until the client sends a list).
- `src/app/downloads/[file]`: large PDFs from the R2 bucket `billionply-site-assets`.
- `src/config/legacy-redirects.ts`: 301s from every old WordPress URL.

Tests: `npm test`. Open client items: `docs/ASSET-DEBT.md`.
