/**
 * Lead validation for the three site forms (pure: no imports, tested by
 * tests/leads.test.mjs). Each form is a separate lead type so marketing can
 * tell general enquiries, dealer applications and sample requests apart:
 * the type sets the `source` and the subject prefix sent to the Tyashin
 * Contact Form & Lead Capture plugin.
 */

export type LeadType = 'enquiry' | 'dealer' | 'sample';

export interface Lead {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message: string;
  firm?: string;
  city?: string;
  state?: string;
  brands?: string;
  profession?: string;
  products?: string;
  address?: string;
}

export const LEAD_SOURCES: Record<LeadType, string> = {
  enquiry: 'billionply-website-enquiry',
  dealer: 'billionply-website-dealer-application',
  sample: 'billionply-website-sample-request',
};

export const LEAD_SUBJECTS: Record<LeadType, string> = {
  enquiry: 'Website enquiry',
  dealer: 'Become a dealer',
  sample: 'Sample request',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export type LeadResult = { ok: true; lead: Lead } | { ok: false; error: string };

export function validateLead(body: unknown): LeadResult {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const type = b.type;
  if (type !== 'enquiry' && type !== 'dealer' && type !== 'sample') {
    return { ok: false, error: 'Unknown form' };
  }
  // Honeypot: real visitors never see or fill this field.
  if (str(b.website, 200)) return { ok: false, error: 'Rejected' };

  const lead: Lead = {
    type,
    name: str(b.name, 100),
    email: str(b.email, 200),
    phone: str(b.phone, 40),
    message: str(b.message, 5000),
  };
  for (const k of ['firm', 'city', 'state', 'brands', 'profession', 'products', 'address'] as const) {
    const v = str(b[k], k === 'address' ? 500 : 200);
    if (v) lead[k] = v;
  }

  if (!lead.name) return { ok: false, error: 'Please enter your name' };
  if (!lead.phone || !PHONE_RE.test(lead.phone)) return { ok: false, error: 'Please enter a valid phone number' };
  if (type === 'dealer') {
    if (!lead.email || !EMAIL_RE.test(lead.email)) return { ok: false, error: 'Please enter a valid email' };
    if (!lead.firm) return { ok: false, error: 'Please enter your firm name' };
    if (!lead.city) return { ok: false, error: 'Please enter your city' };
    if (!lead.state) return { ok: false, error: 'Please enter your state' };
  } else {
    if (lead.email && !EMAIL_RE.test(lead.email)) return { ok: false, error: 'Please enter a valid email' };
    if (!lead.email) return { ok: false, error: 'Please enter your email' };
  }
  if (type === 'sample' && !lead.products) return { ok: false, error: 'Please tell us which samples you need' };
  if (type === 'enquiry' && !lead.message) return { ok: false, error: 'Please add a short message' };
  return { ok: true, lead };
}

/** The message body forwarded to the platform: every field, labelled. */
export function leadMessage(lead: Lead): string {
  const lines: string[] = [];
  const add = (label: string, v?: string) => {
    if (v) lines.push(`${label}: ${v}`);
  };
  add('Firm', lead.firm);
  add('Profession', lead.profession);
  add('City', lead.city);
  add('State', lead.state);
  add('Brands currently carried', lead.brands);
  add('Samples needed', lead.products);
  add('Delivery address', lead.address);
  if (lead.message) {
    if (lines.length) lines.push('');
    lines.push(lead.message);
  }
  return lines.join('\n') || '(no message)';
}

export function leadSubject(lead: Lead): string {
  const where = [lead.city, lead.state].filter(Boolean).join(', ');
  return `[${LEAD_SUBJECTS[lead.type]}] ${lead.firm || lead.name}${where ? ` (${where})` : ''}`;
}
