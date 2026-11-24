'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Search } from 'lucide-react';
import { searchDealers, statesOf, type Dealer } from '@/lib/dealer-search';
import { TrackedLink } from './TrackedLink';

const field =
  'border-border bg-background focus:border-primary w-full rounded-md border px-3 py-2.5 outline-none transition-colors';

/**
 * Search by city / pincode / state over src/data/dealers.json (validated on
 * the server). No match, including while the list is empty, sends the
 * visitor to the team: dealers are never invented.
 */
export function DealerLocator({
  dealers,
  whatsappUrl,
  telUrl,
  phoneDisplay,
}: {
  dealers: Dealer[];
  whatsappUrl: string | null;
  telUrl: string | null;
  phoneDisplay: string | null;
}) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('');
  const [asked, setAsked] = useState(false);
  const states = useMemo(() => statesOf(dealers), [dealers]);
  const results = useMemo(() => searchDealers(dealers, query, state), [dealers, query, state]);
  const show = asked && (query.trim() !== '' || state !== '');

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form
        role="search"
        className="bg-surface h-fit rounded-lg p-6 sm:p-8 lg:col-span-5"
        onSubmit={(e) => {
          e.preventDefault();
          setAsked(true);
        }}
      >
        <h2 className="tt-3">Search by city or state</h2>
        <label htmlFor="dealer-q" className="mt-6 block text-sm">City, pincode or dealer name</label>
        <div className="relative mt-1.5">
          <Search className="text-muted pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden />
          <input
            id="dealer-q"
            className={`${field} pl-9`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setAsked(true);
            }}
            placeholder="e.g. Gurugram or 122001"
            autoComplete="address-level2"
          />
        </div>
        {states.length ? (
          <>
            <label htmlFor="dealer-state" className="mt-5 block text-sm">State</label>
            <select
              id="dealer-state"
              className={`${field} mt-1.5`}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setAsked(true);
              }}
            >
              <option value="">All states</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </>
        ) : null}
        <button type="submit" className="btn btn-primary mt-6 w-full justify-center">Find dealers</button>
        <p className="text-muted mt-4 text-xs">Billionply works with 1000+ dealers across India.</p>
      </form>

      <div aria-live="polite" className="lg:col-span-7">
        {!show ? (
          <div className="border-border text-muted flex h-full min-h-64 flex-col justify-center rounded-lg border border-dashed p-8">
            <MapPin className="text-primary h-8 w-8" aria-hidden />
            <p className="mt-4 max-w-md">Enter your city, pincode or state to see Billionply dealers near you.</p>
          </div>
        ) : results.length ? (
          <ul className="grid gap-4">
            <li className="text-muted text-sm">
              {results.length} dealer{results.length === 1 ? '' : 's'} found
            </li>
            {results.map((d) => (
              <li key={`${d.name}-${d.city}`} className="card p-5">
                <p className="font-heading text-lg">{d.name}</p>
                <p className="text-muted mt-1 text-sm">{[d.address, d.city, d.state, d.pincode].filter(Boolean).join(', ')}</p>
                {d.phone ? (
                  <a href={`tel:${d.phone.replace(/[^+\d]/g, '')}`} className="text-primary mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                    <Phone className="h-4 w-4" aria-hidden /> {d.phone}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="card p-8">
            <p className="tt-3">Contact us for your nearest dealer</p>
            <p className="text-muted mt-3">Tell us your city and we will connect you with the Billionply dealer who serves your area.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {whatsappUrl ? (
                <TrackedLink href={whatsappUrl} event="whatsapp_click" props={{ location: 'dealer-locator' }} className="btn btn-primary">
                  WhatsApp us
                </TrackedLink>
              ) : null}
              {telUrl && phoneDisplay ? (
                <a href={telUrl} className="btn btn-ghost">
                  <Phone className="h-4 w-4" aria-hidden /> {phoneDisplay}
                </a>
              ) : null}
              <Link href="/contact" className="btn btn-ghost">Send an enquiry</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
