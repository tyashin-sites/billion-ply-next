/**
 * 301 map from every old billionply.com (WordPress) URL to its new page.
 * Pure data, no imports: next.config.ts and tests/redirects.test.mjs both
 * read it. Each old path is matched with and without the trailing slash.
 *
 * Blog posts move to /blog/<same slug>. The duplicate post
 * ("…-interior-design-2") is dropped and points at the original.
 */
export const legacyRedirects: Record<string, string> = {
  '/about-us': '/about',
  '/decorative-veneer': '/products/decorative-veneer',
  '/marine-plywood': '/products/marine-plywood',
  '/prelam-plywood': '/products/prelam-plywood',
  '/flexible-plywood': '/products/flexible-plywood',
  '/block-board': '/products/block-board',
  '/flushdoor-product': '/products/flush-door',
  '/gallery': '/projects',
  '/contact-us': '/contact',
  '/event-photos': '/events',
  // Unlinked WordPress pages found in its page list (wp-json, 24 Nov 2026).
  '/digital-card': '/contact',
  '/home-new': '/',
  // Legal pages of the first build moved to the kit paths.
  '/privacy-policy': '/privacy',
  '/terms-and-conditions': '/terms',
  '/how-to-choose-the-right-plywood-for-your-interior-projects':
    '/blog/how-to-choose-the-right-plywood-for-your-interior-projects',
  '/top-benefits-of-using-high-quality-plywood-for-interior-design':
    '/blog/top-benefits-of-using-high-quality-plywood-for-interior-design',
  '/top-benefits-of-using-high-quality-plywood-for-interior-design-2':
    '/blog/top-benefits-of-using-high-quality-plywood-for-interior-design',
};

export interface RedirectRule {
  source: string;
  destination: string;
  statusCode: 301;
}

/**
 * Rules for next.config.ts `redirects()`. With `skipTrailingSlashRedirect`
 * on, the old "/about-us/" form is matched directly (one 301 hop, not a 308
 * then a 301), and a final catch-all strips any other trailing slash with a
 * 301 as well.
 */
export function redirectRules(): RedirectRule[] {
  const rules: RedirectRule[] = [];
  for (const [from, to] of Object.entries(legacyRedirects)) {
    rules.push({ source: from, destination: to, statusCode: 301 });
    rules.push({ source: `${from}/`, destination: to, statusCode: 301 });
  }
  rules.push({ source: '/:path+/', destination: '/:path+', statusCode: 301 });
  return rules;
}
