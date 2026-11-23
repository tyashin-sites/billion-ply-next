/**
 * Catalogue downloads. Every catalogue CTA on the old billionply.com has an
 * equivalent here (issue 100):
 *
 *  - Natural veneer ("Download Catalogue" on /decorative-veneer/): the original
 *    is 60 MB, over Cloudflare's 25 MiB static-asset limit, so it cannot ship
 *    inside the Worker. `href` points at the Tyashin-hosted copy once the
 *    file is uploaded to the project's Media Library (docs/ASSET-DEBT.md #1);
 *    until then it still points at the WordPress original, which BLOCKS the
 *    WordPress shutdown.
 *  - Recon veneer: re-hosted inside this site (public/catalogues/).
 *  - The old "Hybrid Veneers" tile (Woodlark e-catalogue) is NOT a Billionply
 *    catalogue any more: it is the Woodlark sister-brand card.
 *
 * Downloads emit a `catalogue_download` event on the Tyashin events bus.
 */
export interface Catalogue {
  key: string;
  title: string;
  description: string;
  href: string;
  sizeLabel: string;
  /** true while the file is still served from the old WordPress host. */
  legacyHost: boolean;
}

export const catalogues: Record<string, Catalogue> = {
  natural: {
    key: 'natural',
    title: 'Natural Veneer Catalogue',
    description: 'The full natural decorative veneer collection.',
    href:
      process.env.NEXT_PUBLIC_NATURAL_CATALOGUE_URL ||
      'https://billionply.com/wp-content/uploads/2025/01/NATURAL-E-CATALOGUE-pdf-VDR-161.pdf',
    sizeLabel: 'PDF, 60 MB',
    legacyHost: !process.env.NEXT_PUBLIC_NATURAL_CATALOGUE_URL,
  },
  recon: {
    key: 'recon',
    title: 'Recon Veneer Catalogue',
    description: 'Reconstituted veneers with consistent, repeatable grain.',
    href: '/catalogues/billion-ply-recon-veneer-catalogue.pdf',
    sizeLabel: 'PDF, 14 MB',
    legacyHost: false,
  },
};

export const catalogueList = Object.values(catalogues);
