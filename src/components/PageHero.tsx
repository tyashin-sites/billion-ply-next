import type { ReactNode } from 'react';
import Link from 'next/link';

/** Inner-page hero: eyebrow, title, lead, optional actions and breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  crumbs,
  image,
  imageAlt = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  crumbs?: { name: string; href?: string }[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-paper">
      <div className={`container grid items-center gap-10 py-14 md:py-20 ${image ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
        <div className="max-w-3xl">
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link href="/" className="hover:text-ink">Home</Link></li>
                {crumbs.map((c) => (
                  <li key={c.name} className="flex items-center gap-1.5">
                    <span aria-hidden="true">/</span>
                    {c.href ? <Link href={c.href} className="hover:text-ink">{c.name}</Link> : <span aria-current="page" className="text-ink">{c.name}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="display-lg">{title}</h1>
          {lead && <div className="lead mt-6 max-w-2xl">{lead}</div>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={imageAlt} className="h-full w-full object-cover" fetchPriority="high" />
          </div>
        )}
      </div>
    </section>
  );
}
