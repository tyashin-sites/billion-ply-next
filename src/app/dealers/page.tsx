import Link from 'next/link';
import rawDealers from '@/data/dealers.json';
import { validDealers } from '@/lib/dealer-search';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { DealerLocator } from '@/components/DealerLocator';

const description =
  'Find a Billionply dealer near you. Search by city, pincode or state, or contact us and we will connect you with your nearest dealer.';

export const metadata = pageMetadata({ title: 'Find a dealer', description, path: '/dealers' });

export default function DealersPage() {
  const dealers = validDealers(rawDealers);
  return (
    <>
      <JsonLd path="/dealers" title="Find a dealer" description={description} breadcrumb={[{ name: 'Find a dealer', path: '/dealers' }]} />
      <PageHero
        eyebrow="1000+ dealers across India"
        title="Find a Billionply dealer"
        lead="For interior designers, contractors and homeowners: find the dealer who serves your city."
        crumbs={[{ name: 'Find a dealer' }]}
      />
      <section className="section">
        <div className="container">
          <DealerLocator dealers={dealers} />
          <p className="mt-12 text-center text-sm text-muted-foreground">
            Are you a dealer or distributor? <Link href="/become-a-dealer" className="font-semibold text-leaf-deep underline">Apply to become a Billionply dealer</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
