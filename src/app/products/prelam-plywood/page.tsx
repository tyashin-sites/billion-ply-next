import { ProductActions, ProductHero, ProductSpec, RelatedProducts, PrelamFinishes } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Prelam Plywood",
  description: "Billionply prelam plywood: a factory-pressed melamine finish that needs no extra surface work. For furniture, partitions, cabinets and modular interiors.",
  path: "/products/prelam-plywood",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Prelam Plywood","path":"/products/prelam-plywood"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("prelam-plywood")!.name}`, description: getProduct("prelam-plywood")!.metaDescription, path: "/products/prelam-plywood", images: [`${SITE_URL}${getProduct("prelam-plywood")!.image}`] })]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="prelam-plywood" title="Prelam Plywood" eyebrow="Ready-finished surface" />
      <Story {...({
        "variant": "stacked",
        "headline": "What prelam plywood is",
        "paragraphs": [
          "Billionply prelam plywood comes with factory-pressed melamine paper, so it needs no further surface finishing.",
          "It suits furniture, partitions, cabinets, wall panelling and modular interiors, and comes in a range of colours, textures and finishes."
        ],
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="prelam-plywood" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where prelam plywood is used",
        "items": [
          {
            "title": "Furniture"
          },
          {
            "title": "Partitions"
          },
          {
            "title": "Cabinets"
          },
          {
            "title": "Wall panelling"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="prelam-plywood" />
      <PrelamFinishes />
      <RelatedProducts slug="prelam-plywood" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using prelam plywood on a project?",
        "body": "Tell us what you are building. We help you pick the board, send samples and connect you with your nearest dealer.",
        "primaryCta": {
          "label": "Send an enquiry",
          "href": "/contact"
        },
        "secondaryCta": {
          "label": "Chat on WhatsApp",
          "href": "https://wa.me/918287903410"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
