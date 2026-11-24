/**
 * siteConfig — EVERY brand string and hard fact lives here. Written by Tyashin
 * Website Studio from the customer's intake; nothing below was invented by a
 * model. Missing facts are null on purpose (see docs/ASSET-DEBT.md).
 */
import { derive, type SiteConfig, type Cta } from '@/lib/site-config';

export const siteConfig: SiteConfig = {
  "name": "Billionply",
  "shortName": "Billionply",
  "tagline": "Innovative Wood Solutions for Interiors and Furniture",
  "description": "Billionply makes decorative veneer, marine plywood, block board, prelam and flexible plywood and flush doors in Bahadurgarh, Haryana, since 1997.",
  "domain": "www.billionply.com",
  "locale": "en_US",
  "language": "en",
  "contact": {
    "phoneE164": "+918344444635",
    "phoneDisplay": "+91 83444 44635",
    "whatsappNumber": "918287903410",
    "whatsappMessage": "Hi Billionply, I would like to enquire.",
    "email": "sales@billionply.com"
  },
  "address": {
    "line": "Jai Shiv Plywood Pvt. Ltd., 32 K.M. Stone, Delhi-Rohtak Road, Village Rohad",
    "locality": "Bahadurgarh, Haryana 124507",
    "country": "India"
  },
  "hours": {
    "summary": null
  },
  "nav": [
    {
      "label": "Products",
      "href": "/products"
    },
    {
      "label": "Compare",
      "href": "/compare"
    },
    {
      "label": "Guide",
      "href": "/product-guide"
    },
    {
      "label": "Find a dealer",
      "href": "/dealers"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Projects",
      "href": "/projects"
    }
  ],
  "legalNav": [
    {
      "label": "Privacy",
      "href": "/privacy"
    },
    {
      "label": "Terms",
      "href": "/terms"
    }
  ],
  "socials": [
    { "label": "Facebook", "href": "https://www.facebook.com/Billionveneers" },
    { "label": "Instagram", "href": "https://www.instagram.com/billionply" },
    { "label": "LinkedIn", "href": "https://www.linkedin.com/company/billionply" }
  ]
};

const d = derive(siteConfig);
export const TEL_URL = d.tel;
export const WHATSAPP_URL = d.whatsapp;
export const MAILTO_URL = d.mailto;
export const FULL_ADDRESS = d.fullAddress;
export const MAPS_EMBED_URL = d.mapsEmbed;

/** Where the contact form posts leads; TYASHIN_API_URL overrides it when set. */
export const TYASHIN_API_ORIGIN = "https://website-api.tyashin.com";

/** The Tyashin project whose brand kit (logo, colours) this site shows at runtime. */
export const TYASHIN_PROJECT_ID = "6aff44f34a248d00ad16dc21";

/** The one primary action, used by the header, footer and mobile menu. */
export const PRIMARY_CTA: Cta | null = WHATSAPP_URL
  ? { label: 'WhatsApp us', href: WHATSAPP_URL }
  : TEL_URL
    ? { label: 'Call us', href: TEL_URL }
    : { label: 'Contact us', href: '/contact' };

/**
 * Billionply facts beyond the kit's SiteConfig shape. Same rule: only facts
 * from billionply.com or tyashin-platform issue 100.
 */
export const BRAND = {
  legalName: 'Jai Shiv Plywood Pvt. Ltd.',
  foundedYear: 1997,
  motto: 'Driven by the Purpose. Leading by Example.',
  phone2Display: '+91 82879 03410',
  phone2Href: 'tel:+918287903410',
  postal: {
    street: '32 K.M. Stone, Delhi-Rohtak Road, Village Rohad',
    locality: 'Bahadurgarh',
    region: 'Haryana',
    postalCode: '124507',
    country: 'IN',
  },
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Jai+Shiv+Plywood+Pvt+Ltd+Rohad+Bahadurgarh+Haryana+124507',
  /** Premium Hybrid Veneer lives on the Woodlark site, not on Billionply. */
  woodlark: { name: 'Woodlark', product: 'Premium Hybrid Veneer', url: 'https://woodlarkveneer.com' },
  stats: [
    { value: 'Since 1997', label: 'Three generations of the Chhabra family' },
    { value: '1000+', label: 'Dealers across India' },
    { value: '500+', label: 'Completed projects' },
    { value: '400+', label: 'Veneer species' },
  ],
} as const;
