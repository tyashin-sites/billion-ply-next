import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProduct, useGroups } from '@/data/products';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';

const description =
  'Which Billion Ply product for which job: interiors, doors, heavy-duty furniture and wet or harsh areas like kitchens, bathrooms and coastal homes.';

export const metadata = pageMetadata({ title: 'Which product for which job', description, path: '/product-guide' });

export default function ProductGuidePage() {
  return (
    <>
      <JsonLd path="/product-guide" title="Which product for which job" description={description} breadcrumb={[{ name: 'Product guide', path: '/product-guide' }]} />
      <PageHero
        eyebrow="Product guide"
        title="Which product for which job"
        lead="Start from what you are building. Each group lists the Billion Ply products that suit it, and why."
        crumbs={[{ name: 'Product guide' }]}
      >
        {useGroups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="btn-ghost !py-2">{g.title}</a>
        ))}
      </PageHero>
      <div className="container py-8 md:py-12">
        {useGroups.map((g, gi) => (
          <section key={g.id} id={g.id} className="scroll-mt-28 border-b py-12 last:border-b-0 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="font-display text-oak-deep">0{gi + 1}</span>
                <h2 className="display-lg mt-2">{g.title}</h2>
                <p className="lead mt-4">{g.lead}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {Object.entries(g.why).map(([slug, why], i) => {
                  const p = getProduct(slug);
                  if (!p) return null;
                  return (
                    <Reveal as="li" key={slug} delay={i * 70}>
                      <Link href={`/products/${p.slug}`} className="card card-hover group flex h-full gap-4 overflow-hidden p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt="" loading="lazy" className="h-24 w-24 shrink-0 rounded-md object-cover" />
                        <div>
                          <p className="font-display text-lg text-ink">{p.name}</p>
                          {p.standard && <p className="text-xs text-muted-foreground">{p.standard}</p>}
                          <p className="mt-1.5 text-sm text-muted-foreground">{why}</p>
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-leaf-deep">
                            View <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
        <p className="py-6 text-center">
          <Link href="/compare" className="btn-ghost">See the full comparison table</Link>
        </p>
      </div>
      <CtaBand location="guide-cta" title="Tell us about the job" />
    </>
  );
}
