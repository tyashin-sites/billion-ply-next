import { events } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';

const description = 'Billionply at Matecia 2025: photos of our stand and team.';

export const metadata = pageMetadata({ title: 'Events', description, path: '/events', image: '/images/events/matecia-2025-2917.jpg' });

export default function EventsPage() {
  return (
    <>
      <JsonLd path="/events" title="Events" description={description} breadcrumb={[{ name: 'Events', path: '/events' }]} />
      <PageHero eyebrow="Events" title="Where to meet us" lead="Trade shows and exhibitions where the Billionply team shows the range in person." crumbs={[{ name: 'Events' }]} />
      {events.map((e) => (
        <section key={e.slug} id={e.slug} className="section scroll-mt-24">
          <div className="container">
            <h2 className="display-lg">{e.name}</h2>
            <p className="lead mt-3">{e.summary}</p>
            <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {e.photos.map((p, i) => (
                <Reveal key={p.src} delay={(i % 3) * 60} className="mb-4 break-inside-avoid overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand location="events-cta" />
    </>
  );
}
