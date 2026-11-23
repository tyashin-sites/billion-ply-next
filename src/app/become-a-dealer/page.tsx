import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { LeadForm } from '@/components/LeadForm';
import { products } from '@/data/products';

const description =
  'Become a Billion Ply dealer. Join a network of 1000+ dealers across India selling decorative veneer, plywood, block board and flush doors.';

export const metadata = pageMetadata({ title: 'Become a dealer', description, path: '/become-a-dealer' });

export default function BecomeDealerPage() {
  return (
    <>
      <JsonLd path="/become-a-dealer" title="Become a dealer" description={description} breadcrumb={[{ name: 'Become a dealer', path: '/become-a-dealer' }]} />
      <PageHero
        eyebrow="For dealers and distributors"
        title="Become a Billion Ply dealer"
        lead="Join 1000+ dealers across India. Tell us about your firm and our sales team will be in touch."
        crumbs={[{ name: 'Become a dealer' }]}
      />
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display-md">Why stock Billion Ply</h2>
            <ul className="mt-6 space-y-5 text-ink/85">
              <li><strong className="font-semibold text-ink">A legacy since 1997.</strong> Three generations of the Chhabra family behind every board.</li>
              <li><strong className="font-semibold text-ink">A complete range.</strong> {products.map((p) => p.name).join(', ')}.</li>
              <li><strong className="font-semibold text-ink">Made to standard.</strong> IS 1328, IS 710 and IS 1659 products, E1 grade, termite and borer protection.</li>
              <li><strong className="font-semibold text-ink">10 ft sizes.</strong> In decorative veneer, marine plywood, block board and flush doors.</li>
            </ul>
          </div>
          <LeadForm type="dealer" />
        </div>
      </section>
    </>
  );
}
