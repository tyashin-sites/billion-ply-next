import { ArrowUpRight, FileText } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { catalogueList } from '@/data/catalogues';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { CatalogueButton } from '@/components/CatalogueButton';
import { TrackedLink } from '@/components/TrackedLink';
import { CtaBand } from '@/components/CtaBand';

const description = 'Download Billion Ply catalogues: the natural veneer catalogue and the recon veneer catalogue (PDF).';

export const metadata = pageMetadata({ title: 'Catalogues', description, path: '/catalogues' });

export default function CataloguesPage() {
  return (
    <>
      <JsonLd path="/catalogues" title="Catalogues" description={description} breadcrumb={[{ name: 'Catalogues', path: '/catalogues' }]} />
      <PageHero eyebrow="Downloads" title="Catalogues" lead="Browse the full veneer collections offline, or share them with your client." crumbs={[{ name: 'Catalogues' }]} />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalogueList.map((c) => (
            <div key={c.key} className="card flex flex-col p-7">
              <FileText className="h-8 w-8 text-oak" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl">{c.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
              <p className="mt-4 text-xs text-muted-foreground">{c.sizeLabel}</p>
              <div className="mt-5">
                <CatalogueButton catalogue={c.key} location="catalogues-page" label="Download" />
              </div>
            </div>
          ))}
          <TrackedLink
            href={siteConfig.sisterBrand.url}
            external
            event="sister_brand_click"
            props={{ brand: 'woodlark', location: 'catalogues-page' }}
            className="card card-hover flex flex-col bg-ink p-7 text-white"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-tint">Sister brand</span>
            <span className="mt-4 font-display text-2xl">Premium Hybrid Veneer by Woodlark</span>
            <span className="mt-2 flex-1 text-sm text-white/70">The hybrid veneer catalogue now lives on the Woodlark site.</span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">Visit woodlarkveneer.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </TrackedLink>
        </div>
      </section>
      <CtaBand location="catalogues-cta" />
    </>
  );
}
