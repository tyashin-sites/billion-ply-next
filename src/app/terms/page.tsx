import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for the Billionply website, run by Jai Shiv Plywood Pvt. Ltd. Product details, catalogues, downloads and links to other sites.",
  path: "/terms",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Terms","path":"/terms"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "headline": "Terms of use",
        "intro": "These terms cover your use of this website, run by Jai Shiv Plywood Pvt. Ltd. (Billionply).",
        "blocks": [
          {
            "heading": "Product information",
            "paragraphs": [
              "We describe our products as accurately as we can. Sizes, finishes and availability can vary, so confirm the details with us or your dealer before you order."
            ]
          },
          {
            "heading": "Catalogues and images",
            "paragraphs": [
              "Catalogues and photos on this site belong to Billionply. You may download and share them to choose or specify our products."
            ]
          },
          {
            "heading": "Other websites",
            "paragraphs": [
              "Links to other sites, such as woodlarkveneer.com, are for your convenience. We are not responsible for their content."
            ]
          },
          {
            "heading": "Contact",
            "paragraphs": [
              "Questions about these terms: sales@billionply.com."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
