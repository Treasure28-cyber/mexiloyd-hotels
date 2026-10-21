import fs from 'node:fs';
import { render } from '../.prerender/prerender.js';
for (const page of ['','rooms','facilities','gallery','about','contact']) {
  const file = page ? `dist/${page}/index.html` : 'dist/index.html';
  const shell = fs.readFileSync(file, 'utf8');
  const html = await render('/' + page);
  fs.writeFileSync(file, shell.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`));
  console.log(`Prerendered /${page}`);
}
