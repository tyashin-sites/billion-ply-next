import Link from 'next/link';
import { siteConfig, PRIMARY_CTA } from '@/config/site';
import { CtaLink } from './CtaLink';
import { MobileNav } from './MobileNav';
import { BrandMark } from './BrandMark';
import { NavChildLink } from './NavChildLink';
import { CartLink } from '@/components/store/CartLink';
import { storeClientConfig } from '@/lib/commerce';

export function Header() {
  return (
    <header className="site-header border-border bg-background/85 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="header-bar container-x flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          <BrandMark />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) =>
            item.children?.length ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="nav-link text-foreground/80 hover:text-foreground whitespace-nowrap text-[15px] font-medium transition-colors"
                >
                  {item.label}
                </Link>
                {/* CSS-only dropdown: opens on hover and on keyboard focus. */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="bg-background border-border grid w-72 gap-0.5 rounded-lg border p-2 shadow-lg">
                    {item.children.map((c) => (
                      <li key={`${c.href ?? ''}${c.label}`}>
                        <NavChildLink
                          item={c}
                          className={`hover:bg-surface rounded-md px-3 py-1.5 ${c.depth ? 'text-foreground/80 text-sm' : 'text-[15px] font-medium'}`}
                          labelClassName="text-muted px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em]"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-foreground/80 hover:text-foreground whitespace-nowrap text-[15px] font-medium transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {siteConfig.commerce?.enabled ? <CartLink client={storeClientConfig()} /> : null}
          {PRIMARY_CTA ? <CtaLink cta={PRIMARY_CTA} className="hidden sm:inline-flex" /> : null}
          <MobileNav nav={siteConfig.nav} cta={PRIMARY_CTA} />
        </div>
      </div>
    </header>
  );
}
