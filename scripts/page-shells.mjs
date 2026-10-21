import fs from 'node:fs';
const origin='https://mexiloyd-hotels-port-harcourt.violetcabin65.chatgpt.site';
const description='Luxury rooms and suites near Golf Estate, Okuruama, Port Harcourt. Free breakfast, free parking, bar and conference hall. 4.2 on Google from 201 reviews. Book direct.';
const schema={'@context':'https://schema.org','@type':'LodgingBusiness',name:'Mexiloyd Hotels',url:origin,telephone:'+2348037165381',image:origin+'/assets/images/exterior-front.webp',address:{'@type':'PostalAddress',streetAddress:'10 Happyland Close, near Golf Estate, Okuruama',addressLocality:'Port Harcourt',addressRegion:'Rivers State',addressCountry:'NG'},aggregateRating:{'@type':'AggregateRating',ratingValue:4.2,reviewCount:201}};
const pages=['','rooms','facilities','gallery','about','contact'];
for(const page of pages){
  const title=page ? `${page[0].toUpperCase()+page.slice(1)} – Mexiloyd Hotels` : 'Mexiloyd Hotels – Luxury Rooms & Suites in Okuruama, Port Harcourt';
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="theme-color" content="#FBF7F0"><link rel="canonical" href="${origin}/${page}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${origin}/${page}"><meta property="og:image" content="${origin}/assets/images/exterior-front.webp"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script><noscript>To book, call <a href="tel:+2348037165381">0803 716 5381</a>.</noscript></body></html>`;
  if(page)fs.mkdirSync(page,{recursive:true});
  fs.writeFileSync(page?`${page}/index.html`:'index.html',html);
}
fs.mkdirSync('public',{recursive:true});
fs.writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${origin}/${p}</loc></url>`).join('')}</urlset>`);
