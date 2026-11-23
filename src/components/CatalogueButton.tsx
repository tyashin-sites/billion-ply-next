import { Download } from 'lucide-react';
import { catalogues } from '@/data/catalogues';
import { TrackedLink } from '@/components/TrackedLink';

/** Download CTA for one catalogue; emits `catalogue_download`. */
export function CatalogueButton({
  catalogue,
  location,
  label,
  variant = 'primary',
}: {
  catalogue: string;
  location: string;
  label?: string;
  variant?: 'primary' | 'ghost';
}) {
  const c = catalogues[catalogue];
  if (!c) return null;
  return (
    <TrackedLink
      href={c.href}
      external
      event="catalogue_download"
      props={{ catalogue: c.key, location }}
      className={variant === 'primary' ? 'btn-primary' : 'btn-ghost'}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {label || `Download ${c.title}`}
      <span className="sr-only"> ({c.sizeLabel})</span>
    </TrackedLink>
  );
}
