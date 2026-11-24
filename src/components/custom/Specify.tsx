import Link from 'next/link';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { BRAND } from '@/config/site';
import { getProduct, products, useGroups } from '@/data/products';
import { catalogueList } from '@/data/catalogues';
import { TrackedLink } from './TrackedLink';

const ASK = <span className="text-muted">Ask us</span>;

/** Water resistance, uses, IS standard and sizes for the whole range. "Ask us" where unpublished. */
export function CompareTable() {
  const rows: { label: string; get: (p: (typeof products)[number]) => React.ReactNode }[] = [
    { label: 'Water resistance', get: (p) => p.compare.water ?? ASK },
    { label: 'Typical uses', get: (p) => p.compare.uses },
    { label: 'IS standard', get: (p) => p.compare.standard ?? ASK },
    { label: 'Sizes', get: (p) => p.compare.sizes ?? ASK },
  ];
  return (
    <section className="section">
      <div className="container-x">
        <div className="border-border hidden overflow-x-auto rounded-lg border md:block">
          <table className="w-full min-w-[960px] text-left text-[15px]">
            <caption className="sr-only">Billionply product comparison</caption>
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="text-muted w-40 px-5 py-4 font-medium">Product</th>
                {products.map((p) => (
                  <th key={p.slug} scope="col" className="px-5 py-4 align-bottom">
                    <Link href={`/products/${p.slug}`} className="font-heading hover:text-primary text-lg">{p.short}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {rows.map((r) => (
                <tr key={r.label} className="align-top">
                  <th scope="row" className="text-muted px-5 py-4 font-medium">{r.label}</th>
                  {products.map((p) => (
                    <td key={p.slug} className="px-5 py-4">{r.get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="grid gap-4 md:hidden">
          {products.map((p) => (
            <li key={p.slug} className="card p-5">
              <Link href={`/products/${p.slug}`} className="font-heading text-xl">{p.short}</Link>
              <dl className="divide-border mt-3 divide-y text-sm">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
                    <dt className="text-muted">{r.label}</dt>
                    <dd>{r.get(p)}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Which product for which job", grouped by use as the owner's 2027 plan asks. */
export function ProductGuide() {
  return (
    <section className="section">
      <div className="container-x">
        <nav aria-label="Jump to a job" className="mb-4 flex flex-wrap gap-2">
          {useGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="btn btn-ghost">{g.title}</a>
          ))}
        </nav>
        {useGroups.map((g, gi) => (
          <div key={g.id} id={g.id} className="border-border grid scroll-mt-28 gap-8 border-b py-12 last:border-b-0 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">0{gi + 1}</p>
              <h2 className="tt-2">{g.title}</h2>
              <p className="lead mt-4">{g.lead}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8" data-fx="stagger">
              {Object.entries(g.why ?? {}).map(([slug, why]) => {
                const p = getProduct(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <Link href={`/products/${p.slug}`} className="card flex h-full gap-4 overflow-hidden p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt="" width={96} height={96} loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-md object-cover" />
                      <span>
                        <span className="font-heading block text-lg">{p.name}</span>
                        {p.standard ? <span className="text-muted block text-xs">{p.standard}</span> : null}
                        <span className="text-muted mt-1.5 block text-sm">{why}</span>
                        <span className="text-primary mt-2 inline-flex items-center gap-1 text-xs font-semibold">
                          View <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <p className="py-6 text-center">
          <Link href="/compare" className="btn btn-ghost">See the full comparison table</Link>
        </p>
      </div>
    </section>
  );
}

export function CatalogueList() {
  return (
    <section className="section">
      <ul className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-fx="stagger">
        {catalogueList.map((c) => (
          <li key={c.key} className="card flex flex-col p-7">
            <FileText className="text-accent h-8 w-8" aria-hidden />
            <h2 className="tt-3 mt-5">{c.title}</h2>
            <p className="text-muted mt-2 flex-1 text-[15px]">{c.description}</p>
            <p className="text-muted mt-4 text-xs">{c.sizeLabel}</p>
            <TrackedLink href={c.href} event="catalogue_download" props={{ catalogue: c.key, location: 'catalogues-page' }} className="btn btn-primary mt-5 justify-self-start">
              <Download className="h-4 w-4" aria-hidden /> Download
            </TrackedLink>
          </li>
        ))}
        <li className="card ink on-dark flex flex-col p-7">
          <TrackedLink href={BRAND.woodlark.url} event="woodlark_click" props={{ location: 'catalogues-page' }} className="flex h-full flex-col">
            <span className="tt-3">Premium Hybrid Veneer by Woodlark</span>
            <span className="text-paper/75 mt-2 flex-1 text-[15px]">The hybrid veneer catalogue is on the Woodlark site.</span>
            <span className="mt-5 text-sm font-semibold">Visit woodlarkveneer.com</span>
          </TrackedLink>
        </li>
      </ul>
    </section>
  );
}
