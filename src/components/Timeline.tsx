'use client';

import { useEffect, useRef } from 'react';
import { timeline } from '@/data/company';

/** Legacy timeline; its spine draws as you scroll (scaleY only). */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
      el.style.setProperty('--progress', p.toFixed(3));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative ml-3 md:ml-0">
      <span aria-hidden="true" className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-border md:left-[7.5rem]" />
      <span aria-hidden="true" className="timeline-line absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-oak to-leaf md:left-[7.5rem]" />
      {timeline.map((t) => (
        <li key={t.title} className="relative grid gap-1 pb-10 pl-8 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-10 md:pl-0">
          <span aria-hidden="true" className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-leaf ring-4 ring-background md:left-[calc(7.5rem-5px)]" />
          <p className="font-display text-2xl text-oak-deep md:text-right md:pr-6">{t.year ?? ''}</p>
          <div className="md:pl-4">
            <h3 className="text-xl">{t.title}</h3>
            <p className="mt-1.5 max-w-xl text-muted-foreground">{t.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
