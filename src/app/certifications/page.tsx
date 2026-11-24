import { Certifications } from '@/components/custom/Company';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Certifications and Standards",
  description: "Billionply standards and certifications: decorative veneer to IS 1328, marine plywood to IS 710, block board to IS 1659, E1 grade and termite protection.",
  path: "/certifications",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Certifications","path":"/certifications"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Quality",
        "headline": "Made to Indian Standards",
        "blocks": [
          {
            "paragraphs": [
              "The Indian Standards our products are made to, and how we make them."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <Certifications />
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
