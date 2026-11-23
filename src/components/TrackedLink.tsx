'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/track';

/** An <a> that emits a tyashin:event on click (downloads, WhatsApp, Woodlark). */
export function TrackedLink({
  href,
  event,
  props,
  className,
  children,
  external = false,
  download = false,
  ariaLabel,
}: {
  href: string;
  event: string;
  props?: Record<string, string>;
  className?: string;
  children: ReactNode;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, props)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
    </a>
  );
}
