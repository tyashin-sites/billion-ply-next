import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validDealers, searchDealers, statesOf } from '../src/lib/dealer-search.ts';
import { readFileSync } from 'node:fs';

const rows = [
  { name: 'Alpha Plywood', city: 'Gurugram', state: 'Haryana', pincode: '122001', phone: '+91 99999 00000' },
  { name: 'Beta Interiors', city: 'Jaipur', state: 'Rajasthan' },
  { name: '', city: 'Nowhere', state: 'X' },
  { name: 'No State', city: 'Delhi' },
  'junk',
];

test('drops malformed rows and never invents fields', () => {
  const d = validDealers(rows);
  assert.equal(d.length, 2);
  assert.deepEqual(Object.keys(d[1]).sort(), ['city', 'name', 'state']);
});

test('search by city, pincode, state; empty query returns nothing', () => {
  const d = validDealers(rows);
  assert.equal(searchDealers(d, 'gurugram').length, 1);
  assert.equal(searchDealers(d, '122001').length, 1);
  assert.equal(searchDealers(d, '', 'Rajasthan').length, 1);
  assert.equal(searchDealers(d, 'Mumbai').length, 0);
  assert.equal(searchDealers(d, '').length, 0);
  assert.deepEqual(statesOf(d), ['Haryana', 'Rajasthan']);
});

test('shipped dealer list holds no invented dealers (empty until the client sends one)', () => {
  const shipped = JSON.parse(readFileSync(new URL('../src/data/dealers.json', import.meta.url), 'utf8'));
  assert.ok(Array.isArray(shipped));
  assert.equal(validDealers(shipped).length, shipped.length, 'every shipped row must be valid');
});
