import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { getProduct } from '@/data/products';
import {
  GUIDE_ANSWERS,
  PRODUCT_ANSWERS,
  RANGE_GROUPS,
  getRangePage,
  type Section,
} from '@/data/seo-content';
import { Faq, SectionHeading } from '@/components/kit';

/** A product or range page by slug: name, photo (if any) and card line. */
export function rangeItem(slug: string) {
  const p = getProduct(slug);
  if (p) return { slug, name: p.name, image: p.image as string | null, imageAlt: p.imageAlt as string | null, cardLine: p.cardLine };
  const r = getRangePage(slug);
  if (r) return { slug, name: r.name, image: r.image, imageAlt: r.imageAlt, cardLine: r.cardLine };
  throw new Error(`Unknown product slug ${slug}`);
}

function SectionBody({ s }: { s: Section }) {
  if (s.kind === 'table') {
    return (
      <>
        <div className="border-border mt-6 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <thead className="bg-surface">
              <tr>
                {s.columns.map((c, i) =>
                  i === 0 ? (
                    <td key={i} className="w-40 px-5 py-3" />
                  ) : (
                    <th key={c} scope="col" className="font-heading px-5 py-3 text-base">{c}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {s.rows.map((r) => (
                <tr key={r[0]} className="align-top">
                  <th scope="row" className="text-muted px-5 py-3 font-medium">{r[0]}</th>
                  {r.slice(1).map((cell, i) => (
                    <td key={i} className="px-5 py-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {s.note ? <p className="text-muted mt-4 text-[15px]">{s.note}</p> : null}
      </>
    );
  }
  if (s.kind === 'list') {
    return (
      <>
        <ul className="mt-6 grid gap-3">
          {s.items.map((it) => (
            <li key={it.label ?? it.text} className="flex gap-3">
              <Check className="text-primary mt-1 h-5 w-5 shrink-0" aria-hidden />
              <span>
                {it.label ? <strong className="font-semibold">{it.label}: </strong> : null}
                {it.text}
              </span>
            </li>
          ))}
        </ul>
        {s.note ? <p className="text-muted mt-5 text-[15px]">{s.note}</p> : null}
      </>
    );
  }
  if (s.kind === 'steps') {
    return (
      <ol className="mt-6 grid list-decimal gap-3 pl-6">
        {s.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ol>
    );
  }
  return <p className="mt-4 text-[1.0625rem]">{s.text}</p>;
}

/** The marketing sections for a product page (tables, lists, steps). */
export function AnswerSections({ slug }: { slug: string }) {
  const a = PRODUCT_ANSWERS[slug];
  if (!a?.sections.length) return null;
  return (
    <section className="section">
      <div className="container-x grid max-w-4xl gap-14">
        {a.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="tt-2">{s.heading}</h2>
            <SectionBody s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}

/** The product page FAQ, every answer visible (JSON-LD from productFaqs()). */
export function ProductFaq({ slug }: { slug: string }) {
  const a = PRODUCT_ANSWERS[slug];
  if (!a?.faqs.length) return null;
  return <Faq eyebrow="Questions" headline="Frequently asked questions" items={a.faqs} />;
}

function RangeCard({ slug }: { slug: string }) {
  const it = rangeItem(slug);
  return (
    <Link href={`/products/${slug}`} className="card group flex h-full flex-col overflow-hidden">
      {it.image ? (
        <span className="relative block aspect-[10/7] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.image} alt={it.imageAlt ?? ''} width={900} height={630} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        </span>
      ) : null}
      <span className="flex flex-1 flex-col p-6">
        <span className="tt-3">{it.name}</span>
        <span className="text-muted mt-2 flex-1 text-[15px]">{it.cardLine}</span>
        <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          Specs and uses <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

/** Home and /products: veneers, then plywood and boards, then doors. */
export function RangeGroups({ heading, eyebrow }: { heading?: string; eyebrow?: string }) {
  return (
    <section className="section">
      <div className="container-x">
        {heading ? <SectionHeading eyebrow={eyebrow} title={heading} className="max-w-3xl" /> : null}
        {RANGE_GROUPS.map((g, gi) => (
          <div key={g.title} className={gi === 0 && !heading ? '' : 'mt-14'}>
            <h3 className="tt-3">{gi + 1}. {g.title}</h3>
            <p className="text-muted mt-2 max-w-3xl">{g.text}</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {g.slugs.map((slug) => (
                <li key={slug}>
                  <RangeCard slug={slug} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Product guide: the direct-answer table above the use groups. */
export function GuideAnswers() {
  return (
    <section className="section pb-0">
      <div className="container-x max-w-4xl">
        <h2 className="tt-2">Quick answers</h2>
        <div className="border-border mt-6 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[480px] text-left text-[15px]">
            <thead className="bg-surface">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Where</th>
                <th scope="col" className="px-5 py-3 font-medium">Use</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {GUIDE_ANSWERS.map((r) => (
                <tr key={r.where}>
                  <th scope="row" className="px-5 py-3 font-normal">{r.where}</th>
                  <td className="px-5 py-3">
                    {r.links.length === 1 ? (
                      <Link href={`/products/${r.links[0]}`} className="text-primary font-semibold underline-offset-4 hover:underline">
                        {r.use}
                      </Link>
                    ) : (
                      r.links.map((slug, i) => (
                        <span key={slug}>
                          {i ? ' or ' : ''}
                          <Link href={`/products/${slug}`} className="text-primary font-semibold underline-offset-4 hover:underline">
                            {rangeItem(slug).name.toLowerCase()}
                          </Link>
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
