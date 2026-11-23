import Link from 'next/link';
import { certifications } from '@/data/company';
import { manufacturing, products } from '@/data/products';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';

const description =
  'Billion Ply standards and certifications: decorative veneer to IS 1328, marine plywood to IS 710, block board to IS 1659, E1 grade, termite and borer protection.';

export const metadata = pageMetadata({ title: 'Certifications and standards', description, path: '/certifications' });

export default function CertificationsPage() {
  const standardProducts = products.filter((p) => p.standard);
  return (
    <>
      <JsonLd path="/certifications" title="Certifications and standards" description={description} breadcrumb={[{ name: 'Certifications', path: '/certifications' }]} />
      <PageHero
        eyebrow="Quality"
        title="Certifications and standards"
        lead="The Indian Standards our products are made to, and how we make them."
        crumbs={[{ name: 'Certifications' }]}
      />
      <section className="section">
        <div className="container">
          <h2 className="display-md">Indian Standards (BIS)</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {standardProducts.map((p) => {
              const lic = certifications.find((c) => c.standard === p.standard);
              return (
                <div key={p.slug} className="card flex flex-col p-7">
                  <p className="font-display text-4xl text-ink">{p.standard}</p>
                  <Link href={`/products/${p.slug}`} className="mt-2 font-semibold text-leaf-deep">{p.name}</Link>
                  {lic?.licenceNumber && <p className="mt-4 text-sm text-ink">Licence no. <strong>{lic.licenceNumber}</strong></p>}
                  {lic?.validUntil && <p className="mt-1 text-sm text-muted-foreground">Valid until {lic.validUntil}</p>}
                  {lic?.image && (
                    <a href={lic.image} target="_blank" rel="noopener noreferrer" className="mt-5 block overflow-hidden rounded-md border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={lic.image} alt={`${p.standard} certificate`} loading="lazy" className="w-full" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {certifications.filter((c) => !standardProducts.some((p) => p.standard === c.standard)).length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {certifications
                .filter((c) => !standardProducts.some((p) => p.standard === c.standard))
                .map((c) => (
                  <div key={c.title} className="card p-7">
                    <p className="font-display text-2xl">{c.title}</p>
                    {c.licenceNumber && <p className="mt-2 text-sm">Licence no. <strong>{c.licenceNumber}</strong></p>}
                    {c.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.image} alt={`${c.title} certificate`} loading="lazy" className="mt-4 w-full rounded-md border" />
                    )}
                  </div>
                ))}
            </div>
          )}

          <h2 className="display-md mt-20">How we make it</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {manufacturing.map((m) => (
              <div key={m.title} className="card p-6">
                <span className="block h-px w-10 bg-gradient-to-r from-oak to-leaf" aria-hidden="true" />
                <h3 className="mt-5 text-xl">{m.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Need copies of certificates for a tender or specification? <Link href="/contact" className="font-semibold text-leaf-deep underline">Ask our team</Link>.
          </p>
        </div>
      </section>
      <CtaBand location="certifications-cta" />
    </>
  );
}
