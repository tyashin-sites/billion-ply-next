import type { NextConfig } from 'next';
import { redirectRules } from './src/config/legacy-redirects';

const TYASHIN_SUBDOMAIN = 'https://billion-ply.sites.tyashin.com';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TYASHIN_API_URL: process.env.TYASHIN_API_URL || 'https://website-api.tyashin.com',
    NEXT_PUBLIC_SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'billionply.com',
  },
  // Images are pre-sized JPEGs in public/images; the Tyashin Image
  // Optimization plugin handles AVIF/WebP at the edge once installed.
  images: { unoptimized: true },
  // Old WordPress URLs end in "/": handle them in redirects() as one 301.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return redirectRules();
  },
  // These rewrites only matter for direct *.workers.dev access (preview/QA).
  // In production the Tyashin dispatch layer serves these platform-owned
  // paths before the Worker is invoked.
  async rewrites() {
    return [
      { source: '/brand-kit.css', destination: `${TYASHIN_SUBDOMAIN}/brand-kit.css` },
      { source: '/tyashin-runtime.js', destination: `${TYASHIN_SUBDOMAIN}/tyashin-runtime.js` },
      { source: '/sitemap.xml', destination: `${TYASHIN_SUBDOMAIN}/sitemap.xml` },
      { source: '/robots.txt', destination: `${TYASHIN_SUBDOMAIN}/robots.txt` },
      { source: '/blog/rss.xml', destination: `${TYASHIN_SUBDOMAIN}/blog/rss.xml` },
    ];
  },
};

export default nextConfig;
