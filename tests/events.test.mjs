// Issue 100: /events is in the main menu and keeps all 16 Matecia 2025
// photos, each with its own alt text and its file's real dimensions.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { events } from '../src/data/company.ts';

function jpegSize(path) {
  const d = readFileSync(path);
  let i = 2;
  while (i < d.length) {
    const m = d[i + 1];
    const len = d.readUInt16BE(i + 2);
    if (m === 0xc0 || m === 0xc2) return { height: d.readUInt16BE(i + 5), width: d.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error(`no size in ${path}`);
}

test('Events is in the main menu, after Projects', () => {
  // site.ts imports '@/' aliases, so read the nav as text.
  const src = readFileSync('src/config/site.ts', 'utf8');
  const nav = src.slice(src.indexOf('"nav"'), src.indexOf('"legalNav"'));
  assert.match(nav, /"label": "Projects",\s*"href": "\/projects"\s*\},\s*\{\s*"label": "Events",\s*"href": "\/events"/);
});

test('Matecia 2025 keeps all 16 photos with distinct alt text', () => {
  const m = events.find((e) => e.slug === 'matecia-2025');
  assert.equal(m.photos.length, 16);
  assert.equal(new Set(m.photos.map((p) => p.src)).size, 16);
  assert.equal(new Set(m.photos.map((p) => p.alt)).size, 16);
  for (const p of m.photos) assert.notEqual(p.alt, 'Billionply at Matecia 2025');
});

test('event photo dimensions match the files', () => {
  for (const e of events)
    for (const p of e.photos) assert.deepEqual({ width: p.width, height: p.height }, jpegSize(`public${p.src}`), p.src);
});
