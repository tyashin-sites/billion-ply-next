/**
 * The three Billionply forms (enquiry, dealer application, sample request).
 * Pure helpers, no imports, so tests/leads.test.mjs runs them with plain Node.
 *
 * Every form posts to Tyashin's public lead endpoint (the kit's LeadForm
 * protocol, authoring contract "leads"). Each type gets its own `source` and
 * a subject prefix so marketing can tell leads apart in the Leads inbox.
 */

export type LeadType = 'enquiry' | 'dealer' | 'sample';

export const LEAD_SOURCES: Record<LeadType, string> = {
  enquiry: 'contact-form',
  dealer: 'dealer-application',
  sample: 'sample-request',
};

export const LEAD_SUBJECTS: Record<LeadType, string> = {
  enquiry: 'Website enquiry',
  dealer: 'Become a dealer',
  sample: 'Sample request',
};

export interface LeadFields {
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  firm?: string;
  city?: string;
  state?: string;
  brands?: string;
  profession?: string;
  products?: string;
  address?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

/** Returns the first problem a visitor must fix, or null when the lead is sendable. */
export function leadProblem(f: LeadFields): string | null {
  if (!f.name?.trim()) return 'Please enter your name.';
  if (!f.email?.trim() || !EMAIL_RE.test(f.email.trim())) return 'Please enter a valid email.';
  const phone = f.phone?.trim() ?? '';
  if (f.type !== 'enquiry' && !phone) return 'Please enter a phone number.';
  if (phone && !PHONE_RE.test(phone)) return 'Please enter a valid phone number.';
  if (f.type === 'dealer') {
    if (!f.firm?.trim()) return 'Please enter your firm name.';
    if (!f.city?.trim()) return 'Please enter your city.';
    if (!f.state?.trim()) return 'Please choose your state.';
  }
  if (f.type === 'sample' && !f.products?.trim()) return 'Please choose the samples you need.';
  if (f.type === 'enquiry' && !f.message?.trim()) return 'Please add a short message.';
  return null;
}

/** The message body Tyashin stores: every field, labelled. */
export function leadMessage(f: LeadFields): string {
  const lines: string[] = [];
  const add = (label: string, v?: string) => {
    if (v && v.trim()) lines.push(`${label}: ${v.trim()}`);
  };
  add('Firm', f.firm);
  add('Profession', f.profession);
  add('City', f.city);
  add('State', f.state);
  add('Brands currently carried', f.brands);
  add('Product of interest', f.type === 'enquiry' ? f.products : undefined);
  add('Samples needed', f.type === 'sample' ? f.products : undefined);
  add('Delivery address', f.address);
  if (f.message && f.message.trim()) {
    if (lines.length) lines.push('');
    lines.push(f.message.trim());
  }
  return (lines.join('\n') || '(no message)').slice(0, 5000);
}

export function leadSubject(f: LeadFields): string {
  const where = [f.city, f.state].filter((v) => v && v.trim()).join(', ');
  return `[${LEAD_SUBJECTS[f.type]}] ${(f.firm || f.name).trim()}${where ? ` (${where})` : ''}`.slice(
    0,
    200
  );
}
