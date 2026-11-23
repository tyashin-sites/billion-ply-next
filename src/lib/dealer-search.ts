/**
 * Dealer locator logic (pure, no imports, so tests/dealers.test.mjs can run it
 * with plain Node).
 *
 * Data lives in src/data/dealers.json, an editable list. It is empty until the
 * client sends a dealer list; the site never invents dealers. Shape of one row:
 *
 *   {
 *     "name": "Firm name",               required
 *     "city": "Gurugram",                required
 *     "state": "Haryana",                required
 *     "address": "Shop 4, ...",          optional
 *     "pincode": "122001",               optional
 *     "phone": "+91 ...",                optional
 *     "email": "...",                    optional
 *     "products": ["decorative-veneer"], optional, product slugs
 *     "lat": 28.45, "lng": 77.02         optional, for a future map
 *   }
 */

export interface Dealer {
  name: string;
  city: string;
  state: string;
  address?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  products?: string[];
  lat?: number;
  lng?: number;
}

const clean = (s: unknown): string => (typeof s === 'string' ? s.trim() : '');

export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Drops malformed rows (missing name/city/state) so bad data never renders. */
export function validDealers(rows: unknown): Dealer[] {
  if (!Array.isArray(rows)) return [];
  const out: Dealer[] = [];
  for (const r of rows) {
    if (!r || typeof r !== 'object') continue;
    const o = r as Record<string, unknown>;
    const name = clean(o.name);
    const city = clean(o.city);
    const state = clean(o.state);
    if (!name || !city || !state) continue;
    const d: Dealer = { name, city, state };
    for (const k of ['address', 'pincode', 'phone', 'email'] as const) {
      const v = clean(o[k]);
      if (v) d[k] = v;
    }
    if (Array.isArray(o.products)) d.products = o.products.filter((p): p is string => typeof p === 'string');
    if (typeof o.lat === 'number' && typeof o.lng === 'number') {
      d.lat = o.lat;
      d.lng = o.lng;
    }
    out.push(d);
  }
  return out.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
}

export function statesOf(dealers: Dealer[]): string[] {
  return [...new Set(dealers.map((d) => d.state))].sort((a, b) => a.localeCompare(b));
}

/**
 * Filter by state (exact, optional) and a free-text query matched against
 * city, state, pincode and firm name. An empty query with no state returns
 * nothing: the locator shows results only after the visitor asks.
 */
export function searchDealers(dealers: Dealer[], query: string, state = ''): Dealer[] {
  const q = norm(query);
  const st = norm(state);
  if (!q && !st) return [];
  return dealers.filter((d) => {
    if (st && norm(d.state) !== st) return false;
    if (!q) return true;
    const hay = norm([d.city, d.state, d.pincode ?? '', d.name].join(' '));
    return q.split(' ').every((t) => hay.includes(t));
  });
}
