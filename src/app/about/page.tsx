import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { leadership, mission, vision } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { Timeline } from '@/components/Timeline';
import { Reveal } from '@/components/Reveal';
import { Counter } from '@/components/Counter';
import { CtaBand } from '@/components/CtaBand';

const description =
  'Billionply (Jai Shiv Plywood Pvt. Ltd.): three generations of the Chhabra family, in plywood and veneer since 1997. Our story, mission, vision and leadership team.';

export const metadata = pageMetadata({ title: 'About us', description, path: '/about', image: '/images/team/about-hero.jpg' });

export default function AboutPage() {
  return (
    <>
      <JsonLd path="/about" title="About Billionply" description={description} breadcrumb={[{ name: 'About', path: '/about' }]} />
      <PageHero
        eyebrow={`Since ${siteConfig.foundedYear}`}
        title={siteConfig.motto}
        lead="Billionply is more than a plywood and veneer maker. We are a legacy built on the expertise of three generations, setting new benchmarks in the wood industry."
        crumbs={[{ name: 'About' }]}
        image="/images/team/about-hero.jpg"
        imageAlt="Billionply leadership in the company office"
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="display-lg mt-4">A family craft, modern machines</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/85">
            <p>
              Our story began with a passion for excellence and a vision to make products that stand the test of time. Across our journey we have honed our craft and earned the trust and loyalty of our customers, making Billionply a name for quality and reliability.
            </p>
            <p>
              Today we blend traditional craftsmanship with modern technology. Every product we make is a testament to our commitment to precision, durability and aesthetics.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-white">
        <dl className="container grid grid-cols-2 md:grid-cols-4">
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-10 text-center">
              <dt className="mt-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-4xl text-ink">
                {'plain' in s && s.plain ? `Since ${s.value}` : <Counter value={s.value} suffix={'suffix' in s ? s.suffix : ''} />}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="container grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Our legacy</p>
            <h2 className="display-lg mt-4">From 1997 to today</h2>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="ink-section on-dark section">
        <div className="container grid gap-8 md:grid-cols-2">
          <Reveal className="rounded-lg border border-white/10 bg-white/[0.05] p-8">
            <p className="eyebrow">Our vision</p>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{vision}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-lg border border-white/10 bg-white/[0.05] p-8">
            <p className="eyebrow">Our mission</p>
            <p className="mt-5 text-lg leading-relaxed text-white/85">{mission}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Leadership</p>
          <h2 className="display-lg mt-4">The team</h2>
          <p className="lead mt-4 max-w-2xl">Our team is the backbone of our success, bringing together diverse talents, skills and experience.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {leadership.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={`${m.name}, ${m.role}`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-2xl">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/team/leadership-group.jpg" alt="Jitender, Rahul and Rishabh Chhabra" loading="lazy" className="w-full object-cover" />
          </div>
          <p className="mt-10 text-center">
            <Link href="/projects" className="btn-ghost">See our plant</Link>
          </p>
        </div>
      </section>
      <CtaBand location="about-cta" />
    </>
  );
}
