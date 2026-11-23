import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getProduct, manufacturing, prelamFinishes, products, veneerFinishes, veneerRanges } from '@/data/products';
import { catalogues } from '@/data/catalogues';
import { certifications } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { productStaticParams } from '@/lib/site-routes';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { CatalogueButton } from '@/components/CatalogueButton';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { CtaBand } from '@/components/CtaBand';

export const dynamicParams = false;

export function generateStaticParams() {
  return productStaticParams();
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.standard ? `${p.name} (${p.standard})` : p.name,
    description: p.metaDescription,
    path: `/products/${p.slug}`,
    image: p.image,
  });
}

const STANDARD_TEXT: Record<string, string> = {
  'IS 1328': 'IS 1328 is the Indian Standard for veneered decorative plywood.',
  'IS 710': 'IS 710 is the Indian Standard for marine plywood.',
  'IS 1659': 'IS 1659 is the Indian Standard for block boards.',
};

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const spec = p.spec.filter((s) => s.value);
  const licence = p.standard ? certifications.find((c) => c.standard === p.standard) : undefined;
  const related = products.filter((x) => x.slug !== p.slug && x.useGroups.some((g) => p.useGroups.includes(g))).slice(0, 3);
  const isVeneer = p.slug === 'decorative-veneer';

  return (
    <>
      <JsonLd
        path={`/products/${p.slug}`}
        title={p.name}
        description={p.metaDescription}
        breadcrumb={[
          { name: 'Products', path: '/products' },
          { name: p.name, path: `/products/${p.slug}` },
        ]}
        product={p}
      />

      <PageHero
        eyebrow={p.standard ? `${p.standard}${p.tenFoot ? ' · 10 ft sizes' : ''}` : p.tenFoot ? '10 ft sizes' : 'Billionply'}
        title={p.name}
        lead={<p>{p.cardLine}</p>}
        crumbs={[{ name: 'Products', href: '/products' }, { name: p.name }]}
        image={p.heroImage ?? p.image}
        imageAlt={p.heroImage ? p.heroImageAlt : p.imageAlt}
      >
        <Link href={`/contact?product=${p.slug}`} className="btn-primary">Enquire</Link>
        {p.catalogue && <CatalogueButton catalogue={p.catalogue} location={`product-${p.slug}-hero`} label="Download catalogue" variant="ghost" />}
        <Link href={`/sample-request?product=${p.slug}`} className="btn-ghost">Request a sample</Link>
        <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: `product-${p.slug}` }} className="btn-whatsapp">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </TrackedLink>
      </PageHero>

      {/* WHAT IT IS / WHERE USED / FEATURES */}
      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow">What it is</p>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/85">
              {p.intro.map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
            <h2 className="display-md mt-14">Where it is used</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.uses.map((u) => (
                <li key={u} className="rounded-full border bg-white px-4 py-2 text-sm text-ink">{u}</li>
              ))}
            </ul>
            {p.heroImage && (
              <figure className="mt-12 overflow-hidden rounded-lg border bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.imageAlt} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              </figure>
            )}
          </div>
          <aside className="card h-fit p-7">
            <h2 className="font-display text-2xl">Features</h2>
            <ul className="mt-5 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <div className="grain-rule my-6" />
            <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">
              Compare with other products <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* DECORATIVE VENEER: RANGES */}
      {isVeneer && (
        <section className="section border-t bg-white">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Sub-ranges</p>
                <h2 className="display-lg mt-4">Solutions for every corner</h2>
              </div>
              <CatalogueButton catalogue="natural" location="veneer-ranges" label="Download catalogue" />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {veneerRanges.map((v, i) => {
                const cat = v.catalogue ? catalogues[v.catalogue] : undefined;
                return (
                  <Reveal key={v.slug} delay={(i % 4) * 70} className="card group overflow-hidden" >
                    <div id={v.slug} className="scroll-mt-28">
                      <div className="aspect-[4/3] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={v.image} alt={`${v.name} swatch`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl">{v.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{v.blurb}</p>
                        {cat && (
                          <TrackedLink
                            href={cat.href}
                            external
                            event="catalogue_download"
                            props={{ catalogue: cat.key, location: `veneer-range-${v.slug}` }}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep"
                          >
                            <Download className="h-4 w-4" aria-hidden="true" /> {cat.title}
                          </TrackedLink>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={210}>
                <TrackedLink
                  href={siteConfig.woodlark.url}
                  external
                  event="woodlark_click"
                  props={{ brand: 'woodlark', location: 'veneer-ranges' }}
                  className="card card-hover group flex h-full flex-col overflow-hidden bg-ink text-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/veneers/hybrid-woodlark.jpg" alt="Hybrid veneer swatch" loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl text-white">Premium Hybrid Veneer by Woodlark</h3>
                    <p className="mt-2 flex-1 text-sm text-white/70">Explore the range at woodlarkveneer.com.</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                      Visit woodlarkveneer.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </TrackedLink>
              </Reveal>
            </div>
            <div className="mt-12">
              <h3 className="text-xl">More finishes</h3>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {veneerFinishes.map((f) => (
                  <figure key={f.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.image} alt={`${f.name} by Billionply`} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
                    <figcaption className="mt-2 text-sm text-muted-foreground">{f.name}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRELAM FINISHES */}
      {p.slug === 'prelam-plywood' && (
        <section className="section border-t bg-white">
          <div className="container">
            <p className="eyebrow">Finishes</p>
            <h2 className="display-lg mt-4">Colours, textures and finishes</h2>
            <p className="lead mt-4 max-w-2xl">A selection of prelam finishes. Ask for samples of the full range.</p>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
              {prelamFinishes.map((f) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={f.image} src={f.image} alt={f.alt} loading="lazy" className="aspect-square w-full rounded-md object-cover shadow-rest" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECHNICAL SPECIFICATION */}
      <section className="section border-t">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">For architects and project teams</p>
            <h2 className="display-lg mt-4">Technical specification</h2>
            <table className="spec-table mt-8 w-full">
              <tbody>
                {spec.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td>{s.value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Emission grade</th>
                  <td>E1</td>
                </tr>
                <tr>
                  <th scope="row">Protection</th>
                  <td>Termite and borer protection</td>
                </tr>
                <tr>
                  <th scope="row">Pressing and finishing</th>
                  <td>4 Quad Press technology, Italian sanders</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-6 text-sm text-muted-foreground">
              Need thicknesses, sizes or a spec sheet for a tender?{' '}
              <Link href={`/contact?product=${p.slug}`} className="font-semibold text-leaf-deep underline">Ask our team</Link>.
            </p>
          </div>

          <div className="grid h-fit gap-5">
            {p.standard && (
              <div className="card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oak-deep">BIS / Indian Standard</p>
                <p className="mt-3 font-display text-4xl text-ink">{p.standard}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {STANDARD_TEXT[p.standard]} Billionply {p.name.toLowerCase()} is made to {p.standard}.
                </p>
                {licence?.licenceNumber && (
                  <p className="mt-3 text-sm text-ink">
                    BIS licence: <strong>{licence.licenceNumber}</strong>
                  </p>
                )}
                <Link href="/certifications" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">
                  Certifications <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
            <div className="card p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oak-deep">How it is made</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {manufacturing.map((m) => (
                  <li key={m.title}>
                    <p className="font-semibold text-ink">{m.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
                  </li>
                ))}
                {p.tenFoot && (
                  <li>
                    <p className="font-semibold text-ink">10 ft sizes</p>
                    <p className="mt-1 text-sm text-muted-foreground">For tall doors and high walls with fewer joints.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section border-t bg-paper">
          <div className="container">
            <h2 className="display-md">Often specified with</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand location={`product-${p.slug}-cta`} title={`Using ${p.name.toLowerCase()} on a project?`} />
    </>
  );
}
