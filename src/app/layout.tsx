import { WhatsAppFloat } from '@/components/custom/Home';
import type { Metadata, Viewport } from 'next';
import { bodyFont, headingFont, monoFont } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import { SITE, siteUrl } from '@/lib/seo';
import { Header } from '@/components/kit/Header';
import { Footer } from '@/components/kit/Footer';
import { BrandKitStyle } from '@/components/kit/BrandKitStyle';
import { Reveal } from '@/components/kit/Reveal';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl('/')),
  title: {
    default: `${SITE.name} — ${siteConfig.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl('/'),
    title: SITE.name,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  // Light only: the client's logo is a JPG on white, which shows as a white
  // box on a dark header. Re-enable the dark scheme (drop data-theme="light"
  // on <html>) once a transparent logo is in the Brand Kit.
  themeColor: "#F8F5EF",
};

// First-frame ground: html/body take the page background before the CSS
// bundle arrives, so there is no white flash on dark schemes.
const FIRST_FRAME_CSS = `
html, body { background-color: #F8F5EF; }
@media (prefers-color-scheme: dark) { html:root:not([data-theme="light"]), html:root:not([data-theme="light"]) body { background-color: color-mix(in oklab, #14231B 88%, #000000); } }
html:root[data-theme="dark"], html:root[data-theme="dark"] body { background-color: color-mix(in oklab, #14231B 88%, #000000); }
`;

const FOOTER = {
  "blurb": "Three generations of the Chhabra family, in plywood and veneer since 1997.",
  "columns": [
    {
      "heading": "Products",
      "links": [
        {
          "label": "Decorative Veneer",
          "href": "/products/decorative-veneer"
        },
        {
          "label": "Marine Plywood",
          "href": "/products/marine-plywood"
        },
        {
          "label": "Block Board",
          "href": "/products/block-board"
        },
        {
          "label": "Prelam Plywood",
          "href": "/products/prelam-plywood"
        },
        {
          "label": "Flexible Plywood",
          "href": "/products/flexible-plywood"
        },
        {
          "label": "Flush Doors",
          "href": "/products/flush-door"
        },
        {
          "label": "Premium Hybrid Veneer by Woodlark",
          "href": "https://woodlarkveneer.com"
        }
      ]
    },
    {
      "heading": "Specify and buy",
      "links": [
        {
          "label": "Compare products",
          "href": "/compare"
        },
        {
          "label": "Which product for which job",
          "href": "/product-guide"
        },
        {
          "label": "Catalogues",
          "href": "/catalogues"
        },
        {
          "label": "Request samples",
          "href": "/sample-request"
        },
        {
          "label": "Find a dealer",
          "href": "/dealers"
        },
        {
          "label": "Become a dealer",
          "href": "/become-a-dealer"
        }
      ]
    },
    {
      "heading": "Company",
      "links": [
        {
          "label": "About",
          "href": "/about"
        },
        {
          "label": "Projects",
          "href": "/projects"
        },
        {
          "label": "Events",
          "href": "/events"
        },
        {
          "label": "Certifications",
          "href": "/certifications"
        },
        {
          "label": "Blog",
          "href": "/blog"
        },
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: FIRST_FRAME_CSS }} />
        {/* Brand kit first: the customer's Tyashin colours over this palette. */}
        <BrandKitStyle />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-clip">
          {children}
        </main>
        <Footer blurb={FOOTER.blurb} columns={FOOTER.columns} />
        <WhatsAppFloat />
        <Reveal />
      </body>
    </html>
  );
}
