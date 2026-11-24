import { ProductGrid } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Plywood, Veneer and Flush Doors",
  description: "The Billionply range: decorative veneer (IS 1328), marine plywood (IS 710), block board (IS 1659), prelam and flexible plywood, and flush doors.",
  path: "/products",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Products","path":"/products"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "The range",
        "headline": "Six products, one standard of care",
        "blocks": [
          {
            "paragraphs": [
              "Decorative veneer, plywood, block board and flush doors for interiors, furniture and doors, from a family in plywood and veneer since 1997."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <ProductGrid />
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
