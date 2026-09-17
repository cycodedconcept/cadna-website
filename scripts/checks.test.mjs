import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { prepareContact, validateContact } from '../src/utils/contact.js';

const values = { name: ' Ada Okeke ', email: ' ada@example.com ', company: 'Growth & Co', phone: '', interest: 'Business Concierge', message: 'Help us structure operations.\nThen plan expansion.' };

test('contact validation rejects empty and malformed required fields', () => {
  assert.deepEqual(Object.keys(validateContact({ ...values, name: ' ', email: 'a@@b.com', message: '\n' })), ['name', 'email', 'message']);
  assert.deepEqual(validateContact(values), {});
});

test('email handoff preserves visitor text, escapes URL characters and omits empty optional fields', () => {
  const prepared = prepareContact(values);
  const url = new URL(prepared.emailHref);
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'concierge@cadnagsl.com');
  assert.equal(url.searchParams.get('subject'), 'Growth conversation — Growth & Co');
  assert.equal(url.searchParams.get('body'), prepared.text);
  assert.match(prepared.text, /Name: Ada Okeke\n/);
  assert.match(prepared.text, /operations\.\nThen plan/);
  assert.doesNotMatch(prepared.text, /Phone:/);
  assert.equal(prepareContact({ ...values, company: '' }).fields.company, '');
});

async function htmlFiles(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? htmlFiles(join(folder, entry.name)) : entry.name.endsWith('.html') ? [join(folder, entry.name)] : []))).flat();
}

test('production documents include unique metadata and visible HTML for crawlers', async () => {
  const files = await htmlFiles('dist');
  assert.equal(files.length, 21);
  const titles = new Set();
  for (const path of files) {
    const html = await readFile(path, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title?.startsWith('CADNA — '), path);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1, path);
    assert.equal((html.match(/name="description"/g) || []).length, 1, path);
    for (const property of ['og:url', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']) {
      assert.match(html, new RegExp(`(?:name|property)="${property}" content="[^\\"]+"`), path);
    }
    assert.match(html, /application\/ld\+json/, path);
    if (!path.endsWith('request.html')) assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.ok(!titles.has(title), `${path}: duplicate title`);
    titles.add(title);
  }
});

test('sitemap excludes unpublished drafts and the private request builder', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 16);
  assert.doesNotMatch(sitemap, /\/insights\/|\/request|\/404/);
  assert.match(sitemap, /\/case-studies\/ekodrop-logistics/);
  for (const path of ['dist/request.html', 'dist/404.html', 'dist/insights/structure-before-scale.html']) assert.match(await readFile(path, 'utf8'), /name="robots" content="noindex, follow"/);
  const home = await readFile('dist/index.html', 'utf8');
  const canonical = home.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${canonical}sitemap.xml`));
});
