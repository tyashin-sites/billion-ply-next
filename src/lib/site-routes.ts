import { products } from '@/data/products';

/**
 * ONE source of truth for the site's indexable routes. /sitemap-pages.xml is
 * generated from this list; /products/[slug] generateStaticParams uses the
 * same product list. Blog POSTS are platform data and live in the platform's
 * /sitemap-content.xml; only the /blog index belongs here.
 */
export interface SiteRoute {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export function getSiteRoutes(): SiteRoute[] {
  return [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
    ...products.map((p) => ({
      path: `/products/${p.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/compare', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/product-guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/catalogues', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dealers', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/become-a-dealer', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/sample-request', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/certifications', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/events', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  ];
}

export function productStaticParams(): { slug: string }[] {
  return products.map((p) => ({ slug: p.slug }));
}
