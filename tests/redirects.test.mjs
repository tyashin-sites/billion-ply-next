import { test } from 'node:test';
import assert from 'node:assert/strict';
import { legacyRedirects, redirectRules } from '../src/config/legacy-redirects.ts';

// Every URL on the old WordPress site (crawled 2026-11-23).
const OLD = [
  '/about-us/', '/decorative-veneer/', '/marine-plywood/', '/prelam-plywood/', '/flexible-plywood/',
  '/block-board/', '/flushdoor-product/', '/gallery/', '/contact-us/', '/event-photos/',
  '/how-to-choose-the-right-plywood-for-your-interior-projects/',
  '/top-benefits-of-using-high-quality-plywood-for-interior-design/',
  '/top-benefits-of-using-high-quality-plywood-for-interior-design-2/',
];
const NEW_PAGES = new Set(['/about', '/projects', '/contact', '/events',
  '/products/decorative-veneer', '/products/marine-plywood', '/products/prelam-plywood',
  '/products/flexible-plywood', '/products/block-board', '/products/flush-door']);

test('every old URL has a single 301 (with and without slash)', () => {
  const rules = redirectRules();
  for (const old of OLD) {
    for (const src of [old, old.slice(0, -1)]) {
      const r = rules.find((x) => x.source === src);
      assert.ok(r, `no rule for ${src}`);
      assert.equal(r.statusCode, 301);
    }
  }
});

test('targets are real pages or blog posts, and the duplicate post folds into the original', () => {
  for (const to of Object.values(legacyRedirects)) {
    assert.ok(NEW_PAGES.has(to) || to.startsWith('/blog/'), to);
  }
  assert.equal(
    legacyRedirects['/top-benefits-of-using-high-quality-plywood-for-interior-design-2'],
    '/blog/top-benefits-of-using-high-quality-plywood-for-interior-design'
  );
});

test('catch-all trailing-slash rule comes last', () => {
  const rules = redirectRules();
  assert.equal(rules.at(-1).source, '/:path+/');
});
