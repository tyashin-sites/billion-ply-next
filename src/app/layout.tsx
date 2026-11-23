import type { Metadata } from 'next';
import { displayFont, bodyFont } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppDock } from '@/components/WhatsAppDock';
import { getBlogHasPosts } from '@/lib/blog';
import { SITE, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { launch } from '@/config/launch';
import './globals.css';

const noindex = !launch.indexable || process.env.ROBOTS_NOINDEX === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl('/')),
  title: {
    default: `${SITE.name}: plywood, decorative veneer and flush doors since 1997`,
    template: `%s | ${SITE.name}`,
  },
  description: siteConfig.description,
  icons: { icon: '/images/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl('/'),
    title: `${SITE.name}: ${siteConfig.tagline}`,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  ...(noindex ? { robots: { index: false, follow: false, googleBot: { index: false, follow: false } } } : {}),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hasBlog = await getBlogHasPosts();

  return (
    // Literal background on <html>/<body> so the first paint is ivory, not white.
    <html lang="en-IN" className={`${displayFont.variable} ${bodyFont.variable}`} style={{ backgroundColor: '#F8F5EF' }}>
      <head>
        {/* Platform-served brand kit overrides, layered after globals.css */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/brand-kit.css" />
      </head>
      <body className="font-body bg-background text-foreground antialiased" style={{ backgroundColor: '#F8F5EF' }}>
        <div className="flex min-h-screen flex-col">
          <Header hasBlog={hasBlog} />
          <main id="main" className="flex-1 overflow-x-clip pt-[80px]">
            {children}
          </main>
          <Footer hasBlog={hasBlog} />
        </div>
        <WhatsAppDock />
      </body>
    </html>
  );
}
