import fs from 'node:fs';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { parse } from 'parse5';
import { photos } from '../src/data.js';

function findAll(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => findAll(child, predicate))];
}
const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
for (const page of ['', 'rooms', 'facilities', 'gallery', 'about', 'contact']) {
  const file=page?`dist/${page}/index.html`:'dist/index.html';
  const html=fs.readFileSync(file,'utf8'), doc=parse(html);
  assert.equal(findAll(doc,node=>node.tagName==='h1').length,1,`${page}: rendered heading`);
  assert.equal(findAll(doc,node=>node.tagName==='main').length,1,`${page}: main landmark`);
  assert(html.includes('property="og:image" content="https://'),`${page}: absolute OG image`);
  assert(!html.includes('/src/main.jsx'),`${page}: production entry`);
  for (const img of findAll(doc,node=>node.tagName==='img')) {
    assert(attr(img,'alt'),`${page}: image alt`);
    assert(fs.existsSync('dist'+attr(img,'src')),`${page}: image asset`);
  }
  for (const script of findAll(doc,node=>node.tagName==='script'&&attr(node,'src'))) assert(fs.existsSync('dist'+attr(script,'src')),`${page}: JS entry`);
  if (page==='gallery') {
    const grid=findAll(doc,node=>attr(node,'class')==='gallery-grid')[0];
    const gallery=findAll(grid,node=>node.tagName==='img');
    assert.equal(gallery.length,20);
    assert(gallery.every(node=>attr(node,'loading')==='lazy'));
  }
}
assert.equal(photos.length,20);
for(const photo of photos) assert(fs.existsSync('public'+photo.src));
const scripts=fs.readdirSync('dist/assets').filter(file=>file.endsWith('.js'));
assert(scripts.some(file=>file.startsWith('Gallery-')),'separate gallery bundle');
const main=scripts.find(file=>file.startsWith('main-'));
console.log(`Verified six prerendered routes, 20 gallery photos, image alt/lazy attributes, SEO and production assets. Main JS: ${(gzipSync(fs.readFileSync('dist/assets/'+main)).length/1024).toFixed(1)} KiB gzipped; ${scripts.length} split JS chunks.`);
