'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { products } from '@/data/products';
import { track } from '@/lib/track';
import type { LeadType } from '@/lib/leads';
import { TrackedLink } from '@/components/TrackedLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

const COPY: Record<LeadType, { submit: string; done: string }> = {
  enquiry: { submit: 'Send enquiry', done: 'Thank you. Our team will get back to you shortly.' },
  dealer: { submit: 'Apply to become a dealer', done: 'Thank you. Our sales team will review your application and call you.' },
  sample: { submit: 'Request samples', done: 'Thank you. We will confirm your sample request and delivery by phone or email.' },
};

export function LeadForm({ type, defaultProduct }: { type: LeadType; defaultProduct?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, string> = { type };
    new FormData(form).forEach((v, k) => {
      if (typeof v === 'string') data[k] = v;
    });
    if (type === 'sample') {
      const picked = new FormData(form).getAll('sampleProducts').filter((v): v is string => typeof v === 'string');
      data.products = picked.join(', ');
      delete data.sampleProducts;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong');
      setStatus('done');
      track('generate_lead', { form: type });
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'done') {
    return (
      <div className="card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-leaf" aria-hidden="true" />
        <p className="mt-4 text-lg font-medium text-ink">{COPY[type].done}</p>
        <p className="mt-2 text-sm text-muted-foreground">Need it sooner? Message us on WhatsApp.</p>
        <TrackedLink href={siteConfig.contact.whatsappHref} external event="whatsapp_click" props={{ location: `form-${type}-done` }} className="btn-whatsapp mt-6">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp
        </TrackedLink>
      </div>
    );
  }

  const req = <span className="text-oak-deep" aria-hidden="true">*</span>;

  return (
    <form onSubmit={onSubmit} className="card grid gap-5 p-6 md:p-8" noValidate={false}>
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" req={req} />
        {(type === 'dealer' || type === 'sample') && (
          <Field label={type === 'dealer' ? 'Firm name' : 'Firm / studio'} name="firm" required={type === 'dealer'} autoComplete="organization" req={req} />
        )}
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" req={req} />
        <Field label="Email" name="email" type="email" required autoComplete="email" req={req} />
        {type === 'sample' && (
          <div>
            <label className="label" htmlFor="profession">You are</label>
            <select id="profession" name="profession" className="field">
              <option>Architect</option>
              <option>Interior designer</option>
              <option>Furniture or door manufacturer</option>
              <option>Contractor</option>
              <option>Other</option>
            </select>
          </div>
        )}
        {(type === 'dealer' || type === 'sample' || type === 'enquiry') && (
          <Field label="City" name="city" required={type !== 'enquiry'} autoComplete="address-level2" req={req} />
        )}
        {(type === 'dealer' || type === 'sample') && (
          <div>
            <label className="label" htmlFor="state">State {req}</label>
            <select id="state" name="state" required className="field" defaultValue="">
              <option value="" disabled>Select a state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {type === 'dealer' && (
        <Field label="Brands you carry today" name="brands" placeholder="e.g. plywood and veneer brands you stock" />
      )}

      {type === 'sample' && (
        <fieldset>
          <legend className="label">Samples needed {req}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {products.map((p) => (
              <label key={p.slug} className="flex items-center gap-2.5 rounded-md border bg-white px-3 py-2.5 text-sm">
                <input type="checkbox" name="sampleProducts" value={p.name} defaultChecked={p.slug === defaultProduct} className="h-4 w-4 accent-[hsl(var(--leaf-deep))]" />
                {p.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {type === 'sample' && <Field label="Delivery address" name="address" autoComplete="street-address" textarea rows={2} />}

      {type === 'enquiry' && (
        <div>
          <label className="label" htmlFor="products">Product of interest</label>
          <select id="products" name="products" className="field" defaultValue={defaultProduct ? products.find((p) => p.slug === defaultProduct)?.name : ''}>
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>
      )}

      <Field
        label={type === 'enquiry' ? 'Your message' : 'Anything else we should know?'}
        name="message"
        textarea
        rows={4}
        required={type === 'enquiry'}
        req={req}
        placeholder={type === 'enquiry' ? 'Tell us about your project, quantities and timeline' : undefined}
      />

      {status === 'error' && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{error}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : COPY[type].submit}
        </button>
        <p className="text-xs text-muted-foreground">We use your details only to reply to this request.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  textarea = false,
  rows,
  placeholder,
  autoComplete,
  req,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  autoComplete?: string;
  req?: React.ReactNode;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label} {required ? req : null}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={rows} required={required} placeholder={placeholder} className="field" />
      ) : (
        <input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className="field" />
      )}
    </div>
  );
}
