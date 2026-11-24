import { RequestFormSection } from '@/components/custom/RequestFormSection';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Become a Billionply Dealer",
  description: "Become a Billionply dealer. Join 1000+ dealers across India selling decorative veneer, plywood, block board and flush doors. Apply in two minutes.",
  path: "/become-a-dealer",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Become a dealer","path":"/become-a-dealer"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "For dealers and distributors",
        "headline": "Grow with Billionply",
        "blocks": [
          {
            "paragraphs": [
              "Tell us about your firm and the brands you carry. Our sales team will call you."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <section className="section pt-0">
        <div className="container-x max-w-4xl">
          <RequestFormSection type="dealer" />
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
