import { RequestFormSection } from '@/components/custom/RequestFormSection';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Request Samples",
  description: "Architects and interior designers: request Billionply samples of decorative veneer, prelam, plywood, block board and flush doors for your next project.",
  path: "/sample-request",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Samples","path":"/sample-request"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "For architects and designers",
        "headline": "See the grain before you specify",
        "blocks": [
          {
            "paragraphs": [
              "Pick the products you need and where to send them."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <section className="section pt-0">
        <div className="container-x max-w-4xl">
          <RequestFormSection type="sample" />
        </div>
      </section>
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
