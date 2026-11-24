import { CaseStudies, PlantGallery } from '@/components/custom/Company';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Projects and Plant Gallery",
  description: "Billionply projects and gallery: 500+ completed projects, and a look inside our plant and warehouse in Bahadurgarh, Haryana.",
  path: "/projects",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Projects","path":"/projects"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "500+ completed projects",
        "headline": "From our plant to your interiors",
        "blocks": [
          {
            "paragraphs": [
              "A look at Billionply boards and the people who make them."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <CaseStudies />
      <PlantGallery />
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
