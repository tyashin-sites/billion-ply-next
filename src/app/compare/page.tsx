import { CompareTable } from '@/components/custom/Specify';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Compare Plywood, Veneer and Doors",
  description: "Compare Billionply marine plywood, block board, prelam and flexible plywood, veneer and flush doors: water resistance, uses, IS standard and sizes.",
  path: "/compare",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Compare","path":"/compare"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Compare",
        "headline": "Side by side",
        "blocks": [
          {
            "paragraphs": [
              "Water resistance, typical uses, IS standard and sizes for the whole range. Where a value is not published yet, ask us and we will confirm it."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <CompareTable />
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
