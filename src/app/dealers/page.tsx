import Link from 'next/link';
import { DealerLocator } from '@/components/custom/DealerLocator';
import { TEL_URL, WHATSAPP_URL, siteConfig } from '@/config/site';
import { validDealers } from '@/lib/dealer-search';
import rawDealers from '@/data/dealers.json';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, JsonLd, Prose } from '@/components/kit';
import type { CtaBandProps, ProseProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "Find a Billionply Dealer",
  description: "Find a Billionply dealer near you. Search by city, pincode or state, or contact us and we will connect you with your nearest dealer.",
  path: "/dealers",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"Dealers","path":"/dealers"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <Prose {...({
        "eyebrow": "1000+ dealers across India",
        "headline": "Search by city or state",
        "blocks": [
          {
            "paragraphs": [
              "For interior designers, contractors and homeowners: find the dealer who serves your city."
            ]
          }
        ],
        "headingLevel": "h1"
      } satisfies ProseProps)} />
      <section className="section pt-0">
        <div className="container-x">
          <DealerLocator dealers={validDealers(rawDealers)} whatsappUrl={WHATSAPP_URL} telUrl={TEL_URL} phoneDisplay={siteConfig.contact.phoneDisplay} />
          <p className="text-muted mt-12 text-center text-sm">
            Are you a dealer or distributor? <Link href="/become-a-dealer" className="text-primary underline underline-offset-4">Apply to become a Billionply dealer</Link>.
          </p>
        </div>
      </section>
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
