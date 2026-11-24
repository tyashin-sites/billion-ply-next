'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/track';

/**
 * An <a> that reports a business event on the Tyashin events bus when clicked
 * (catalogue downloads, WhatsApp, the Woodlark link). No analytics code here:
 * installed analytics plugins pick the event up (SITE_EVENTS addendum).
 */
export function TrackedLink({
  href,
  event,
  props,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  event: string;
  props?: Record<string, string>;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const external = /^https?:/.test(href) || href.startsWith('/downloads/') || href.endsWith('.pdf');
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, props)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
