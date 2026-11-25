/**
 * SINGLE SOURCE OF TRUTH for the indexable URL tree (addendum §3g).
 * `/sitemap-pages.xml` renders this list. Blog POSTS are platform-owned and
 * live in the platform's content sitemap.
 */
export type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export interface SiteRoute {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** YYYY-MM-DD of the page's last real content change. Omit when unknown:
   *  /sitemap-pages.xml then emits no <lastmod> for it (never the build date). */
  lastModified?: string;
}

const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: 'weekly' },
  { path: "/products", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/products/decorative-veneer", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/products/natural-veneer", priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-11-25' },
  { path: "/products/teak-veneer", priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-11-25' },
  { path: "/products/recon-veneer", priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-11-25' },
  { path: "/products/marine-plywood", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/products/commercial-plywood", priority: 0.6, changeFrequency: 'monthly', lastModified: '2026-11-25' },
  { path: "/products/block-board", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/products/prelam-plywood", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/products/flexible-plywood", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/products/flush-door", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/compare", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/product-guide", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/catalogues", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/dealers", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/become-a-dealer", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/sample-request", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/about", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/certifications", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/projects", priority: 0.8, changeFrequency: 'monthly' },
  { path: "/events", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/contact", priority: 0.6, changeFrequency: 'monthly' },
  { path: "/privacy", priority: 0.2, changeFrequency: 'yearly' },
  { path: "/terms", priority: 0.2, changeFrequency: 'yearly' },
];

export function getSiteRoutes(): SiteRoute[] {
  return STATIC_ROUTES;
}
