/**
 * All brand strings in ONE place (Tyashin addendum rule). Components read from
 * here — no scattered copies of name/contact details.
 *
 * Every fact below is taken from the current billionply.com (crawled
 * 2026-11-23) or the tyashin-platform issue 100 brief. Nothing is invented:
 * anything the client has not supplied yet lives in docs/ASSET-DEBT.md and is
 * hidden on the site until it exists.
 */
export const siteConfig = {
  name: 'Billionply',
  /** The wordmark as printed on the logo. */
  wordmark: 'Billionply',
  legalName: 'Jai Shiv Plywood Pvt. Ltd.',
  tagline: 'Innovative Wood Solutions for Interiors and Furniture',
  motto: 'Driven by the Purpose. Leading by Example.',
  logoLine: 'Infusing nature into interiors',
  description:
    'Billionply makes decorative veneer, marine plywood, block board, prelam and flexible plywood and flush doors in Bahadurgarh, Haryana. In the industry since 1997, three generations of the Chhabra family, 1000+ dealers across India.',
  foundedYear: 1997,
  copyrightHolder: 'Jai Shiv Plywood Pvt. Ltd.',
  contact: {
    email: 'sales@billionply.com',
    phone: '+91 83444 44635',
    phoneHref: 'tel:+918344444635',
    phone2: '+91 82879 03410',
    phone2Href: 'tel:+918287903410',
    /** The WhatsApp link the client uses on the current site. */
    whatsappHref: 'https://wa.link/pllqn5',
  },
  address: {
    street: '32 K.M. Stone, Delhi-Rohtak Road, Village Rohad',
    locality: 'Bahadurgarh',
    region: 'Haryana',
    postalCode: '124507',
    country: 'IN',
    oneLine:
      'Jai Shiv Plywood Pvt. Ltd., 32 K.M. Stone, Delhi-Rohtak Road, Village Rohad, Bahadurgarh, Haryana 124507',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=Jai+Shiv+Plywood+Pvt+Ltd+Rohad+Bahadurgarh+Haryana+124507',
  },
  social: {
    facebook: 'https://www.facebook.com/Billionveneers',
    instagram: 'https://www.instagram.com/billionply',
    linkedin: 'https://www.linkedin.com/company/billionply',
  },
  /** Woodlark: the premium hybrid veneer range lives at woodlarkveneer.com. */
  woodlark: {
    name: 'Woodlark',
    product: 'Premium Hybrid Veneer',
    url: 'https://woodlarkveneer.com',
  },
  stats: [
    { value: 1997, label: 'Three generations of the Chhabra family', plain: true },
    { value: 1000, suffix: '+', label: 'Dealers across India' },
    { value: 500, suffix: '+', label: 'Completed projects' },
    { value: 400, suffix: '+', label: 'Veneer species' },
  ],
  nav: [
    { label: 'Products', href: '/products' },
    { label: 'Compare', href: '/compare' },
    { label: 'Which product?', href: '/product-guide' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Find a dealer', href: '/dealers' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
