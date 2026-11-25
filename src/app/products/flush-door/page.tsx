import { ProductActions, ProductHero, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { copyMetadata } from '@/lib/seo';
import { AnswerSections, ProductFaq } from '@/components/custom/Answers';
import { PAGE_COPY, PRODUCT_ANSWERS } from '@/data/seo-content';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd, faqLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = copyMetadata("/products/flush-door");

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Flush Door","path":"/products/flush-door"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("flush-door")!.name}`, description: PAGE_COPY["/products/flush-door"].description, path: "/products/flush-door", images: [`${SITE_URL}${getProduct("flush-door")!.image}`] }), faqLd(PRODUCT_ANSWERS["flush-door"].faqs)]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="flush-door" title="Flush Doors" eyebrow="Solid core · 10 ft size" />
      <Story {...({
        "variant": "stacked",
        "headline": "What a flush door is",
        "paragraphs": [
          "Billionply flush doors are made with precision from high-quality materials for a solid, smooth surface that looks good and lasts.",
          "They resist warping, cracking and swelling from changes in humidity. The solid core gives sound insulation, and the face is ready for paint or polish."
        ],
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="flush-door" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where flush door is used",
        "items": [
          {
            "title": "Homes"
          },
          {
            "title": "Offices"
          },
          {
            "title": "Commercial spaces"
          },
          {
            "title": "Large 10 ft door frames"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="flush-door" />
      <AnswerSections slug="flush-door" />
      <ProductFaq slug="flush-door" />
      <RelatedProducts slug="flush-door" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using flush door on a project?",
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
