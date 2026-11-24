import { ProductActions, ProductSpec, RelatedProducts, VeneerRanges } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Decorative Veneer (IS 1328)",
  description: "Billionply decorative veneer to IS 1328: natural, recon, teak, exotic, metallic, open-grain, rustic and dyed, with a 10 ft height option.",
  path: "/products/decorative-veneer",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Decorative Veneer","path":"/products/decorative-veneer"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Decorative Veneer</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "IS 1328 · 10 ft height",
        "headline": "What decorative veneer is",
        "paragraphs": [
          "Crafted from high-quality natural wood, Billionply decorative veneer brings real timber to furniture, walls and doors. Every sheet carries its own grain, so no two designs are alike.",
          "It can be polished, stained or coated to suit the design, and it is light and easy to apply. For grand doors and high walls it comes in an extended 10 ft height."
        ],
        "image": {
          "src": "/images/mood/living-room-2.jpg",
          "alt": "A warm living room with wood-veneered furniture and panelling",
          "brief": "A warm living room with wood-veneered furniture and panelling",
          "aspect": "landscape"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <ProductActions slug="decorative-veneer" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where decorative veneer is used",
        "items": [
          {
            "title": "Furniture",
            "body": "Billionply decorative veneer (IS 1328) for furniture."
          },
          {
            "title": "Wall panelling",
            "body": "Billionply decorative veneer (IS 1328) for wall panelling."
          },
          {
            "title": "Doors, including 10 ft doors",
            "body": "Billionply decorative veneer (IS 1328) for doors, including 10 ft doors."
          },
          {
            "title": "Homes, offices and commercial spaces",
            "body": "Billionply decorative veneer (IS 1328) for homes, offices and commercial spaces."
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="decorative-veneer" />
      <VeneerRanges />
      <RelatedProducts slug="decorative-veneer" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using decorative veneer on a project?",
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
