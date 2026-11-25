import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { PAGE_COPY } from '@/data/seo-content';

/** ONE canonical host (addendum §3c). Every canonical, OG URL, JSON-LD @id and the sitemap derive from here. */
export const SITE_URL = (process.env.SITE_URL ?? `https://${siteConfig.domain}`).replace(
  /\/+$/,
  ''
);

export const SITE = {
  name: siteConfig.name,
  locale: siteConfig.locale,
  defaultOgImage: '/og/default.png',
} as const;

export function siteUrl(path = '/'): string {
  const p = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${SITE_URL}${p}`;
}

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
};

/** pageMetadata() from the marketing copy in src/data/seo-content.ts. */
export function copyMetadata(path: string, extra: Partial<PageMeta> = {}): Metadata {
  const c = PAGE_COPY[path];
  if (!c) throw new Error(`No page copy for ${path}`);
  return pageMetadata({ title: c.title, description: c.description, path, ...extra });
}

/** The one helper every page's metadata routes through (addendum §3a). */
export function pageMetadata(opts: PageMeta): Metadata {
  const url = siteUrl(opts.path);
  const image = opts.image || SITE.defaultOgImage;
  // Marketing's titles already carry the brand ("… | Billionply"), so they
  // are used as-is instead of going through the layout's "%s | Billionply".
  const title = opts.title.includes(SITE.name) ? { absolute: opts.title } : opts.title;
  return {
    title,
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type || 'website',
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: opts.title,
      description: opts.description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}
