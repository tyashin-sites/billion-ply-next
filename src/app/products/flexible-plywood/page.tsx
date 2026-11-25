import { ProductActions, ProductHero, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { copyMetadata } from '@/lib/seo';
import { AnswerSections, ProductFaq } from '@/components/custom/Answers';
import { PAGE_COPY, PRODUCT_ANSWERS } from '@/data/seo-content';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd, faqLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = copyMetadata("/products/flexible-plywood");

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Flexible Plywood","path":"/products/flexible-plywood"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("flexible-plywood")!.name}`, description: PAGE_COPY["/products/flexible-plywood"].description, path: "/products/flexible-plywood", images: [`${SITE_URL}${getProduct("flexible-plywood")!.image}`] }), faqLd(PRODUCT_ANSWERS["flexible-plywood"].faqs)]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="flexible-plywood" title="Flexible Plywood" eyebrow="Bendy ply" />
      <Story {...({
        "variant": "stacked",
        "headline": "What flexible plywood is",
        "paragraphs": [
          "Flexible plywood, also called bendy ply or flexi-ply, bends and curves without cracking or breaking, for shapes and smooth, flowing lines.",
          "Thin layers of veneer with the grain running parallel let it bend easily while staying durable once formed."
        ],
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="flexible-plywood" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where flexible plywood is used",
        "items": [
          {
            "title": "Curved furniture"
          },
          {
            "title": "Architectural elements"
          },
          {
            "title": "Custom interiors"
          },
          {
            "title": "Shopfitting"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="flexible-plywood" />
      <AnswerSections slug="flexible-plywood" />
      <ProductFaq slug="flexible-plywood" />
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
