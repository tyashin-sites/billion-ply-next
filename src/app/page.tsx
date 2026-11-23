import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { products, useGroups, manufacturing, veneerRanges, veneerFinishes, getProduct } from '@/data/products';
import { testimonials, events } from '@/data/company';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LeafFan } from '@/components/LeafFan';
import { Counter } from '@/components/Counter';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { CatalogueButton } from '@/components/CatalogueButton';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { CtaBand } from '@/components/CtaBand';

export const metadata = pageMetadata({
  description:
    'Billion Ply: decorative veneer, marine plywood, block board, prelam and flexible plywood and flush doors. In the industry since 1997, 1000+ dealers across India.',
  path: '/',
});

const faq = [
  {
    q: 'What products does Billion Ply offer?',
    a: 'Decorative Veneer (IS 1328), Marine Plywood (IS 710), Block Board (IS 1659), Flexible Plywood, Prelam Plywood and Flush Doors. The premium hybrid veneer range is made by our sister brand, Woodlark.',
  },
  {
    q: 'What technologies and standards does Billion Ply follow?',
    a: '4 Quad Press technology for strength and durability, E1 grade for eco-friendliness and safe indoor use, Italian sanders for a smooth, refined finish, and termite and borer protection for long life.',
  },
  {
    q: 'How long has Billion Ply been in the industry?',
    a: 'Since 1997. Billion Ply is run by three generations of the Chhabra family and works with 1000+ dealers across India.',
  },
  {
    q: 'How can I contact Billion Ply?',
    a: `Email ${siteConfig.contact.email}, call ${siteConfig.contact.phone} or ${siteConfig.contact.phone2}, or message us on WhatsApp. Our plant is at ${siteConfig.address.oneLine}.`,
  },
];

const swatches = [
  ...veneerRanges.map((v) => ({ name: v.name, image: v.image })),
  ...veneerFinishes,
];

