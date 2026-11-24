import { ProductActions, ProductHero, ProductSpec, RelatedProducts } from '@/components/custom/Product';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd, productLd } from '@/lib/schema';
import { getProduct } from '@/data/products';
import { SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: "Block Board (IS 1659)",
  description: "Billionply block board to IS 1659: strong, moisture-resistant and dimensionally stable for furniture, doors, partitions and panelling. 10 ft sizes.",
  path: "/products/block-board",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Block Board","path":"/products/block-board"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS), productLd({ name: `Billionply ${getProduct("block-board")!.name}`, description: getProduct("block-board")!.metaDescription, path: "/products/block-board", images: [`${SITE_URL}${getProduct("block-board")!.image}`] })]} />
      <Breadcrumbs items={CRUMBS} />
      <ProductHero slug="block-board" title="Block Board" eyebrow="IS 1659 · 10 ft sizes" />
      <Story {...({
        "variant": "stacked",
        "headline": "What block board is",
        "paragraphs": [
          "Billionply block board is made for strength and stability, a natural choice for furniture, doors, partitions and panelling.",
          "It is moisture-resistant and dimensionally stable, with a smooth surface that is easy to work. 10 ft sizes keep joints to a minimum on long runs."
        ],
        "eyebrow": "What it is"
      } satisfies StoryProps)} />
      <ProductActions slug="block-board" />
      <Features {...({
        "variant": "list",
        "eyebrow": "Where it is used",
        "headline": "Where block board is used",
        "items": [
          {
            "title": "Heavy-duty furniture"
          },
          {
            "title": "Doors"
          },
          {
            "title": "Partitions"
          },
          {
            "title": "Panelling"
          }
        ]
      } satisfies FeaturesProps)} />
      <ProductSpec slug="block-board" />
      <RelatedProducts slug="block-board" />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Using block board on a project?",
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
