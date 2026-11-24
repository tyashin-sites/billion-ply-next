/**
 * Responsive images against Tyashin's media endpoint (platform-owned).
 *
 * Library photos are served from `…/api/v1/public/media/*`. With the project's
 * image optimization on (Studio switches the free tier on for kit sites), the
 * endpoint resizes and re-encodes to AVIF/WebP from `?w=` + `f=auto` and the
 * request's Accept header, so a `srcSet` of `?w=` variants of the SAME URL lets
 * the browser fetch a phone-sized file instead of the 2 MB original (Sampéa
 * mobile LCP 4–6 s, OB-69). Any other URL is returned untouched, and with
 * optimization off the endpoint ignores the params and serves the original, so
 * an image can never break because of this.
 */
export const WIDTHS = [480, 768, 1080, 1440, 1920] as const;

function isMediaUrl(url: string): boolean {
  return /\/api\/v1\/public\/media\//.test(url);
}

export function optimizedSrc(url: string, width: number): string {
  if (!url || !isMediaUrl(url)) return url;
  const [path, q] = url.split('?');
  const params = new URLSearchParams(q || '');
  params.set('w', String(Math.round(width)));
  params.set('f', 'auto');
  return `${path}?${params.toString()}`;
}

/** `srcSet` with width descriptors; undefined for non-media URLs. */
export function srcSetFor(url: string, widths: readonly number[] = WIDTHS): string | undefined {
  if (!url || !isMediaUrl(url)) return undefined;
  return widths.map((w) => `${optimizedSrc(url, w)} ${w}w`).join(', ');
}
