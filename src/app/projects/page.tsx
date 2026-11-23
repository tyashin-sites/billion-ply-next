import Link from 'next/link';
import { caseStudies, factoryGallery } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';

const description =
  'Billion Ply projects and gallery: 500+ completed projects, and a look inside our plant and warehouse in Bahadurgarh, Haryana.';

export const metadata = pageMetadata({ title: 'Projects and gallery', description, path: '/projects' });

export default function ProjectsPage() {
  return (
    <>
      <JsonLd path="/projects" title="Projects and gallery" description={description} breadcrumb={[{ name: 'Projects', path: '/projects' }]} />
      <PageHero
        eyebrow="500+ completed projects"
        title="Projects and gallery"
        lead="From our plant to our customers' interiors."
        crumbs={[{ name: 'Projects' }]}
      >
        <Link href="/events" className="btn-ghost">Event photos</Link>
      </PageHero>

      {caseStudies.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="display-md">Case studies</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((c) => (
                <article key={c.slug} className="card overflow-hidden">
                  {c.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.images[0]} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl">{c.title}</h3>
                    {c.location && <p className="text-sm text-muted-foreground">{c.location}</p>}
                    <p className="mt-3 text-sm text-ink/85">{c.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="display-md">Inside the plant</h2>
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {factoryGallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 70} className="mb-4 break-inside-avoid overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-700 hover:scale-[1.03]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand location="projects-cta" />
    </>
  );
}
