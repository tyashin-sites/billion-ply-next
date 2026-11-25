// Issue 100 marketing copy: guards on the facts rules it came with.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const seo = readFileSync('src/data/seo-content.ts', 'utf8');

test('no ISO wording anywhere in the site source (user will share ISO details)', () => {
  for (const f of ['src/data/seo-content.ts', 'src/data/company.ts', 'src/app/page.tsx', 'src/lib/schema.ts']) {
    assert.doesNotMatch(readFileSync(f, 'utf8'), /\bISO\b|9001/, f);
  }
});

test('no foundingDate in schema (1997/1998/2004 still open)', () => {
  assert.doesNotMatch(readFileSync('src/lib/schema.ts', 'utf8'), /foundingDate/);
});

test('commercial plywood carries no IS number, licence or borrowed image', () => {
  const block = seo.slice(seo.indexOf("'commercial-plywood': {"), seo.indexOf("'block-board': {"));
  assert.doesNotMatch(block, /IS \d{3,4}|CM\/L|licen/i);
  const range = seo.slice(seo.indexOf("slug: 'commercial-plywood'"));
  assert.match(range, /image: null/);
});

test('commercial plywood stays out of /compare (not in the products list)', () => {
  assert.doesNotMatch(readFileSync('src/data/products.ts', 'utf8'), /slug: 'commercial-plywood'/);
});

test('the 88 recon designs and codes are not listed', () => {
  assert.doesNotMatch(seo, /A-01|TC-8|Recon IX/);
});

test('every new keyword page exists and is in the page sitemap', () => {
  const routes = readFileSync('src/lib/site-routes.ts', 'utf8');
  for (const slug of ['natural-veneer', 'teak-veneer', 'recon-veneer', 'commercial-plywood']) {
    assert.ok(existsSync(`src/app/products/${slug}/page.tsx`), slug);
    assert.match(routes, new RegExp(`/products/${slug}"`));
  }
});
