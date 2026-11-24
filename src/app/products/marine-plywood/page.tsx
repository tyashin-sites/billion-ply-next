import { ProductActions, ProductHero, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Marine Plywood (IS 710)",
  description: "Billionply marine plywood to IS 710: hardwood core bonded with BWP resin, resists water, warping, delamination and fungus. Available in 10 ft sizes.",
  path: "/products/marine-plywood",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Marine Plywood","path":"/products/marine-plywood"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("marine-plywood")!.name}`, description: getProduct("marine-plywood")!.metaDescription, path: "/products/marine-plywood", images: [`${SITE_URL}${getProduct("marine-plywood")!.image}`] })]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="marine-plywood" title="Marine Plywood" eyebrow="IS 710 · BWP · 10 ft sizes" />
      <Story {...({
        "variant": "split",
        "headline": "What marine plywood is",
        "paragraphs": [
          "Billionply marine plywood is made from high-quality hardwood bonded with boiling water-proof (BWP) grade resin, built to keep its strength in extreme conditions.",
          "It is highly resistant to water and resists warping, delamination and fungal attack. It goes through rigorous testing to meet IS 710, and comes in 10 ft sizes."
        ],
        "image": {
          "src": "/images/products/marine-plywood.jpg",
          "alt": "Billionply marine plywood sheet with IS 710 face stamps",
          "brief": "Billionply marine plywood sheet with IS 710 face stamps",
          "aspect": "landscape"
        },
        "imageSide": "right",
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="marine-plywood" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where marine plywood is used",
        "items": [
          {
            "title": "Kitchens"
          },
          {
            "title": "Bathrooms"
          },
          {
            "title": "Coastal areas"
          },
          {
            "title": "Boats"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="marine-plywood" />
      <RelatedProducts slug="marine-plywood" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using marine plywood on a project?",
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
