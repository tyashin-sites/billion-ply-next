'use client';

import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { EventPhoto } from '@/data/company';

/**
 * Event photos as justified rows: every row is full width and the photos in a
 * row share one height, so nothing is cropped and no column ends short. Each
 * photo opens a lightbox with next/previous buttons, arrow keys, Escape and
 * swipe. Without JS the thumbnails still link to the full-size files.
 */
export function EventLightboxGallery({ photos, label }: { photos: EventPhoto[]; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = photos.length;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus({ preventScroll: true });
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const btns = [...document.querySelectorAll<HTMLButtonElement>('.lightbox .lightbox-btn')];
        if (!btns.length) return;
        const at = btns.indexOf(document.activeElement as HTMLButtonElement);
        e.preventDefault();
        btns[(at + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, close, step]);

  // Warm the neighbours so next/previous feel instant.
  useEffect(() => {
    if (index === null) return;
    for (const d of [1, -1]) {
      const img = new Image();
      img.src = photos[(index + d + count) % count].src;
    }
  }, [index, photos, count]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="event-rows" aria-label={`${label} photos`}>
        {photos.map((p, i) => {
          const ratio = p.width / p.height;
          return (
            <li key={p.src} style={{ flexGrow: ratio, flexBasis: `${ratio * 11.25}rem` }}>
              <a
                href={p.src}
                className="event-thumb"
                aria-label={`Enlarge photo ${i + 1} of ${count}: ${p.alt}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  openerRef.current = e.currentTarget;
                  setIndex(i);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
              </a>
            </li>
          );
        })}
      </ul>

      {mounted && current
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${label} photo ${index! + 1} of ${count}`}
              className="lightbox"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
              }}
            >
              <button ref={closeRef} type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label="Close">
                <X aria-hidden size={22} />
              </button>
              <button type="button" className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label="Previous photo">
                <ChevronLeft aria-hidden size={26} />
              </button>
              <figure className="lightbox-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={current.src} src={current.src} alt={current.alt} width={current.width} height={current.height} />
                <figcaption>
                  <span>{current.alt}</span>
                  <span className="lightbox-count" aria-live="polite">
                    {index! + 1} / {count}
                  </span>
                </figcaption>
              </figure>
              <button type="button" className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label="Next photo">
                <ChevronRight aria-hidden size={26} />
              </button>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
