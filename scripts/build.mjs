import { build } from 'vite';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await build({ root });
const temporary = await mkdtemp(join(root, '.cadna-prerender-'));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

try {
  await build({ root, logLevel: 'warn', build: { ssr: 'src/prerender.jsx', outDir: temporary, emptyOutDir: true, copyPublicDir: false, manifest: false } });
  const { render, getPageMetadata, pagePaths, siteUrl, site } = await import(pathToFileURL(join(temporary, 'prerender.js')));
  const template = await readFile(join(root, 'dist/index.html'), 'utf8');
  const organization = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: siteUrl, email: site.email, sameAs: site.social.map(item => item.href) }).replaceAll('<', '\\u003c');

  for (const path of [...pagePaths, '/404']) {
    const meta = getPageMetadata(path);
    // The request builder depends on URL query parameters, so it mounts in the browser.
    const content = path === '/request' ? '' : await render(path);
    const metadata = [
      `<title>${escape(meta.title)}</title>`,
      `<meta name="description" content="${escape(meta.description)}" />`,
      `<meta name="robots" content="${meta.robots}" />`,
      `<link rel="canonical" href="${escape(meta.canonical)}" />`,
      ...Object.entries({ 'og:title': meta.title, 'og:description': meta.description, 'og:url': meta.canonical, 'og:type': meta.type, 'og:image': meta.image, 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': meta.image }).map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`),
      `<script type="application/ld+json">${organization}</script>`,
    ].join('\n    ');
    const html = template.replace(/<title>.*?<\/title>/s, '').replace(/<meta (?:name|property)="(?:description|robots|og:title|og:description|og:url|og:type|og:image|twitter:title|twitter:description|twitter:image)"[^>]*>/g, '').replace('</head>', `    ${metadata}\n  </head>`).replace('<div id="root"></div>', `<div id="root" data-page="${path}">${content}</div>`);
    const output = join(root, 'dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html.replace(/^[ \t]+$/gm, ''));
  }
  const indexed = pagePaths.filter(path => getPageMetadata(path).robots.startsWith('index'));
  await writeFile(join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed.map(path => `  <url><loc>${escape(getPageMetadata(path).canonical)}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`Generated ${pagePaths.length + 1} static documents and ${indexed.length} sitemap entries.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
