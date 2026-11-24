import { ProductActions, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Flexible Plywood (bendy ply)",
  description: "Billionply flexible plywood bends and curves without cracking. For curved furniture, architectural features, shopfitting, boats and stage design.",
  path: "/products/flexible-plywood",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Flexible Plywood","path":"/products/flexible-plywood"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Flexible Plywood</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "Bendy ply",
        "headline": "What flexible plywood is",
        "paragraphs": [
          "Flexible plywood, also called bendy ply or flexi-ply, bends and curves without cracking or breaking, for shapes and smooth, flowing lines.",
          "Thin layers of veneer with the grain running parallel let it bend easily while staying durable once formed."
        ],
        "image": {
          "src": "/images/products/flexible-plywood.jpg",
          "alt": "A curved sheet of Billionply flexible plywood",
          "brief": "A curved sheet of Billionply flexible plywood",
          "aspect": "square"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <ProductActions slug="flexible-plywood" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where flexible plywood is used",
        "items": [
          {
            "title": "Curved furniture",
            "body": "Billionply flexible plywood for curved furniture."
          },
          {
            "title": "Architectural elements",
            "body": "Billionply flexible plywood for architectural elements."
          },
          {
            "title": "Custom interiors",
            "body": "Billionply flexible plywood for custom interiors."
          },
          {
            "title": "Shopfitting",
            "body": "Billionply flexible plywood for shopfitting."
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="flexible-plywood" />
      <RelatedProducts slug="flexible-plywood" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using flexible plywood on a project?",
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
