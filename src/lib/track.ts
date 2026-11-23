/**
 * Custom business events on the Tyashin events bus (SITE_EVENTS_ADDENDUM).
 * Installed analytics plugins (YOM, Google tag) pick them up; with none
 * installed this is a no-op. Never put names, emails or phones in props.
 *
 * Events this site emits:
 *   catalogue_download { catalogue, location }
 *   whatsapp_click     { location }
 *   generate_lead      { form }        form = enquiry | dealer | sample
 *   woodlark_click { brand }
 */
export function track(name: string, props: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('tyashin:event', { detail: { name, props, ts: Date.now() } }));
  } catch {
    /* never block the click */
  }
}
