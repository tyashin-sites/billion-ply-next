import { WoodlarkCard } from '@/components/custom/Product';
import { RangeGroups } from '@/components/custom/Answers';
import { copyMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = copyMetadata('/products');

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Products","path":"/products"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "The range",
        "headline": "Veneers, plywood, block board and flush doors",
        "blocks": [
          {
            "paragraphs": [
              "Veneers for the surface, plywood and boards for the structure, and flush doors. Pick a product for its uses, sizes and standards, or compare them side by side."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <RangeGroups />
      <div className="container-x -mt-8 pb-8">
        <WoodlarkCard location="products" />
      </div>
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
