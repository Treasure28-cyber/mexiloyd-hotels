import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');let p=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!p.startsWith(root+path.sep)&&p!==root){res.writeHead(403);return res.end();}if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');if(!fs.existsSync(p)){res.writeHead(404);return res.end('Not found');}res.setHeader('Content-Type',({'html':'text/html; charset=utf-8','js':'text/javascript','css':'text/css','webp':'image/webp','svg':'image/svg+xml'})[p.split('.').pop()]||'application/octet-stream');fs.createReadStream(p).pipe(res);}).listen(5173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:5173'));
