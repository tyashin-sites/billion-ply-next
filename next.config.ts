import { redirectRules } from './src/config/legacy-redirects';

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

// The project's Tyashin slug subdomain — where the platform serves the
// platform-owned paths (brand-kit.css, sitemap.xml, robots.txt, RSS). In
// production via Tyashin dispatch these rewrites are no-ops (dispatch
// intercepts first); they only matter for direct *.workers.dev access.
const SLUG_HOST = "https://varun-website-mwnwnuc6.sites.tyashin.com";

const nextConfig = {
  // Old WordPress URLs end in "/": one 301 straight to the new page (src/config/legacy-redirects.ts).
  skipTrailingSlashRedirect: true,
  async redirects() {
    return redirectRules();
  },
  images: {
    remotePatterns: [{ protocol: 'https' as const, hostname: '**' }],
  },
  // Type errors fail the build on purpose. (No eslint key: Next 16 removed
  // it and next build no longer lints.)
  typescript: { ignoreBuildErrors: false },
  env: {
    NEXT_PUBLIC_SITE_DOMAIN: process.env.NEXT_PUBLIC_SITE_DOMAIN || "www.billionply.com",
  },
  async rewrites() {
    return [
      { source: '/brand-kit.css', destination: `${SLUG_HOST}/brand-kit.css` },
      { source: '/tyashin-runtime.js', destination: `${SLUG_HOST}/tyashin-runtime.js` },
      { source: '/sitemap.xml', destination: `${SLUG_HOST}/sitemap.xml` },
      { source: '/blog/rss.xml', destination: `${SLUG_HOST}/blog/rss.xml` },
      { source: '/rss.xml', destination: `${SLUG_HOST}/rss.xml` },
      { source: '/feed', destination: `${SLUG_HOST}/feed` },
      { source: '/feed.xml', destination: `${SLUG_HOST}/feed.xml` },
    ];
  },
};

export default nextConfig;
