import { ProductActions, ProductHero, ProductSpec, RelatedProducts, VeneerRanges } from '@/components/custom/Product';
import { copyMetadata } from '@/lib/seo';
import { AnswerSections, ProductFaq } from '@/components/custom/Answers';
import { PAGE_COPY, PRODUCT_ANSWERS } from '@/data/seo-content';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd, faqLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = copyMetadata("/products/decorative-veneer");

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Decorative Veneer","path":"/products/decorative-veneer"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("decorative-veneer")!.name}`, description: PAGE_COPY["/products/decorative-veneer"].description, path: "/products/decorative-veneer", images: [`${SITE_URL}${getProduct("decorative-veneer")!.image}`] }), faqLd(PRODUCT_ANSWERS["decorative-veneer"].faqs)]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="decorative-veneer" title="Decorative Veneer" eyebrow="IS 1328 · 10 ft height" />
      <Story {...({
        "variant": "split",
        "headline": "What decorative veneer is",
        "paragraphs": [
          "Crafted from high-quality natural wood, Billionply decorative veneer brings real timber to furniture, walls and doors. Every sheet carries its own grain, so no two designs are alike.",
          "It can be polished, stained or coated to suit the design, and it is light and easy to apply. For grand doors and high walls it comes in an extended 10 ft height."
        ],
        "image": {
          "src": "/images/products/decorative-veneer.jpg",
          "alt": "Fan of Billionply decorative veneer leaves in light and dark woods",
          "brief": "Fan of Billionply decorative veneer leaves in light and dark woods",
          "aspect": "landscape"
        },
        "imageSide": "right",
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="decorative-veneer" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where decorative veneer is used",
        "items": [
          {
            "title": "Furniture"
          },
          {
            "title": "Wall panelling"
          },
          {
            "title": "Doors, including 10 ft doors"
          },
          {
            "title": "Homes, offices and commercial spaces"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="decorative-veneer" />
      <VeneerRanges />
      <AnswerSections slug="decorative-veneer" />
      <ProductFaq slug="decorative-veneer" />
      <RelatedProducts slug="decorative-veneer" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using decorative veneer on a project?",
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
