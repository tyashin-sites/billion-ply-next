// Marketing review (issue 100): manufacturing claims (E1, 4 Quad Press,
// Italian sanders, termite/borer protection) are stated company-wide on the
// old site, not per product. Until the client confirms them per product they
// stay off product pages, product specs and the comparison table.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const CLAIMS = /quad press|italian sander|termite|\bE1\b/i;
const files = [
  'src/components/custom/Product.tsx',
  'src/components/custom/Specify.tsx',
  'src/app/products/page.tsx',
  ...readdirSync('src/app/products', { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => `src/app/products/${d.name}/page.tsx`),
];

for (const f of files) {
  test(`no per-product manufacturing claims in ${f}`, () => {
    assert.doesNotMatch(readFileSync(f, 'utf8'), CLAIMS);
  });
}

test('no "own plant" wording on the home page', () => {
  assert.doesNotMatch(readFileSync('src/app/page.tsx', 'utf8'), /own plant/i);
});

test('Dyed Veneer is a listed range', () => {
  const s = readFileSync('src/data/products.ts', 'utf8');
  assert.match(s, /slug: 'dyed'/);
  assert.match(s, /Rustic, Dyed'/);
});
