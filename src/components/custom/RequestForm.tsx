'use client';

import { useEffect, useRef, useState } from 'react';
import { LEAD_SUBMIT_PATH } from '@/components/kit/LeadForm';
import { LEAD_SOURCES, leadMessage, leadProblem, leadSubject, type LeadFields, type LeadType } from '@/lib/leads';

/**
 * Dealer application and sample request: the kit LeadForm protocol (POST to
 * Tyashin's public lead endpoint with _apiKey, honeypot and renderedAt; 429
 * plan limit shown politely) with the extra fields these two forms need. Each
 * type has its own lead `source` so the Leads inbox can tell them apart.
 */

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

const field =
  'border-border bg-background focus:border-primary w-full rounded-md border px-3 py-2.5 outline-none transition-colors';

type State = 'idle' | 'sending' | 'sent' | 'error' | 'limit';

const DONE: Record<LeadType, string> = {
  enquiry: 'Thank you. Your message has been sent.',
  dealer: 'Thank you. Our sales team will review your application and call you.',
  sample: 'Thank you. We will confirm your sample request by phone or email.',
};
const SUBMIT: Record<LeadType, string> = {
  enquiry: 'Send message',
  dealer: 'Apply to become a dealer',
  sample: 'Request samples',
};

export function RequestForm({
  type,
  apiUrl,
  apiKey,
  products = [],
  defaultProduct,
  fallback,
}: {
  type: LeadType;
  apiUrl: string;
  apiKey: string;
  /** Product names offered in the sample checklist / enquiry select. */
  products?: string[];
  defaultProduct?: string;
  /** Shown when the lead can't be taken (limit reached, network error). */
  fallback?: string;
}) {
  const renderedAt = useRef(0);
  const sentRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<State>('idle');
  const [problem, setProblem] = useState('');
  useEffect(() => {
    renderedAt.current = Date.now();
    setReady(true);
  }, []);
  useEffect(() => {
    if (state === 'sent') sentRef.current?.focus();
  }, [state]);
  const configured = Boolean(apiUrl && apiKey);
  const reach = fallback ? ` ${fallback}` : '';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured || state === 'sending') return;
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? '').trim();
    const fields: LeadFields = {
      type,
      name: get('name'),
      email: get('email'),
      phone: get('phone'),
      message: get('message'),
      firm: get('firm'),
      city: get('city'),
      state: get('state'),
      brands: get('brands'),
      profession: get('profession'),
      address: get('address'),
      products:
        type === 'sample'
          ? form.getAll('samples').map(String).join(', ')
          : get('product'),
    };
    const p = leadProblem(fields);
    setProblem(p ?? '');
    if (p) return;
    setState('sending');
    try {
      const res = await fetch(`${apiUrl.replace(/\/+$/, '')}${LEAD_SUBMIT_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _apiKey: apiKey,
          name: fields.name,
          email: fields.email,
          phone: fields.phone || undefined,
          company: fields.firm || undefined,
          subject: leadSubject(fields),
          message: leadMessage(fields),
          pageUrl: window.location.href.slice(0, 500),
          source: LEAD_SOURCES[type],
          company_website: String(form.get('company_website') ?? ''),
          renderedAt: renderedAt.current,
        }),
      });
      if (res.ok) return setState('sent');
      const code =
        res.status === 429
          ? await res
              .json()
              .then((b: { error?: { code?: string } }) => b?.error?.code)
              .catch(() => undefined)
          : undefined;
      setState(code === 'LEAD_LIMIT_REACHED' ? 'limit' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent')
    return (
      <p ref={sentRef} tabIndex={-1} role="status" className="bg-surface rounded-lg p-8 font-medium outline-none">
        {DONE[type]}
      </p>
    );

  const req = <span className="text-accent" aria-hidden>*</span>;

  return (
    <form method="post" onSubmit={onSubmit} aria-busy={state === 'sending'} className="bg-surface grid gap-5 rounded-lg p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span>Your name {req}</span>
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        {type !== 'enquiry' ? (
          <label className="grid gap-1.5 text-sm">
            <span>{type === 'dealer' ? <>Firm name {req}</> : 'Firm or studio'}</span>
            <input name="firm" required={type === 'dealer'} maxLength={200} autoComplete="organization" className={field} />
          </label>
        ) : null}
        <label className="grid gap-1.5 text-sm">
          <span>Phone {type !== 'enquiry' ? req : '(optional)'}</span>
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span>Email {req}</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </label>
        {type === 'sample' ? (
          <label className="grid gap-1.5 text-sm">
            <span>You are</span>
            <select name="profession" className={field} defaultValue="Architect">
              <option>Architect</option>
              <option>Interior designer</option>
              <option>Furniture or door manufacturer</option>
              <option>Contractor</option>
              <option>Other</option>
            </select>
          </label>
        ) : null}
        <label className="grid gap-1.5 text-sm">
          <span>City {type === 'dealer' ? req : null}</span>
          <input name="city" maxLength={100} autoComplete="address-level2" className={field} />
        </label>
        {type !== 'enquiry' ? (
          <label className="grid gap-1.5 text-sm">
            <span>State {type === 'dealer' ? req : null}</span>
            <select name="state" className={field} defaultValue="">
              <option value="">Select a state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        ) : null}
        {type === 'enquiry' && products.length ? (
          <label className="grid gap-1.5 text-sm">
            <span>Product of interest</span>
            <select name="product" className={field} defaultValue={defaultProduct ?? ''}>
              <option value="">Not sure yet</option>
              {products.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {type === 'dealer' ? (
        <label className="grid gap-1.5 text-sm">
          <span>Brands you carry today</span>
          <input name="brands" maxLength={200} className={field} />
        </label>
      ) : null}

      {type === 'sample' ? (
        <fieldset className="grid gap-2">
          <legend className="mb-1.5 text-sm">Samples needed {req}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.map((p) => (
              <label key={p} className="border-border bg-background flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm">
                <input type="checkbox" name="samples" value={p} defaultChecked={p === defaultProduct} className="accent-[var(--brand-primary)] h-4 w-4" />
                {p}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
      {type === 'sample' ? (
        <label className="grid gap-1.5 text-sm">
          <span>Delivery address</span>
          <textarea name="address" rows={2} maxLength={500} autoComplete="street-address" className={field} />
        </label>
      ) : null}

      <label className="grid gap-1.5 text-sm">
        <span>{type === 'enquiry' ? <>Message {req}</> : 'Anything else we should know?'}</span>
        <textarea name="message" rows={4} maxLength={4000} className={field} />
      </label>

      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" disabled={!ready || !configured || state === 'sending'} className="btn btn-primary justify-self-start disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : SUBMIT[type]}
      </button>
      <p aria-live="polite" className="text-muted text-sm">
        {!configured && 'The form is available on the live site.'}
        {problem}
        {state === 'error' && `Your message could not be sent.${reach}`}
        {state === 'limit' && `We can’t take more messages online right now.${reach}`}
      </p>
    </form>
  );
}
