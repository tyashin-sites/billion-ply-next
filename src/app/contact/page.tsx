import { copyMetadata } from '@/lib/seo';
import { Breadcrumbs, Contact, CtaBand, JsonLd } from '@/components/kit';
import type { ContactProps, CtaBandProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = copyMetadata('/contact');

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Contact","path":"/contact"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("LocalBusiness"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Contact {...({
        "eyebrow": "Contact",
        "headline": "Contact Billionply",
        "body": "Questions about a product, a quantity or a project? Send an enquiry, call, or message us on WhatsApp.",
        "showMap": true,
        "form": true,
        "headingLevel": "h1"
      } satisfies ContactProps)} />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Prefer WhatsApp?",
        "body": "Message us and we reply during working hours.",
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
