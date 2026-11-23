'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { products } from '@/data/products';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { cn } from '@/lib/utils';

export function Header({ hasBlog = false }: { hasBlog?: boolean }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Condense on scroll by class toggle only (no height change: CLS law).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const nav = hasBlog ? [...siteConfig.nav, { label: 'Blog', href: '/blog' }] : [...siteConfig.nav];
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header ref={headerRef} className="site-header fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="container flex h-[80px] items-center justify-between gap-6">
        <Link href="/" className="brand-logo flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-header.jpg" alt={`${siteConfig.name} logo`} width={690} height={364} className="h-[60px] w-auto mix-blend-multiply sm:h-[66px] lg:h-[70px]" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <Link
              href="/products"
              className={cn('rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-leaf-deep', isActive('/products') && 'text-leaf-deep')}
              aria-haspopup="true"
              aria-expanded={productsOpen}
              onFocus={() => setProductsOpen(true)}
            >
              Products
            </Link>
            <div
              className={cn(
                'absolute left-0 top-full w-72 pt-2 transition-all duration-200',
                productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              )}
            >
              <ul className="card p-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className="flex items-baseline justify-between rounded-md px-3 py-2 text-sm hover:bg-leaf-tint" onBlur={() => setProductsOpen(false)}>
                      <span>{p.name}</span>
                      {p.standard && <span className="text-xs text-muted-foreground">{p.standard}</span>}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t pt-1">
                  <TrackedLink
                    href={siteConfig.woodlark.url}
                    external
                    event="woodlark_click"
                    props={{ brand: 'woodlark', location: 'nav' }}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-oak-tint"
                  >
                    <span>Premium Hybrid Veneer by Woodlark</span>
                    <span aria-hidden="true">↗</span>
                  </TrackedLink>
                </li>
              </ul>
            </div>
          </div>
          {nav.slice(1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn('rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-leaf-deep', isActive(l.href) && 'text-leaf-deep')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/contact" className="btn-ghost !px-5 !py-2.5">
            Contact
          </Link>
          <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'header' }} className="btn-whatsapp !px-5 !py-2.5">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </TrackedLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border xl:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t bg-background xl:hidden">
          <nav className="container flex flex-col py-4" aria-label="Mobile">
            <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Products</p>
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="rounded-md px-2 py-2.5 text-base">
                {p.name}
              </Link>
            ))}
            <div className="grain-rule my-3" />
            {[...nav.slice(1), { label: 'Catalogues', href: '/catalogues' }, { label: 'Become a dealer', href: '/become-a-dealer' }, { label: 'Contact', href: '/contact' }].map((l) => (
              <a key={l.href} href={l.href} className="rounded-md px-2 py-2.5 text-base">
                {l.label}
              </a>
            ))}
            <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'mobile-menu' }} className="btn-whatsapp mt-4">
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </TrackedLink>
          </nav>
        </div>
      )}
    </header>
  );
}
