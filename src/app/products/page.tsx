import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { products } from '@/data/products';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { TrackedLink } from '@/components/TrackedLink';
import { CtaBand } from '@/components/CtaBand';

const description =
  'The Billionply range: decorative veneer (IS 1328), marine plywood (IS 710), block board (IS 1659), prelam plywood, flexible plywood and flush doors.';

export const metadata = pageMetadata({ title: 'Products', description, path: '/products' });

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        path="/products"
        title="Products"
        description={description}
        breadcrumb={[{ name: 'Products', path: '/products' }]}
        itemList={products.map((p) => ({ name: p.name, path: `/products/${p.slug}` }))}
      />
      <PageHero
        eyebrow="Our products"
        title="High-performance wood for interiors and furniture"
        lead="Six products made at our Bahadurgarh plant with 4 Quad Press technology and Italian sanders, E1 grade and termite and borer protection."
        crumbs={[{ name: 'Products' }]}
      >
        <Link href="/compare" className="btn-primary">Compare products</Link>
        <Link href="/product-guide" className="btn-ghost">Which product for which job?</Link>
      </PageHero>
      <section className="section">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <ProductCard product={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
        <div className="container mt-10">
          <TrackedLink
            href={siteConfig.woodlark.url}
            external
            event="woodlark_click"
            props={{ brand: 'woodlark', location: 'products-index' }}
            className="card card-hover flex flex-wrap items-center justify-between gap-4 p-6"
          >
            <span>
              <span className="block font-display text-xl text-ink">Premium Hybrid Veneer by Woodlark</span>
              <span className="mt-1 block text-sm text-muted-foreground">Explore the range at woodlarkveneer.com.</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">woodlarkveneer.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </TrackedLink>
        </div>
      </section>
      <CtaBand location="products-cta" />
    </>
  );
}
