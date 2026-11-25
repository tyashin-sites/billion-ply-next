import { ProductGuide } from '@/components/custom/Specify';
import { GuideAnswers } from '@/components/custom/Answers';
import { copyMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = copyMetadata('/product-guide');

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Guide","path":"/product-guide"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Product guide",
        "headline": "Which plywood or veneer should you use?",
        "blocks": [
          {
            "paragraphs": [
              "Pick what you are building: interiors, doors, heavy-duty furniture, or wet and harsh areas. Each group lists the products that suit it, and why."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <GuideAnswers />
      <ProductGuide />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Planning a project?",
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
