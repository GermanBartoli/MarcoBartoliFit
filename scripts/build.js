import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = fileURLToPath(new URL('../dist/', import.meta.url));
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const file of ['index.html', 'styles.css', 'script.js', '_worker.js', '_headers', 'robots.txt', 'sitemap.xml']) cpSync(root + file, output + file);
cpSync(root + 'assets', output + 'assets', { recursive: true });
console.log('Sitio preparado en dist/. Los originales se conservan solo en el repositorio.');
