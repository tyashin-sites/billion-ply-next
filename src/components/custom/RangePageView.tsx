import Link from 'next/link';
import { Download } from 'lucide-react';
import { WHATSAPP_URL } from '@/config/site';
import { catalogues } from '@/data/catalogues';
import { PAGE_COPY, PRODUCT_ANSWERS, getRangePage } from '@/data/seo-content';
import { breadcrumbLd, faqLd, organizationLd, productLd, websiteLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Hero, JsonLd, SectionHeading } from '@/components/kit';
import { AnswerSections, ProductFaq } from './Answers';
import { RelatedProducts } from './Product';
import { TrackedLink } from './TrackedLink';

/**
 * The four keyword pages (natural, teak and recon veneer, commercial
 * plywood). Same order as the product pages: H1, short answer, actions,
 * marketing sections, FAQ, the range. Commercial plywood has no photo and no
 * spec beyond "dry interiors" until the client sends data.
 */
export function RangePageView({ slug, eyebrow }: { slug: string; eyebrow?: string }) {
  const r = getRangePage(slug);
  if (!r) return null;
  const path = `/products/${slug}`;
  const copy = PAGE_COPY[path];
  const answer = PRODUCT_ANSWERS[slug];
  const crumbs = [
    { name: 'Home', path: '/' },
    ...(r.parent ? [r.parent] : []),
    { name: r.name, path },
  ];
  const cat = r.catalogue ? catalogues[r.catalogue] : undefined;
  return (
    <>
      <JsonLd
        nodes={[
          organizationLd('Organization'),
          websiteLd(),
          breadcrumbLd(crumbs),
          productLd({
            name: `Billionply ${r.name}`,
            description: copy.description,
            path,
            images: r.image ? [`${SITE_URL}${r.image}`] : [],
          }),
          faqLd(answer.faqs),
        ]}
      />
      <Breadcrumbs items={crumbs} />
      {r.image && r.imageAlt ? (
        <Hero
          variant="split"
          eyebrow={eyebrow}
          headline={copy.h1}
          answer={answer.shortAnswer}
          image={{ src: r.image, alt: r.imageAlt, brief: r.imageAlt, aspect: 'landscape' }}
        />
      ) : (
        <Hero variant="centered" eyebrow={eyebrow} headline={copy.h1} answer={answer.shortAnswer} />
      )}
      <section className="pb-4 pt-2">
        <div className={`container-x flex flex-wrap gap-3 ${r.image ? '' : 'justify-center'}`}>
          <Link href="/contact" className="btn btn-primary">Enquire about {r.name.toLowerCase()}</Link>
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
      {slug === 'commercial-plywood' ? (
        <section className="section pb-0">
          <div className="container-x max-w-4xl">
            <SectionHeading eyebrow="For architects and project teams" title="Specification" />
            <table className="mt-8 w-full text-[15px]">
              <tbody className="divide-border divide-y">
                <tr>
                  <th scope="row" className="text-muted w-2/5 py-3 pr-6 text-left align-top font-medium">Use</th>
                  <td className="py-3">Dry interiors</td>
                </tr>
                <tr>
                  <th scope="row" className="text-muted w-2/5 py-3 pr-6 text-left align-top font-medium">Grade, thickness and sizes</th>
                  <td className="py-3">
                    <Link href="/contact" className="text-primary underline underline-offset-4">Ask our team</Link> for grade, thickness and sizes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
      <AnswerSections slug={slug} />
      <ProductFaq slug={slug} />
      <RelatedProducts slug={slug} />
      <CtaBand
        eyebrow="Talk to Billionply"
        headline={`Using ${r.name.toLowerCase()} on a project?`}
        body="Tell us what you are building. We help you pick the board, send samples and connect you with your nearest dealer."
        primaryCta={{ label: 'Send an enquiry', href: '/contact' }}
        secondaryCta={{ label: 'Chat on WhatsApp', href: 'https://wa.me/918287903410' }}
      />
    </>
  );
}
