import Link from 'next/link';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { BRAND, WHATSAPP_URL } from '@/config/site';
import {
  getProduct,
  prelamFinishes,
  products,
  veneerFinishes,
  veneerRanges,
  type Product,
} from '@/data/products';
import { catalogues } from '@/data/catalogues';
import { PAGE_COPY, PRODUCT_ANSWERS } from '@/data/seo-content';
import { certifications } from '@/data/company';
import { Hero, SectionHeading } from '@/components/kit';
import { TrackedLink } from './TrackedLink';

const STANDARD_TEXT: Record<string, string> = {
  'IS 1328': 'IS 1328 is the Indian Standard for veneered decorative plywood.',
  'IS 710': 'IS 710 is the Indian Standard for marine plywood.',
  'IS 1659': 'IS 1659 is the Indian Standard for block boards.',
};

/** The enquiry / sample / catalogue / WhatsApp actions under a product's intro. */
export function ProductActions({ slug }: { slug: string }) {
  const p = getProduct(slug);
  if (!p) return null;
  const cat = p.catalogue ? catalogues[p.catalogue] : undefined;
  return (
    <section className="pb-4 pt-2">
      <div className="container-x flex flex-wrap gap-3" data-fx="rise">
        <Link href="/contact" className="btn btn-primary">Enquire about {p.name.toLowerCase()}</Link>
        <Link href="/sample-request" className="btn btn-ghost">Request a sample</Link>
        {cat ? (
          <TrackedLink href={cat.href} event="catalogue_download" props={{ catalogue: cat.key, location: `product-${slug}` }} className="btn btn-ghost">
            <Download className="h-4 w-4" aria-hidden /> Download catalogue
          </TrackedLink>
        ) : null}
        {WHATSAPP_URL ? (
          <TrackedLink href={WHATSAPP_URL} event="whatsapp_click" props={{ location: `product-${slug}` }} className="btn btn-ghost">
            WhatsApp
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}

/** Features + technical spec + BIS block + how it is made. Empty spec fields stay hidden. */
export function ProductSpec({ slug }: { slug: string }) {
  const p = getProduct(slug);
  if (!p) return null;
  const rows = (p.spec ?? []).filter((s) => s.value);
  const licence = p.standard ? certifications.find((c) => c.standard === p.standard) : undefined;
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="For architects and project teams" title="Technical specification" />
          <table className="mt-8 w-full text-[15px]">
            <tbody className="divide-border divide-y">
              {rows.map((s) => (
                <tr key={s.label}>
                  <th scope="row" className="text-muted w-2/5 py-3 pr-6 text-left align-top font-medium">{s.label}</th>
                  <td className="py-3">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="tt-3 mt-12">Features</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {(p.features ?? []).map((f) => (
              <li key={f} className="flex gap-3">
                <Check className="text-primary mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted mt-8 text-sm">
            Need thicknesses, sizes or a spec sheet for a tender? <Link href="/contact" className="text-primary underline underline-offset-4">Ask our team</Link>.
          </p>
        </div>
        <div className="grid h-fit gap-5 lg:col-span-5">
          {p.standard ? (
            <div className="card p-7" data-fx="rise">
              <p className="eyebrow">BIS / Indian Standard</p>
              <p className="tt-2">{p.standard}</p>
              <p className="text-muted mt-3 text-[15px]">
                {STANDARD_TEXT[p.standard]} Billionply {p.name.toLowerCase()} is made to {p.standard}.
              </p>
              {licence?.licenceNumber ? (
                <p className="mt-3 text-[15px]">BIS licence: <strong>{licence.licenceNumber}</strong></p>
              ) : null}
              <Link href="/certifications" className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Certifications <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ) : null}
          {p.tenFoot ? (
            <div className="card p-7" data-fx="rise">
              <p className="eyebrow">Sizes</p>
              <p className="font-semibold">10 ft sizes</p>
              <p className="text-muted mt-1 text-sm">For tall doors and high walls with fewer joints.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Decorative veneer: the seven ranges, their catalogues, Dyed, and the Woodlark card. */
export function VeneerRanges() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Sub-ranges" title="Solutions for every corner" />
          <TrackedLink href={catalogues.natural.href} event="catalogue_download" props={{ catalogue: 'natural', location: 'veneer-ranges' }} className="btn btn-primary">
            <Download className="h-4 w-4" aria-hidden /> Download catalogue
          </TrackedLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-fx="stagger">
          {veneerRanges.map((v) => {
            const cat = v.catalogue ? catalogues[v.catalogue] : undefined;
            return (
              <li key={v.slug} id={v.slug} className="card scroll-mt-28 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.image} alt={`Billionply ${v.name.toLowerCase()} swatch`} width={900} height={675} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <h3 className="tt-3">{v.name}</h3>
                  {v.blurb ? <p className="text-muted mt-2 text-sm">{v.blurb}</p> : null}
                  {v.page ? (
                    <Link href={v.page} className="text-primary mt-4 flex items-center gap-1.5 text-sm font-semibold">
                      About {v.name.toLowerCase()} <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : null}
                  {cat ? (
                    <TrackedLink href={cat.href} event="catalogue_download" props={{ catalogue: cat.key, location: `veneer-range-${v.slug}` }} className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      <Download className="h-4 w-4" aria-hidden /> {cat.title}
                    </TrackedLink>
                  ) : null}
                </div>
              </li>
            );
          })}
          <li className="card ink on-dark overflow-hidden">
            <TrackedLink href={BRAND.woodlark.url} event="woodlark_click" props={{ location: 'veneer-ranges' }} className="flex h-full flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/veneers/hybrid-woodlark.jpg" alt="Woodlark premium hybrid veneer surface" width={900} height={675} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover opacity-90" />
              <span className="flex flex-1 flex-col p-5">
                <span className="tt-3">Premium Hybrid Veneer by Woodlark</span>
                <span className="text-paper/75 mt-2 flex-1 text-sm">Explore the range at woodlarkveneer.com.</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Visit woodlarkveneer.com <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </span>
            </TrackedLink>
          </li>
        </ul>
        {veneerFinishes.length ? (
          <div className="mt-14">
            <h3 className="tt-3">More finishes</h3>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {veneerFinishes.map((f) => (
                <li key={f.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.image} alt={f.name} width={600} height={600} loading="lazy" decoding="async" className="aspect-square w-full rounded-md object-cover" />
                  <p className="text-muted mt-2 text-sm">{f.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function PrelamFinishes() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading eyebrow="Finishes" title="Colours, textures and finishes" lead="A selection of prelam finishes. Ask for samples of the full range." />
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {prelamFinishes.map((f) => (
            <li key={f.image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={f.alt} width={600} height={600} loading="lazy" decoding="async" className="aspect-square w-full rounded-md object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="card group flex h-full flex-col overflow-hidden">
      <span className="relative block aspect-[10/7] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.imageAlt} width={900} height={630} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {p.standard ? <span className="bg-background/90 absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">{p.standard}</span> : null}
        {p.tenFoot ? <span className="bg-ink text-paper absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">10 ft</span> : null}
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="tt-3">{p.name}</span>
        <span className="text-muted mt-2 flex-1 text-[15px]">{p.cardLine}</span>
        <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          Specs and uses <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

/** All six products, with the Woodlark card after them. */
export function ProductGrid() {
  return (
    <section className="section">
      <div className="container-x">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-fx="stagger">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
        <WoodlarkCard location="products" />
      </div>
    </section>
  );
}

/** "Often specified with": every other product (no dead-end product pages). */
export function RelatedProducts({ slug }: { slug: string }) {
  const others = products.filter((p) => p.slug !== slug);
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <SectionHeading eyebrow="The range" title="Often specified with" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5" data-fx="stagger">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="card group block overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.imageAlt} width={600} height={420} loading="lazy" decoding="async" className="aspect-[10/7] w-full object-cover" />
                <span className="block p-4 font-semibold">{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WoodlarkCard({ location }: { location: string }) {
  return (
    <TrackedLink href={BRAND.woodlark.url} event="woodlark_click" props={{ location }} className="card group mt-8 grid overflow-hidden md:grid-cols-[0.5fr_1.5fr]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/veneers/hybrid-woodlark.jpg" alt="Woodlark premium hybrid veneer surface" width={900} height={600} loading="lazy" decoding="async" className="h-40 w-full object-cover md:h-full" />
      <span className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
        <span>
          <span className="tt-3 block">Premium Hybrid Veneer by Woodlark</span>
          <span className="text-muted mt-1 block text-[15px]">Explore the range at woodlarkveneer.com.</span>
        </span>
        <span className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
          Visit Woodlark <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </TrackedLink>
  );
}

/**
 * Product page hero: the title beside an in-use (lifestyle) photo, or the
 * product shot where no in-use photo exists yet. Mood photos are never
 * captioned as Billionply projects.
 */
export function ProductHero({ slug, eyebrow }: { slug: string; title?: string; eyebrow?: string }) {
  const p = getProduct(slug);
  if (!p) return null;
  const copy = PAGE_COPY[`/products/${slug}`];
  const answer = PRODUCT_ANSWERS[slug]?.shortAnswer;
  const src = p.heroImage ?? p.image;
  const alt = p.heroImage ? (p.heroImageAlt ?? p.imageAlt) : p.imageAlt;
  return (
    <Hero
      variant="split"
      eyebrow={eyebrow}
      headline={copy?.h1 ?? p.name}
      answer={answer}
      sub={answer ? undefined : p.cardLine}
      image={{ src, alt, brief: alt, aspect: src.endsWith('flexible-plywood.jpg') ? 'square' : 'landscape' }}
    />
  );
}

/** Home "The range": the six products as photo cards. */
export function ProductRange({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} className="max-w-3xl" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-fx="stagger">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
