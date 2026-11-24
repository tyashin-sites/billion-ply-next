import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leadProblem, leadSubject, leadMessage, LEAD_SOURCES } from '../src/lib/leads.ts';

const base = { name: 'Asha', phone: '+91 98100 00000', email: 'asha@example.com' };

test('each form has its own lead source', () => {
  assert.equal(new Set(Object.values(LEAD_SOURCES)).size, 3);
  assert.equal(LEAD_SOURCES.enquiry, 'contact-form');
});

test('dealer form needs firm, city, state, phone and email', () => {
  assert.match(leadProblem({ type: 'dealer', ...base, city: 'Pune' }) ?? '', /firm/);
  const f = { type: 'dealer', ...base, firm: 'Asha Ply', city: 'Pune', state: 'Maharashtra', brands: 'X, Y' };
  assert.equal(leadProblem(f), null);
  assert.equal(leadSubject(f), '[Become a dealer] Asha Ply (Pune, Maharashtra)');
  assert.match(leadMessage(f), /Brands currently carried: X, Y/);
});

test('enquiry needs a message; sample needs products and a phone', () => {
  assert.notEqual(leadProblem({ type: 'enquiry', ...base }), null);
  assert.equal(leadProblem({ type: 'enquiry', ...base, message: 'Hi' }), null);
  assert.notEqual(leadProblem({ type: 'sample', ...base }), null);
  assert.equal(leadProblem({ type: 'sample', ...base, products: 'Marine Plywood' }), null);
  assert.notEqual(leadProblem({ type: 'sample', name: 'A', email: 'a@b.co', products: 'X' }), null);
});

test('rejects bad email and bad phone', () => {
  assert.notEqual(leadProblem({ type: 'enquiry', ...base, email: 'nope', message: 'Hi' }), null);
  assert.notEqual(leadProblem({ type: 'enquiry', ...base, phone: 'call me', message: 'Hi' }), null);
});
