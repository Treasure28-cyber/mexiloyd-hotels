import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { PassThrough } from 'node:stream';
import App from './App.jsx';

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = '', failed = false;
    const output = new PassThrough();
    output.on('data', chunk => { html += chunk.toString(); });
    output.on('end', () => failed ? reject(new Error(`Unable to prerender ${url}`)) : resolve(html));
    output.on('error', reject);
    const stream = renderToPipeableStream(<StaticRouter location={url}><App /></StaticRouter>, {
      onAllReady() { stream.pipe(output); },
      onError(error) { failed = true; console.error(error); },
      onShellError: reject,
    });
  });
}
