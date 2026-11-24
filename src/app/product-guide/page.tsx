import { ProductGuide } from '@/components/custom/Specify';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Which Product for Which Job",
  description: "Which Billionply product for which job: interiors, doors, heavy-duty furniture and wet or harsh areas like kitchens, bathrooms and coastal homes.",
  path: "/product-guide",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Guide","path":"/product-guide"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Product guide",
        "headline": "Start from the job",
        "blocks": [
          {
            "paragraphs": [
              "Pick what you are building: interiors, doors, heavy-duty furniture, or wet and harsh areas. Each group lists the products that suit it, and why."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
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
