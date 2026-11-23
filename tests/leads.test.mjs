import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, leadSubject, leadMessage, LEAD_SOURCES } from '../src/lib/leads.ts';

const base = { name: 'Asha', phone: '+91 98100 00000', email: 'asha@example.com' };

test('each form has its own source so leads can be told apart', () => {
  assert.equal(new Set(Object.values(LEAD_SOURCES)).size, 3);
});

test('dealer form needs firm, city, state and email', () => {
  const r = validateLead({ type: 'dealer', ...base, city: 'Pune' });
  assert.equal(r.ok, false);
  const ok = validateLead({ type: 'dealer', ...base, firm: 'Asha Ply', city: 'Pune', state: 'Maharashtra', brands: 'X, Y' });
  assert.equal(ok.ok, true);
  assert.match(leadSubject(ok.lead), /^\[Become a dealer\] Asha Ply \(Pune, Maharashtra\)$/);
  assert.match(leadMessage(ok.lead), /Brands currently carried: X, Y/);
});

test('enquiry needs a message; sample needs products', () => {
  assert.equal(validateLead({ type: 'enquiry', ...base }).ok, false);
  assert.equal(validateLead({ type: 'enquiry', ...base, message: 'Hi' }).ok, true);
  assert.equal(validateLead({ type: 'sample', ...base, city: 'Delhi', state: 'Delhi' }).ok, false);
  assert.equal(validateLead({ type: 'sample', ...base, products: 'Marine Plywood' }).ok, true);
});

test('rejects unknown types, honeypot fills and bad phones', () => {
  assert.equal(validateLead({ type: 'x', ...base }).ok, false);
  assert.equal(validateLead({ type: 'enquiry', ...base, message: 'Hi', website: 'spam' }).ok, false);
  assert.equal(validateLead({ type: 'enquiry', ...base, phone: 'call me', message: 'Hi' }).ok, false);
});
