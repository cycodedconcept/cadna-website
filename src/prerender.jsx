import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server.js';
import { App } from './App';

export { getPageMetadata, pagePaths, siteUrl } from './utils/metadata';
export { site } from './data/site';

// Build-time rendering only. The deployed site remains static with no server API.
export function render(path) {
  return new Promise((resolve, reject) => {
    let html = '';
    let renderError;
    const destination = new Writable({ write(chunk, encoding, callback) { html += chunk.toString(); callback(); } });
    destination.on('finish', () => renderError ? reject(renderError) : resolve(html));
    destination.on('error', reject);
    const stream = renderToPipeableStream(<StaticRouter location={path}><App /></StaticRouter>, {
      onAllReady() { stream.pipe(destination); },
      onShellError: reject,
      onError(error) { renderError = error; },
    });
  });
}