export default function HomePage() {
  const event = events[0];
  return (
    <>
      <JsonLd path="/" title={`${siteConfig.name}: ${siteConfig.tagline}`} description={siteConfig.description} faq={faq} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-leaf/10 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-oak/15 blur-3xl" />
        <div className="container relative grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">In the industry since {siteConfig.foundedYear}</p>
            <h1 className="display-xl mt-6">
              Innovative wood for <em className="font-normal italic text-leaf-deep">interiors</em> and furniture
            </h1>
            <p className="lead mt-7 max-w-xl">
              Decorative veneer, plywood, block board and flush doors from Bahadurgarh, Haryana. Three generations of the Chhabra family, 1000+ dealers across India.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Explore the range <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <CatalogueButton catalogue="natural" location="home-hero" label="Download catalogue" variant="ghost" />
              <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'home-hero' }} className="btn-whatsapp">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </TrackedLink>
            </div>
          </div>
          <LeafFan />
        </div>
      </section>

      {/* LEGACY NUMBERS */}
      <section className="border-y bg-white">
        <dl className="container grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-4 py-10 text-center md:py-12">
              <dt className="mt-2 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-4xl text-ink md:text-5xl">
                {'plain' in s && s.plain ? s.value : <Counter value={s.value} suffix={'suffix' in s ? s.suffix : ''} />}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PRODUCT RANGE */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">The range</p>
              <h2 className="display-lg mt-4">Six products, one standard of care</h2>
              <p className="lead mt-4">From the veneer on a feature wall to the core of a 10 ft door, each board is made at our own plant.</p>
            </div>
            <Link href="/compare" className="btn-ghost">Compare products</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <TrackedLink
              href={siteConfig.sisterBrand.url}
              external
              event="sister_brand_click"
              props={{ brand: 'woodlark', location: 'home-range' }}
              className="card card-hover group mt-6 grid items-center overflow-hidden md:grid-cols-[0.6fr_1.4fr]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/veneers/hybrid-woodlark.jpg" alt="Hybrid veneer surface" loading="lazy" className="h-40 w-full object-cover md:h-full" />
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oak-deep">Sister brand</p>
                  <p className="mt-2 font-display text-2xl text-ink">Premium Hybrid Veneer by Woodlark</p>
                  <p className="mt-1 text-sm text-muted-foreground">Our premium hybrid veneer range has its own home at woodlarkveneer.com.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">
                  Visit Woodlark <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </TrackedLink>
          </Reveal>
        </div>
      </section>

      {/* GRAIN MARQUEE */}
      <section aria-labelledby="grain-h" className="overflow-hidden border-y bg-white py-14">
        <div className="container mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">400+ veneer species</p>
            <h2 id="grain-h" className="display-md mt-3">Every leaf, its own grain</h2>
          </div>
          <Link href="/products/decorative-veneer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-deep">
            See decorative veneer <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grain-marquee" aria-hidden="true">
          {[...swatches, ...swatches].map((s, i) => (
            <figure key={`${s.name}-${i}`} className="mx-2 w-52 shrink-0">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{s.name}</figcaption>
            </figure>
          ))}
        </div>
        <ul className="sr-only">
          {swatches.map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
      </section>

      {/* WHICH PRODUCT */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Which product for which job</p>
            <h2 className="display-lg mt-4">Start from the job, not the catalogue</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {useGroups.map((g, i) => (
              <Reveal key={g.id} delay={i * 80}>
                <Link href={`/product-guide#${g.id}`} className="card card-hover group flex h-full flex-col p-6">
                  <span className="font-display text-sm text-oak-deep">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl">{g.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{g.lead}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {Object.keys(g.why).map((slug) => (
                      <li key={slug} className="rounded-full bg-leaf-tint px-2.5 py-1 text-xs font-medium text-leaf-deep">
                        {getProduct(slug)?.short}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="ink-section on-dark section overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-leaf/20 blur-3xl" />
        <div className="container relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Specification support</p>
            <h2 className="display-lg mt-4">Made to Indian Standards</h2>
            <p className="mt-5 max-w-lg text-white/75">
              Architects and project teams can specify Billion Ply with confidence: decorative veneer to IS 1328, marine plywood to IS 710 and block board to IS 1659, each with a full spec block on its product page.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/certifications" className="btn-ghost">Certifications</Link>
              <Link href="/sample-request" className="btn-primary !bg-white !text-ink hover:!bg-leaf-tint">Request samples</Link>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {['IS 1328', 'IS 710', 'IS 1659'].map((s) => (
                <li key={s} className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-5 text-center">
                  <p className="font-display text-2xl">{s}</p>
                  <p className="mt-1 text-xs text-white/60">
                    {s === 'IS 1328' ? 'Decorative veneer' : s === 'IS 710' ? 'Marine plywood' : 'Block board'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {manufacturing.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 80} className="rounded-lg border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
                <span className="block h-px w-10 bg-gradient-to-r from-oak to-leaf" aria-hidden="true" />
                <h3 className="mt-5 text-xl">{m.title}</h3>
                <p className="mt-2 text-sm text-white/75">{m.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* LEGACY */}
      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-lg shadow-hover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/team/leadership-group.jpg" alt="Jitender, Rahul and Rishabh Chhabra of Billion Ply" loading="lazy" className="aspect-[16/9] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-lg bg-white px-5 py-4 shadow-hover">
              <p className="font-display text-3xl text-leaf-deep">3</p>
              <p className="text-xs text-muted-foreground">generations of the Chhabra family</p>
            </div>
          </Reveal>
          <div>
            <p className="eyebrow">Our legacy</p>
            <h2 className="display-lg mt-4">{siteConfig.motto}</h2>
            <p className="lead mt-5">
              Billion Ply is more than a plywood and veneer maker. It is a legacy built on the expertise of three generations, blending traditional craftsmanship with modern technology.
            </p>
            <Link href="/about" className="btn-ghost mt-8">Our story and team</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section border-t bg-white">
        <div className="container">
          <p className="eyebrow">Client feedback</p>
          <h2 className="display-lg mt-4 max-w-2xl">Trusted by builders, architects and homeowners</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={t.name} delay={i * 90} className="card flex h-full flex-col p-7">
                <Quote className="h-7 w-7 text-oak" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t pt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS + PROJECTS */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">Events</p>
            <h2 className="display-lg mt-4">{event.name}</h2>
            <p className="lead mt-5">Meet the people behind the boards. See our stand and team at {event.name}, and photos from our plant.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn-primary">Event photos</Link>
              <Link href="/projects" className="btn-ghost">Projects and gallery</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {event.photos.slice(0, 6).map((p, i) => (
              <div key={p.src} className={`overflow-hidden rounded-md ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="section border-t bg-paper">
        <div className="container grid gap-6 lg:grid-cols-2">
          <div className="card relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mood/living-room.jpg" alt="" loading="lazy" className="h-56 w-full object-cover" />
            <div className="p-8">
              <p className="eyebrow">Architects and interior designers</p>
              <h2 className="display-md mt-3">Specify with samples in hand</h2>
              <p className="mt-3 text-muted-foreground">Ask for veneer, prelam and plywood samples for your next project, and download our catalogues.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/sample-request" className="btn-primary">Request samples</Link>
                <Link href="/catalogues" className="btn-ghost">Catalogues</Link>
              </div>
            </div>
          </div>
          <div className="card relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/factory/factory-3.jpg" alt="Billion Ply warehouse stock" loading="lazy" className="h-56 w-full object-cover" />
            <div className="p-8">
              <p className="eyebrow">Dealers and distributors</p>
              <h2 className="display-md mt-3">Grow with Billion Ply</h2>
              <p className="mt-3 text-muted-foreground">Join a network of 1000+ dealers across India. Tell us about your firm and the brands you carry.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/become-a-dealer" className="btn-primary">Become a dealer</Link>
                <Link href="/dealers" className="btn-ghost">Find a dealer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 className="display-lg mt-4">Good to know</h2>
          </div>
          <div className="divide-y border-y">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-ink">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl text-leaf transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="home-cta" />
    </>
  );
}
