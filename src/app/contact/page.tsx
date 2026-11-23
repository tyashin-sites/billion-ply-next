import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { LeadForm } from '@/components/LeadForm';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const description = `Contact Billionply: call ${siteConfig.contact.phone}, email ${siteConfig.contact.email}, WhatsApp us or send an enquiry. Plant at Bahadurgarh, Haryana.`;

export const metadata = pageMetadata({ title: 'Contact us', description, path: '/contact' });

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <>
      <JsonLd path="/contact" title="Contact us" description={description} breadcrumb={[{ name: 'Contact', path: '/contact' }]} />
      <PageHero eyebrow="Contact" title="Talk to our team" lead="Questions about a product, a quantity or a project? Send an enquiry, call, or message us on WhatsApp." crumbs={[{ name: 'Contact' }]} />
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-6">
            <div className="card p-6">
              <p className="flex items-center gap-3 text-sm font-semibold text-ink"><MapPin className="h-4 w-4 text-leaf" aria-hidden="true" /> Plant and office</p>
              <a href={siteConfig.address.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted-foreground hover:text-ink">{siteConfig.address.oneLine}</a>
            </div>
            <div className="card p-6">
              <p className="flex items-center gap-3 text-sm font-semibold text-ink"><Phone className="h-4 w-4 text-leaf" aria-hidden="true" /> Phone</p>
              <p className="mt-2 text-sm">
                <a href={siteConfig.contact.phoneHref} className="text-muted-foreground hover:text-ink">{siteConfig.contact.phone}</a>
                <br />
                <a href={siteConfig.contact.phone2Href} className="text-muted-foreground hover:text-ink">{siteConfig.contact.phone2}</a>
              </p>
            </div>
            <div className="card p-6">
              <p className="flex items-center gap-3 text-sm font-semibold text-ink"><Mail className="h-4 w-4 text-leaf" aria-hidden="true" /> Email</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-2 block text-sm text-muted-foreground hover:text-ink">{siteConfig.contact.email}</a>
            </div>
            <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'contact-page' }} className="btn-whatsapp w-full">
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </TrackedLink>
            <p className="text-sm text-muted-foreground">
              Dealer or distributor? Use the <Link href="/become-a-dealer" className="font-semibold text-leaf-deep underline">dealer application</Link>. Architect or designer? <Link href="/sample-request" className="font-semibold text-leaf-deep underline">Request samples</Link>.
            </p>
          </div>
          <LeadForm type="enquiry" defaultProduct={product} />
        </div>
      </section>
    </>
  );
}
