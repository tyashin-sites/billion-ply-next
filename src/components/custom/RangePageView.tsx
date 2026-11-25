import Link from 'next/link';
import { Download } from 'lucide-react';
import { WHATSAPP_URL } from '@/config/site';
import { catalogues } from '@/data/catalogues';
import { PAGE_COPY, PRODUCT_ANSWERS, getRangePage } from '@/data/seo-content';
import { breadcrumbLd, faqLd, organizationLd, productLd, websiteLd } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Hero, JsonLd } from '@/components/kit';
import { AnswerSections, ProductFaq } from './Answers';
import { RelatedProducts } from './Product';
import { TrackedLink } from './TrackedLink';

/**
 * The four keyword pages (natural, teak and recon veneer, commercial
 * plywood). Same order as the product pages: H1, short answer, actions,
 * marketing sections, FAQ, the range. Commercial plywood has no photo of its
 * own: its hero shows a neutral warehouse photo that is not described as
 * commercial plywood and is left out of its Product schema.
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
  const heroImage = r.image && r.imageAlt ? { src: r.image, alt: r.imageAlt } : r.heroFallback;
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
      {heroImage ? (
        <Hero
          variant="split"
          eyebrow={eyebrow ?? r.eyebrow}
          headline={copy.h1}
          answer={answer.shortAnswer}
          sub={r.intro}
          image={{ src: heroImage.src, alt: heroImage.alt, brief: heroImage.alt, aspect: 'landscape' }}
        />
      ) : (
        <Hero variant="centered" eyebrow={eyebrow ?? r.eyebrow} headline={copy.h1} answer={answer.shortAnswer} sub={r.intro} />
      )}
      <section className="pb-4 pt-2">
        <div className={`container-x flex flex-wrap gap-3 ${heroImage ? '' : 'justify-center'}`}>
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
