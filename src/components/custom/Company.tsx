import { caseStudies, certifications, events, factoryGallery, leadership, timeline } from '@/data/company';
import { manufacturing, products } from '@/data/products';
import Link from 'next/link';
import { SectionHeading } from '@/components/kit';

/** About: the legacy timeline. The rule draws on scroll (kit data-fx="draw"). */
export function Timeline() {
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Our legacy" title="From 1997 to today" />
        </div>
        <ol className="relative lg:col-span-8">
          <span aria-hidden className="bg-border absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px" />
          {timeline.map((t) => (
            <li key={t.title} className="relative pb-10 pl-10 last:pb-0" data-fx="rise">
              <span aria-hidden className="bg-primary ring-background absolute left-0 top-2 h-3 w-3 rounded-full ring-4" />
              {t.year ? <p className="eyebrow">{t.year}</p> : null}
              <h3 className="tt-3">{t.title}</h3>
              <p className="text-muted mt-1.5 max-w-xl">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Leadership() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Leadership" title="The team" lead="Our team brings together diverse talents, skills and experience." />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3" data-fx="stagger">
          {leadership.map((m) => (
            <li key={m.name} className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.image} alt={`${m.name}, ${m.role}`} width={300} height={225} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover object-top" />
              <div className="p-6">
                <h3 className="tt-3">{m.name}</h3>
                <p className="text-muted mt-1 text-sm">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PhotoGallery({ photos }: { photos: { src: string; alt: string; tall?: boolean }[] }) {
  if (!photos?.length) return null;
  return (
    <section className="section pt-0">
      <ul className="container-x columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((p) => (
          <li key={p.src} className="mb-4 break-inside-avoid overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} width={1600} height={p.tall ? 2850 : 898} loading="lazy" decoding="async" className="h-auto w-full" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PlantGallery() {
  return <PhotoGallery photos={factoryGallery} />;
}

export function EventGallery() {
  return (
    <>
      {events.map((e) => (
        <div key={e.slug} id={e.slug} className="scroll-mt-24">
          <section className="section pb-8">
            <div className="container-x">
              <SectionHeading eyebrow="Event" title={e.name} lead={e.summary} />
            </div>
          </section>
          <PhotoGallery photos={e.photos} />
        </div>
      ))}
    </>
  );
}

/** Named case studies: renders nothing until the client sends some. */
export function CaseStudies() {
  if (!caseStudies.length) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Case studies" title="Projects" />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <li key={c.slug} className="card overflow-hidden">
              {c.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.images[0]} alt={c.title} width={900} height={675} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              ) : null}
              <div className="p-6">
                <h3 className="tt-3">{c.title}</h3>
                {c.location ? <p className="text-muted text-sm">{c.location}</p> : null}
                <p className="mt-3 text-[15px]">{c.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Standards per product; licence numbers and certificate images appear only once supplied. */
export function Certifications() {
  const withStandard = products.filter((p) => p.standard);
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="BIS" title="Indian Standards" />
        <ul className="mt-10 grid gap-6 md:grid-cols-3" data-fx="stagger">
          {withStandard.map((p) => {
            const lic = certifications.find((c) => c.standard === p.standard);
            return (
              <li key={p.slug} className="card flex flex-col p-7">
                <p className="tt-2">{p.standard}</p>
                <Link href={`/products/${p.slug}`} className="text-primary mt-2 font-semibold">{p.name}</Link>
                {lic?.licenceNumber ? <p className="mt-4 text-[15px]">Licence no. <strong>{lic.licenceNumber}</strong></p> : null}
                {lic?.validUntil ? <p className="text-muted mt-1 text-sm">Valid until {lic.validUntil}</p> : null}
                {lic?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={lic.image} alt={`${p.standard} certificate`} width={900} height={1200} loading="lazy" decoding="async" className="border-border mt-5 w-full rounded-md border" />
                ) : null}
              </li>
            );
          })}
        </ul>
        <h2 className="tt-2 mt-20">How we make it</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {manufacturing.map((m) => (
            <li key={m.title} className="card p-6">
              <span className="rule block w-10" aria-hidden />
              <h3 className="tt-3 mt-5">{m.title}</h3>
              <p className="text-muted mt-2 text-sm">{m.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-muted mt-10 text-sm">
          Need copies of certificates for a tender or specification? <Link href="/contact" className="text-primary underline underline-offset-4">Ask our team</Link>.
        </p>
      </div>
    </section>
  );
}
