// Issue 100 marketing copy: guards on the facts rules it came with.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const seo = readFileSync('src/data/seo-content.ts', 'utf8');

test('ISO is written as "ISO 9001:2015" only, with no certificate number or mark', () => {
  const files = ['src/data/seo-content.ts', 'src/data/company.ts', 'src/app/page.tsx', 'src/lib/schema.ts', 'src/components/custom/Company.tsx', 'src/app/certifications/page.tsx'];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    // Every "ISO" must be part of "ISO 9001:2015".
    assert.doesNotMatch(src.replace(/ISO 9001:2015/g, ''), /\bISO\b/, f);
    assert.doesNotMatch(src, /IAF|IGBC/, f);
  }
  assert.match(seo, /The company is ISO 9001:2015 certified/);
  assert.match(seo, /Billionply is ISO 9001:2015 certified\. See the Indian Standards/);
});

test('no BIS licence number anywhere in the site source', () => {
  for (const f of ['src/data/company.ts', 'src/data/seo-content.ts', 'src/data/products.ts', 'src/components/custom/Product.tsx', 'src/lib/schema.ts']) {
    assert.doesNotMatch(readFileSync(f, 'utf8'), /CM\/L|9693005/, f);
  }
});

test('no foundingDate in schema (1997/1998/2004 still open)', () => {
  assert.doesNotMatch(readFileSync('src/lib/schema.ts', 'utf8'), /foundingDate/);
});

test('commercial plywood: client-sheet grades and sizes, no IS number, no photo of its own', () => {
  const block = seo.slice(seo.indexOf("'commercial-plywood': {"), seo.indexOf("'block-board': {"));
  assert.match(block, /MR \(moisture-resistant\) and BWP \(boiling water-proof\)/);
  assert.match(block, /gradeTable\(\[6, 8, 12, 16, 18, 25\], 'Plywood'\)/);
  assert.doesNotMatch(block, /Dry interiors only|CM\/L|licen/i);
  // The only IS number on the page is marine plywood's (IS 710), never its own.
  assert.doesNotMatch(block.replace(/IS 710/g, ''), /IS \d{3,4}/);
  const range = seo.slice(seo.indexOf("slug: 'commercial-plywood',"));
  assert.match(range, /image: null/);
  assert.match(seo, /standard: null,\n\};/);
});

test('commercial plywood has a /compare column; block board and doors carry the sheet', () => {
  assert.match(readFileSync('src/components/custom/Specify.tsx', 'utf8'), /COMMERCIAL_COMPARE/);
  const products = readFileSync('src/data/products.ts', 'utf8');
  assert.match(products, /thickness: '16, 19, 22, 25 mm'/);
  assert.match(products, /thickness: '30, 32, 35 mm'/);
});

test('menu follows the client hierarchy', () => {
  const site = readFileSync('src/config/site.ts', 'utf8');
  const order = ['"Decorative Veneers"', '"Natural Veneers"', '"Teak"', '"Non-Teak"', '"Recon Veneers"', '"Commercial Plywood"', '"Block Boards"', '"Billionply Doors"', '"Flush Doors"', '"Marine Plywood"'];
  let at = -1;
  for (const label of order) {
    const i = site.indexOf(`"label": ${label}`);
    assert.ok(i > at, label);
    at = i;
  }
  assert.match(site, /"label": "Billionply Doors" \}/); // a group label, not a link
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

test('/compare cells from the requester review (comment 20)', () => {
  const products = readFileSync('src/data/products.ts', 'utf8');
  const block = (slug) => {
    const at = products.indexOf(`slug: '${slug}'`);
    const c = products.indexOf('compare: {', at);
    return products.slice(c, products.indexOf('}', c));
  };
  assert.match(block('marine-plywood'), /grades: 'BWP'/);
  assert.match(block('decorative-veneer'), /grades: 'Not applicable'/);
  assert.match(block('decorative-veneer'), /water: 'Not applicable'/);
});

test('answer-section tables scroll in their own box on phones (grid child min-w-0)', () => {
  const answers = readFileSync('src/components/custom/Answers.tsx', 'utf8');
  assert.match(answers, /id=\{s\.id\} className="min-w-0 /);
});
