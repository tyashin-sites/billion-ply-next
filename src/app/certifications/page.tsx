import { Certifications } from '@/components/custom/Company';
import { copyMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';
import { CERTIFICATIONS_OPENING, PAGE_COPY } from '@/data/seo-content';

export const metadata = copyMetadata('/certifications');

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Certifications","path":"/certifications"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Quality",
        "headline": PAGE_COPY['/certifications'].h1,
        "blocks": [
          {
            "paragraphs": [CERTIFICATIONS_OPENING]
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
