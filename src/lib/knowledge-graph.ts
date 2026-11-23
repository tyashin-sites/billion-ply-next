import { SITE, siteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import type { Product } from '@/data/products';

/**
 * schema.org knowledge graph: ONE interlinked @graph per page (addendum §3b).
 *
 * B2B manufacturer: Organization + LocalBusiness (the Bahadurgarh plant) on
 * every page; Product nodes on product pages (no Offer: nothing is sold
 * online, prices are by enquiry). The platform edge also injects a baseline
 * (idempotent by @type), so anything emitted here wins.
 */

type SchemaNode = Record<string, unknown>;

const ORIGIN = siteUrl('/').replace(/\/+$/, '');
const ORG_ID = `${ORIGIN}/#organization`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.locality,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};

function organizationNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: siteConfig.name,
    alternateName: [siteConfig.wordmark, 'Billionply', siteConfig.legalName],
    legalName: siteConfig.legalName,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/images/logo.jpg`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneHref.replace('tel:', ''),
    foundingDate: String(siteConfig.foundedYear),
    address: postalAddress,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: siteConfig.contact.phoneHref.replace('tel:', ''),
        email: siteConfig.contact.email,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram, siteConfig.social.linkedin],
    knowsAbout: [
      'decorative veneer (IS 1328)',
      'natural wood veneer',
      'recon veneer',
      'marine plywood (IS 710)',
      'BWP plywood',
      'block board (IS 1659)',
      'prelam plywood',
      'flexible plywood',
      'flush doors',
      'plywood for interiors and furniture',
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Architects, interior designers, furniture and door manufacturers, dealers',
    },
  };
}

function localBusinessNode(): SchemaNode {
  return {
    '@type': 'LocalBusiness',
    '@id': `${ORIGIN}/#plant`,
    name: `${siteConfig.name}, ${siteConfig.legalName}`,
    parentOrganization: { '@id': ORG_ID },
    url: `${ORIGIN}/`,
    image: `${ORIGIN}/images/factory/factory-1.jpg`,
    telephone: siteConfig.contact.phoneHref.replace('tel:', ''),
    email: siteConfig.contact.email,
    address: postalAddress,
    hasMap: siteConfig.address.mapsHref,
  };
}

function webSiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': `${ORIGIN}/#website`,
    url: `${ORIGIN}/`,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
  };
}

export function productNode(p: Product): SchemaNode {
  const props = p.spec
    .filter((s) => s.value)
    .map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value }));
  return {
    '@type': 'Product',
    '@id': `${siteUrl(`/products/${p.slug}`)}#product`,
    name: `${siteConfig.name} ${p.name}`,
    description: p.metaDescription,
    image: `${ORIGIN}${p.image}`,
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@id': ORG_ID },
    category: p.name,
    ...(props.length ? { additionalProperty: props } : {}),
  };
}

export interface PageGraphOptions {
  /** e.g. '/about'. Omit for the home page. */
  path?: string;
  title?: string;
  description?: string;
  breadcrumb?: { name: string; path: string }[];
  article?: {
    headline: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    authorName?: string;
  };
  itemList?: { name: string; path: string }[];
  /** Visible FAQ on the page, emitted as a FAQPage node. Must match page text. */
  faq?: { q: string; a: string }[];
  product?: Product;
}

export function buildGraph(opts: PageGraphOptions = {}): SchemaNode {
  const nodes: SchemaNode[] = [organizationNode(), localBusinessNode(), webSiteNode()];

  const pageUrl = siteUrl(opts.path || '/');
  const webPage: SchemaNode = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: opts.title || SITE.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': ORG_ID },
  };

  if (opts.breadcrumb && opts.breadcrumb.length > 0) {
    const crumbs = [{ name: 'Home', path: '/' }, ...opts.breadcrumb];
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: siteUrl(c.path),
      })),
    });
    webPage.breadcrumb = { '@id': `${pageUrl}#breadcrumb` };
  }

  if (opts.itemList && opts.itemList.length > 0) {
    nodes.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#itemlist`,
      itemListElement: opts.itemList.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: siteUrl(item.path),
      })),
    });
  }

  if (opts.faq && opts.faq.length > 0) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      isPartOf: { '@id': `${pageUrl}#webpage` },
      mainEntity: opts.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  if (opts.product) {
    const node = productNode(opts.product);
    nodes.push(node);
    webPage.mainEntity = { '@id': node['@id'] };
  }

  nodes.push(webPage);

  if (opts.article) {
    nodes.push({
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      headline: opts.article.headline,
      ...(opts.article.datePublished ? { datePublished: opts.article.datePublished } : {}),
      ...(opts.article.dateModified ? { dateModified: opts.article.dateModified } : {}),
      ...(opts.article.image ? { image: opts.article.image } : {}),
      publisher: { '@id': ORG_ID },
      ...(opts.article.authorName ? { author: { '@type': 'Person', name: opts.article.authorName } } : {}),
    });
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialize a graph safely for a <script type="application/ld+json"> tag. */
export function graphJson(opts: PageGraphOptions = {}): string {
  return JSON.stringify(buildGraph(opts)).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
