import { ProductActions, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Flush Doors",
  description: "Billionply flush doors: solid core with sound insulation, resist warping, cracking and swelling. Smooth face ready for paint or polish, in a 10 ft size.",
  path: "/products/flush-door",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Flush Door","path":"/products/flush-door"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Flush Doors</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "Solid core · 10 ft size",
        "headline": "What flush door is",
        "paragraphs": [
          "Billionply flush doors are made with precision from high-quality materials for a solid, smooth surface that looks good and lasts.",
          "They resist warping, cracking and swelling from changes in humidity. The solid core gives sound insulation, and the face is ready for paint or polish."
        ],
        "image": {
          "src": "/images/products/flush-door.jpg",
          "alt": "A Billionply flush door with a smooth wood face",
          "brief": "A Billionply flush door with a smooth wood face",
          "aspect": "portrait"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <ProductActions slug="flush-door" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where flush door is used",
        "items": [
          {
            "title": "Homes",
            "body": "Billionply flush door for homes."
          },
          {
            "title": "Offices",
            "body": "Billionply flush door for offices."
          },
          {
            "title": "Commercial spaces",
            "body": "Billionply flush door for commercial spaces."
          },
          {
            "title": "Large 10 ft door frames",
            "body": "Billionply flush door for large 10 ft door frames."
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="flush-door" />
      <RelatedProducts slug="flush-door" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using flush door on a project?",
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
