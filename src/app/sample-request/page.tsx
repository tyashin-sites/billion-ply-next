import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { LeadForm } from '@/components/LeadForm';
import { CatalogueButton } from '@/components/CatalogueButton';

const description =
  'Architects and interior designers: request Billionply samples of decorative veneer, prelam, plywood, block board and flush doors for your project.';

export const metadata = pageMetadata({ title: 'Request samples', description, path: '/sample-request' });

export default async function SampleRequestPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <>
      <JsonLd path="/sample-request" title="Request samples" description={description} breadcrumb={[{ name: 'Request samples', path: '/sample-request' }]} />
      <PageHero
        eyebrow="For architects and designers"
        title="Request samples"
        lead="See and feel the grain before you specify. Pick the products you need and where to send them."
        crumbs={[{ name: 'Request samples' }]}
      >
        <CatalogueButton catalogue="natural" location="sample-request" label="Download veneer catalogue" variant="ghost" />
      </PageHero>
      <section className="section">
        <div className="container max-w-4xl">
          <LeadForm type="sample" defaultProduct={product} />
        </div>
      </section>
    </>
  );
}
