/**
 * Catalogue downloads. Every catalogue CTA on the old billionply.com has an
 * equivalent here (issue 100):
 *
 *  - Natural veneer ("Download Catalogue" on /decorative-veneer/): the original
 *    is 60 MB, over Cloudflare's 25 MiB static-asset limit and the Media
 *    Library's 15 MB PDF cap, so it lives in the site's R2 bucket
 *    `billionply-site-assets` and is served by src/app/downloads/[file].
 *  - Recon veneer (14 MB): same R2 bucket, same route.
 *  - The old "Hybrid Veneers" tile (Woodlark e-catalogue) is NOT a Billionply
 *    catalogue any more: it is the Woodlark card.
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
    href: '/downloads/billionply-natural-veneer-catalogue.pdf',
    sizeLabel: 'PDF, 60 MB',
    legacyHost: false,
  },
  recon: {
    key: 'recon',
    title: 'Recon Veneer Catalogue',
    description: 'Reconstituted veneers with consistent, repeatable grain.',
    href: '/downloads/billionply-recon-veneer-catalogue.pdf',
    sizeLabel: 'PDF, 14 MB',
    legacyHost: false,
  },
};

export const catalogueList = Object.values(catalogues);
