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
  '/digital-card/', '/home-new/',
];
const NEW_PAGES = new Set(['/', '/about', '/projects', '/contact', '/events', '/privacy', '/terms',
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

test('the product-verification URL printed in QR codes is a page, not a redirect', () => {
  assert.equal(legacyRedirects['/billionply-product-verification'], undefined);
  const r = redirectRules().find((x) => x.source === '/:path+/');
  assert.ok(r, 'trailing-slash form (as printed) reaches the page through the catch-all 301');
});

test('billionveneers.com: every rule is host-gated and points at www.billionply.com', async () => {
  const { oldDomainRedirects, OLD_DOMAIN_HOST } = await import('../src/config/legacy-redirects.ts');
  const host = new RegExp(`^${OLD_DOMAIN_HOST}$`);
  for (const h of ['billionveneers.com', 'www.billionveneers.com']) assert.match(h, host);
  for (const h of ['www.billionply.com', 'billionveneers.com.evil.test']) assert.doesNotMatch(h, host);
  const rules = redirectRules().filter((r) => r.has);
  assert.equal(rules.length, Object.keys(oldDomainRedirects).length + 1);
  for (const r of rules) {
    assert.equal(r.statusCode, 301);
    assert.ok(r.destination.startsWith('https://www.billionply.com/'), r.destination);
  }
  // Known old pages go to the matching page; the catch-all goes home.
  assert.equal(rules.find((r) => r.source === '/aboutus.html').destination, 'https://www.billionply.com/about');
  assert.equal(rules.find((r) => r.source === '/:path*').destination, 'https://www.billionply.com/');
  // Host rules come before the catch-all of this site, and only billionply rules lack `has`.
  const all = redirectRules();
  assert.ok(all.findIndex((r) => r.source === '/:path*') < all.findIndex((r) => r.source === '/:path+/'));
  for (const to of Object.values(oldDomainRedirects)) assert.ok(NEW_PAGES.has(to) || ['/certifications', '/dealers', '/products'].includes(to), to);
});
