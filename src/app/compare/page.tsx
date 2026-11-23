import Link from 'next/link';
import { products } from '@/data/products';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';

const description =
  'Compare Billionply marine plywood, block board, prelam and flexible plywood, decorative veneer and flush doors: water resistance, typical uses, IS standard and sizes.';

export const metadata = pageMetadata({ title: 'Compare products', description, path: '/compare' });

const ASK = <span className="text-muted-foreground">Ask us</span>;

const rows: { label: string; get: (p: (typeof products)[number]) => React.ReactNode }[] = [
  { label: 'Water resistance', get: (p) => p.compare.water ?? ASK },
  { label: 'Typical uses', get: (p) => p.compare.uses },
  { label: 'IS standard', get: (p) => p.compare.standard ?? ASK },
  { label: 'Sizes', get: (p) => p.compare.sizes ?? ASK },
];

export default function ComparePage() {
  return (
    <>
      <JsonLd path="/compare" title="Compare products" description={description} breadcrumb={[{ name: 'Compare products', path: '/compare' }]} />
      <PageHero
        eyebrow="Compare"
        title="Which board does what"
        lead="A side-by-side view of the Billionply range. Where a value is not published yet, ask our team and we will confirm it for your project."
        crumbs={[{ name: 'Compare products' }]}
      >
        <Link href="/product-guide" className="btn-primary">Which product for which job?</Link>
      </PageHero>

      <section className="section">
        <div className="container">
          {/* Desktop / tablet: one table */}
          <div className="hidden overflow-x-auto rounded-lg border bg-white shadow-rest md:block">
            <table className="w-full min-w-[960px] text-left text-sm">
              <caption className="sr-only">Billionply product comparison</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="w-44 px-5 py-4 font-medium text-muted-foreground">Product</th>
                  {products.map((p) => (
                    <th key={p.slug} scope="col" className="px-5 py-4 align-bottom">
                      <Link href={`/products/${p.slug}`} className="font-display text-lg text-ink hover:text-leaf-deep">{p.short}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t align-top">
                    <th scope="row" className="px-5 py-4 font-medium text-muted-foreground">{r.label}</th>
                    {products.map((p) => (
                      <td key={p.slug} className="px-5 py-4 text-ink">{r.get(p)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per product */}
          <div className="grid gap-4 md:hidden">
            {products.map((p) => (
              <div key={p.slug} className="card p-5">
                <Link href={`/products/${p.slug}`} className="font-display text-xl text-ink">{p.short}</Link>
                <dl className="mt-3 divide-y text-sm">
                  {rows.map((r) => (
                    <div key={r.label} className="grid grid-cols-[8rem_1fr] gap-3 py-2.5">
                      <dt className="text-muted-foreground">{r.label}</dt>
                      <dd className="text-ink">{r.get(p)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            All Billionply products are made with 4 Quad Press technology and Italian sanders, to E1 grade, with termite and borer protection.
          </p>
        </div>
      </section>
      <CtaBand location="compare-cta" title="Not sure which board fits?" />
    </>
  );
}
