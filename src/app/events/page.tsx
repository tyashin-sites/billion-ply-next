import { EventGallery } from '@/components/custom/Company';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Events: Billionply at Matecia 2025",
  description: "Billionply at Matecia 2025: photos of our stand and team. Meet the people behind the boards at trade shows and exhibitions across India.",
  path: "/events",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Events","path":"/events"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "Events",
        "headline": "Matecia 2025",
        "blocks": [
          {
            "paragraphs": [
              "The Billionply stand and team at Matecia 2025."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <EventGallery />
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
