import { CatalogueList } from '@/components/custom/Specify';
import { copyMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = copyMetadata('/catalogues');

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Catalogues","path":"/catalogues"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Downloads",
        "headline": "Veneer catalogues",
        "blocks": [
          {
            "paragraphs": [
              "Browse the veneer collections offline, or share them with your client."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <CatalogueList />
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
