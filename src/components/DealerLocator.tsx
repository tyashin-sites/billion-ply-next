'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Search } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { searchDealers, statesOf, type Dealer } from '@/lib/dealer-search';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

/**
 * Dealer locator: search by city / state / pincode. Data comes from
 * src/data/dealers.json (validated server-side and passed in). When nothing
 * matches (including while the list is empty) the visitor is sent to the
 * team, never to an invented dealer.
 */
export function DealerLocator({ dealers }: { dealers: Dealer[] }) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const states = useMemo(() => statesOf(dealers), [dealers]);
  const results = useMemo(() => searchDealers(dealers, query, state), [dealers, query, state]);
  const asked = submitted && (query.trim() !== '' || state !== '');

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        className="card h-fit p-6 md:p-8"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <h2 className="display-md">Search by city or state</h2>
        <label htmlFor="dealer-q" className="label mt-6">City, pincode or dealer name</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="dealer-q"
            className="field pl-10"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSubmitted(true);
            }}
            placeholder="e.g. Gurugram or 122001"
            autoComplete="address-level2"
          />
        </div>
        {states.length > 0 && (
          <>
            <label htmlFor="dealer-state" className="label mt-5">State</label>
            <select
              id="dealer-state"
              className="field"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setSubmitted(true);
              }}
            >
              <option value="">All states</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </>
        )}
        <button type="submit" className="btn-primary mt-6 w-full">Find dealers</button>
        <p className="mt-4 text-xs text-muted-foreground">
          Billion Ply works with 1000+ dealers across India.
        </p>
      </form>

      <div aria-live="polite">
        {!asked && (
          <div className="flex h-full min-h-64 flex-col justify-center rounded-lg border border-dashed p-8 text-muted-foreground">
            <MapPin className="h-8 w-8 text-leaf" aria-hidden="true" />
            <p className="mt-4 max-w-md">Enter your city, pincode or state to see Billion Ply dealers near you.</p>
          </div>
        )}

        {asked && results.length > 0 && (
          <ul className="grid gap-4">
            <li className="text-sm text-muted-foreground">{results.length} dealer{results.length === 1 ? '' : 's'} found</li>
            {results.map((d) => (
              <li key={`${d.name}-${d.city}`} className="card p-5">
                <p className="font-display text-lg text-ink">{d.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {[d.address, d.city, d.state, d.pincode].filter(Boolean).join(', ')}
                </p>
                {d.phone && (
                  <a href={`tel:${d.phone.replace(/[^+\d]/g, '')}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-leaf-deep">
                    <Phone className="h-4 w-4" aria-hidden="true" /> {d.phone}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        {asked && results.length === 0 && (
          <div className="card p-8">
            <p className="font-display text-2xl text-ink">Contact us for your nearest dealer</p>
            <p className="mt-3 text-muted-foreground">
              Tell us your city and we will connect you with the Billion Ply dealer who serves your area.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: 'dealer-locator' }} className="btn-whatsapp">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
              </TrackedLink>
              <a href={siteConfig.contact.phoneHref} className="btn-ghost">
                <Phone className="h-4 w-4" aria-hidden="true" /> {siteConfig.contact.phone}
              </a>
              <Link href="/contact" className="btn-ghost">Send an enquiry</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
