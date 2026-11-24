import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Prose } from '@/components/kit';
import type { ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Billionply (Jai Shiv Plywood Pvt. Ltd.) handles information sent through this website: enquiries, dealer applications and sample requests.",
  path: "/privacy",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Privacy","path":"/privacy"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "headline": "Privacy policy",
        "intro": "This website is run by Jai Shiv Plywood Pvt. Ltd. (Billionply), 32 K.M. Stone, Delhi-Rohtak Road, Village Rohad, Bahadurgarh, Haryana 124507.",
        "blocks": [
          {
            "heading": "What we collect",
            "paragraphs": [
              "When you send an enquiry, a dealer application or a sample request, we receive the details you type into the form: your name, phone, email, city, firm and message. We use them only to reply to you."
            ]
          },
          {
            "heading": "Where it is stored",
            "paragraphs": [
              "The site is hosted by Tyashin. Messages sent through our forms are stored by us via Tyashin so we can reply to your enquiry. We do not sell or share them."
            ]
          },
          {
            "heading": "Analytics",
            "paragraphs": [
              "We use privacy-respecting analytics to count visits and downloads. It does not use advertising cookies."
            ]
          },
          {
            "heading": "Your choices",
            "paragraphs": [
              "To see, correct or delete what you sent us, email sales@billionply.com."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
    </>
  );
}
