import type { Metadata } from 'next';

// The site's canonical identity. `domain` is the ONLY thing that changes when
// the customer's domain is cut over (update NEXT_PUBLIC_SITE_DOMAIN).
export const SITE = {
  name: 'Billionply',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'www.billionply.com',
  defaultOgImage: '/images/og-cover.jpg',
  locale: 'en_IN',
  twitter: '',
};

// The canonical host MUST match the platform's resolveCanonicalHost().
export function siteUrl(path = '/'): string {
  const base = `https://${SITE.domain}`;
  const p = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`;
  return `${base}${p}`;
}

// Build a complete, absolute-URL Metadata object for one page.
export function pageMetadata(opts: {
  title?: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = siteUrl(opts.path);
  const image = opts.image || SITE.defaultOgImage;
  const socialTitle = typeof opts.title === 'object' ? opts.title.absolute : opts.title || SITE.name;
  return {
    // Omit when unset so the layout's default title applies (an explicit
    // `title: undefined` blanks the <title> on the home page).
    ...(opts.title ? { title: opts.title } : {}),
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: opts.type || 'website',
      url,
      siteName: SITE.name,
      title: socialTitle,
      description: opts.description,
      locale: SITE.locale,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: opts.description,
      images: [image],
      ...(SITE.twitter ? { site: SITE.twitter, creator: SITE.twitter } : {}),
    },
  };
}
