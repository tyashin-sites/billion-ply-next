import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '@/config/site';
import { veneerFinishes, veneerRanges } from '@/data/products';
import { SectionHeading } from '@/components/kit';
import { TrackedLink } from './TrackedLink';
import { WoodlarkCard } from './Product';

/**
 * Signature: a slow strip of real veneer swatches that wake from grey to
 * colour under the pointer. Decorative copy of the list is aria-hidden; the
 * names are also listed for screen readers. Paused under reduced motion.
 */
export function GrainStrip() {
  const swatches = [...veneerRanges.map((v) => ({ name: v.name, image: v.image })), ...veneerFinishes];
  return (
    <section aria-labelledby="grain-h" className="section bg-surface overflow-hidden">
      <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="400+ veneer species" title="Every leaf, its own grain" />
        <Link href="/products/decorative-veneer" className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
          See decorative veneer <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="grain-marquee" aria-hidden>
        {[...swatches, ...swatches].map((s, i) => (
          <figure key={`${s.name}-${i}`} className="mx-2 w-52 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt="" width={416} height={555} loading="lazy" decoding="async" className="aspect-[3/4] w-full rounded-md object-cover" />
            <figcaption className="text-muted mt-2 text-xs font-medium uppercase tracking-[0.15em]">{s.name}</figcaption>
          </figure>
        ))}
      </div>
      <ul className="sr-only">
        {swatches.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
    </section>
  );
}

/** Woodlark card under the home product range. */
export function HomeWoodlark() {
  return (
    <section className="pb-4">
      <div className="container-x -mt-10">
        <WoodlarkCard location="home" />
      </div>
    </section>
  );
}

/** Audiences from the owner's plan: specifiers first, then dealers. */
export function Audiences() {
  return (
    <section className="section">
      <div className="container-x grid gap-6 lg:grid-cols-2">
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mood/study-desk.jpg" alt="A study desk and shelves in a wood finish" width={1200} height={600} loading="lazy" decoding="async" className="h-56 w-full object-cover" />
          <div className="p-8">
            <p className="eyebrow">Architects and interior designers</p>
            <h2 className="tt-3">Specify with samples in hand</h2>
            <p className="text-muted mt-3">Ask for veneer, prelam and plywood samples for your next project, and download our catalogues.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sample-request" className="btn btn-primary">Request samples</Link>
              <Link href="/catalogues" className="btn btn-ghost">Catalogues</Link>
            </div>
          </div>
        </div>
        <div className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/factory/factory-3.jpg" alt="Billionply warehouse stock" width={1080} height={648} loading="lazy" decoding="async" className="h-56 w-full object-cover" />
          <div className="p-8">
            <p className="eyebrow">Dealers and distributors</p>
            <h2 className="tt-3">Grow with Billionply</h2>
            <p className="text-muted mt-3">Join 1000+ dealers across India. Tell us about your firm and the brands you carry.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/become-a-dealer" className="btn btn-primary">Become a dealer</Link>
              <Link href="/dealers" className="btn btn-ghost">Find a dealer</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Floating WhatsApp button on every page (the brief asks for WhatsApp everywhere). */
export function WhatsAppFloat() {
  if (!WHATSAPP_URL) return null;
  return (
    <TrackedLink
      href={WHATSAPP_URL}
      event="whatsapp_click"
      props={{ location: 'floating' }}
      ariaLabel="Chat with Billionply on WhatsApp"
      className="bg-primary text-primary-contrast fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:-translate-y-0.5 md:bottom-7 md:right-7"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </TrackedLink>
  );
}
