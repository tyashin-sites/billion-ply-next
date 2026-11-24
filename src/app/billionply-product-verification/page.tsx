import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, JsonLd } from '@/components/kit';
import { organizationLd, websiteLd } from '@/lib/schema';
import { WHATSAPP_URL } from '@/config/site';

/**
 * Product verification landing — SAME URL as on the old WordPress site
 * (billionply.com/billionply-product-verification/). The QR codes printed on
 * Billionply boards point here, so this path must keep answering with the
 * verification message; never redirect or remove it. Copy from the old page
 * (2026-04 version), with "29+ years" replaced by "since 1997" (brief rule).
 * Not in the sitemap and noindex: it is a scan target, not a search page.
 */
const META = pageMetadata({
  title: 'Billionply Product Verification',
  description:
    'This product has been verified as an original Billionply product. Genuine plywood, veneer and flush doors from Jai Shiv Plywood Pvt. Ltd., since 1997.',
  path: '/billionply-product-verification',
});

export const metadata: Metadata = { ...META, robots: { index: false, follow: true } };

const TRUST = [
  'You are using a genuine Billionply product',
  'The product meets strict quality and manufacturing standards',
  'Crafted using premium raw materials and advanced technology',
  'Protection against duplicate and counterfeit products',
];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd('Organization'), websiteLd()]} />
      <section className="section">
        <div className="container-x max-w-3xl text-center">
          <BadgeCheck className="text-primary mx-auto h-16 w-16" aria-hidden />
          <p className="eyebrow eyebrow-center mt-6">Thank you for choosing Billionply</p>
          <h1 className="tt-1">Billionply Product Verification</h1>
          <p className="lead mx-auto mt-6">
            This product has been successfully verified as an original Billionply product. It reflects our commitment
            to quality, consistency and reliability in every sheet we make.
          </p>
          <p className="text-muted mx-auto mt-4 max-w-2xl">
            At Billionply, authenticity is not just a promise. It is a standard we keep across every product that
            reaches you.
          </p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="tt-2">Your trust, our responsibility</h2>
            <ul className="mt-6 space-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex gap-3">
                  <BadgeCheck className="text-primary mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="tt-2">Why Billionply</h2>
            <p className="text-muted mt-6">
              In the industry since 1997, Billionply has built a reputation for products that professionals trust and
              recommend: consistent quality, long-lasting performance and reliable supply across India.
            </p>
            <p className="text-muted mt-4">
              We keep investing in technology and process so every board meets the same standard. Billionply, a
              legacy of strength since 1997.
            </p>
            <p className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary">See the range</Link>
              <Link href="/dealers" className="btn btn-ghost">Find a dealer</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Questions about your product?"
        headline="Talk to Billionply"
        body="If anything about your board looks wrong, tell us. We reply on WhatsApp, phone and email."
        primaryCta={{ label: 'Send an enquiry', href: '/contact' }}
        {...(WHATSAPP_URL ? { secondaryCta: { label: 'Chat on WhatsApp', href: WHATSAPP_URL } } : {})}
      />
    </>
  );
}
