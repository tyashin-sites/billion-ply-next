import { SectionHeading } from './SectionHeading';

export interface FaqProps {
  eyebrow?: string;
  headline?: string;
  items: { q: string; a: string }[];
}

/**
 * Every question and answer is visible in the server HTML (issue 100: AEO
 * wants answers on the page, not behind an accordion). The page's FAQPage
 * JSON-LD must list the same items.
 */
export function Faq({ eyebrow, headline, items }: FaqProps) {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        {headline ? <SectionHeading eyebrow={eyebrow} title={headline} /> : null}
        <dl className={`divide-border border-border divide-y border-b border-t ${headline ? 'mt-10' : ''}`}>
          {items.map((it) => (
            <div key={it.q} className="py-5">
              <dt className="font-heading text-[1.0625rem] font-medium">{it.q}</dt>
              <dd className="text-muted mt-2 text-[15.5px] leading-relaxed">{it.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
