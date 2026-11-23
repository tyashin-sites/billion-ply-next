import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { products } from '@/data/products';
import { getLegalConfig } from '@/lib/legal';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export async function Footer({ hasBlog = false }: { hasBlog?: boolean }) {
  const legal = await getLegalConfig();
  const year = new Date().getFullYear();

  const company = [
    { label: 'About us', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Events', href: '/events' },
    { label: 'Certifications', href: '/certifications' },
    ...(hasBlog ? [{ label: 'Blog', href: '/blog' }] : []),
    { label: 'Contact', href: '/contact' },
  ];
  const help = [
    { label: 'Compare products', href: '/compare' },
    { label: 'Which product for which job', href: '/product-guide' },
    { label: 'Catalogues', href: '/catalogues' },
    { label: 'Request samples', href: '/sample-request' },
    { label: 'Find a dealer', href: '/dealers' },
    { label: 'Become a dealer', href: '/become-a-dealer' },
  ];

  return (
    <footer className="ink-section on-dark mt-auto">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-md bg-white p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.jpg" alt={`${siteConfig.name} logo`} width={150} height={74} className="h-12 w-auto" loading="lazy" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            Three generations of the Chhabra family, in plywood and veneer since {siteConfig.foundedYear}.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
              <a href={siteConfig.address.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {siteConfig.address.oneLine}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
              <span>
                <a href={siteConfig.contact.phoneHref} className="hover:text-white">{siteConfig.contact.phone}</a>
                {', '}
                <a href={siteConfig.contact.phone2Href} className="hover:text-white">{siteConfig.contact.phone2}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">{siteConfig.contact.email}</a>
            </li>
          </ul>
          <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'footer' }} className="btn-whatsapp mt-6">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
          </TrackedLink>
        </div>

        <FooterCol title="Products">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="hover:text-white">
                {p.name}
                {p.standard ? <span className="text-white/45"> ({p.standard})</span> : null}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Specify and buy">
          {help.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-white">{l.label}</Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          {company.map((l) =>
            l.href === '/blog' ? (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white">{l.label}</a>
              </li>
            ) : (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">{l.label}</Link>
              </li>
            )
          )}
          <li className="pt-3 text-white/55">Sister brand</li>
          <li>
            <TrackedLink href={siteConfig.sisterBrand.url} external event="sister_brand_click" props={{ brand: 'woodlark', location: 'footer' }} className="hover:text-white">
              Woodlark: {siteConfig.sisterBrand.product} ↗
            </TrackedLink>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <p>
            {legal.copyrightText || `© ${year} ${siteConfig.copyrightHolder}. All rights reserved.`}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legal.pages.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="hover:text-white">{p.title}</Link>
            ))}
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Billion Ply on Facebook" className="hover:text-white"><Facebook className="h-4 w-4" /></a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Billion Ply on Instagram" className="hover:text-white"><Instagram className="h-4 w-4" /></a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Billion Ply on LinkedIn" className="hover:text-white"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{title}</h2>
      <ul className="mt-5 space-y-2.5 text-sm text-white/80">{children}</ul>
    </div>
  );
}
