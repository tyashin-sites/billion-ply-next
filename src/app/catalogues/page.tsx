import { CatalogueList } from '@/components/custom/Specify';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Catalogues to Download",
  description: "Download Billionply catalogues: the full natural decorative veneer catalogue and the recon veneer catalogue, as PDF files you can share with clients.",
  path: "/catalogues",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Catalogues","path":"/catalogues"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Downloads",
        "headline": "Take the range with you",
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
