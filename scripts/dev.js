import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) { response.writeHead(503, { 'Content-Type': 'application/json' }); response.end(JSON.stringify({ ok: false, error: 'Vista local: el envío de correo se habilita en Cloudflare.' })); return; }
  const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
  if (!path.startsWith(root + sep) || path.endsWith('_worker.js')) { response.writeHead(404); response.end(); return; }
  try { const file = await readFile(path); response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'text/plain' }); response.end(file); }
  catch { response.writeHead(404); response.end('No encontrado'); }
}).listen(4173, '127.0.0.1', () => console.log('Vista local: http://127.0.0.1:4173'));
