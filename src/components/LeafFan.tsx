'use client';

import { useEffect, useRef } from 'react';

const LEAVES = [
  { src: '/images/veneers/teak.jpg', alt: 'Teak veneer leaf' },
  { src: '/images/veneers/natural.jpg', alt: 'Natural veneer leaf' },
  { src: '/images/veneers/exotic.jpg', alt: 'Exotic veneer leaf' },
];

/**
 * Hero signature: three real veneer leaves, stacked, fan open after first
 * paint (transform-only, nothing hidden, so the LCP image counts from the
 * first frame). A light pointer lean follows fine pointers only.
 */
export function LeafFan() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = requestAnimationFrame(() => el.setAttribute('data-open', 'true'));
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return () => cancelAnimationFrame(id);
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]" style={{ transition: 'transform 600ms var(--ease-brand)' }} ref={ref} data-open="false">
      <div className="leaf-fan absolute inset-0">
        {LEAVES.map((l, i) => (
          <div
            key={l.src}
            className="absolute inset-x-[12%] inset-y-[6%] overflow-hidden rounded-[10px] shadow-hover ring-1 ring-black/5"
            style={{ zIndex: i + 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={l.src}
              alt={l.alt}
              className="h-full w-full object-cover"
              {...(i === 2 ? { fetchPriority: 'high' as const } : { loading: 'eager' as const })}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
