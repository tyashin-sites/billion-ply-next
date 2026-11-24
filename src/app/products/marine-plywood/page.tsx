import { ProductActions, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Marine Plywood (IS 710)",
  description: "Billionply marine plywood to IS 710: hardwood core bonded with BWP resin, resists water, warping, delamination and fungus. Available in 10 ft sizes.",
  path: "/products/marine-plywood",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Marine Plywood","path":"/products/marine-plywood"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Marine Plywood</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "IS 710 · BWP · 10 ft sizes",
        "headline": "What marine plywood is",
        "paragraphs": [
          "Billionply marine plywood is made from high-quality hardwood bonded with boiling water-proof (BWP) grade resin, built to keep its strength in extreme conditions.",
          "It is highly resistant to water and resists warping, delamination and fungal attack. It goes through rigorous testing to meet IS 710, and comes in 10 ft sizes."
        ],
        "image": {
          "src": "/images/mood/kitchen.jpg",
          "alt": "A modern kitchen with wood-finish cabinets and a dining table",
          "brief": "A modern kitchen with wood-finish cabinets and a dining table",
          "aspect": "landscape"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <ProductActions slug="marine-plywood" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where marine plywood is used",
        "items": [
          {
            "title": "Kitchens",
            "body": "Billionply marine plywood (IS 710) for kitchens."
          },
          {
            "title": "Bathrooms",
            "body": "Billionply marine plywood (IS 710) for bathrooms."
          },
          {
            "title": "Coastal areas",
            "body": "Billionply marine plywood (IS 710) for coastal areas."
          },
          {
            "title": "Boats",
            "body": "Billionply marine plywood (IS 710) for boats."
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
