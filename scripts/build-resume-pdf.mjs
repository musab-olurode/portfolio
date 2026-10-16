// Renders /resume from the static export into public/musab-olurode-resume.pdf.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from '@playwright/test';

const ROOT = 'out';
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

const server = createServer(async (req, res) => {
	let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
	if (path.endsWith('/')) path += 'index';
	const candidates = extname(path) ? [path] : [`${path}.html`, join(path, 'index.html')];
	for (const candidate of candidates) {
		try {
			const body = await readFile(join(ROOT, candidate));
			res.writeHead(200, { 'content-type': TYPES[extname(candidate)] ?? 'application/octet-stream' });
			return res.end(body);
		} catch {}
	}
	res.writeHead(404).end();
});

await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/resume`, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: 'public/musab-olurode-resume.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();
console.log('wrote public/musab-olurode-resume.pdf');
