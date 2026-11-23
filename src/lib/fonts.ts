import { Fraunces, Manrope } from 'next/font/google';

/** Display: a soft, crafted serif for a three-generation family maker. */
export const displayFont = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

/** Body: a clean, technical sans for specs and tables. */
export const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});
