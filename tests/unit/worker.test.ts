import { describe, expect, test } from 'vitest';

import worker from '../../worker/index';

const assets = {
	fetch: (request: Request): Promise<Response> =>
		Promise.resolve(new Response(`asset ${new URL(request.url).pathname}`)),
};
const call = (url: string): Promise<Response> => worker.fetch(new Request(url), { ASSETS: assets });

describe('worker', () => {
	test('serves the site on the canonical host', async () => {
		const res = await call('https://musab.dev/resume');

		expect(res.status).toBe(200);
		expect(await res.text()).toBe('asset /resume');
	});

	test('serves workers.dev previews as they are', async () => {
		expect((await call('https://musab-dev.olurodemusab.workers.dev/')).status).toBe(200);
	});

	test.each([
		['https://www.musab.dev/resume?x=1', 'https://musab.dev/resume?x=1'],
		['https://musabolurode.dev/', 'https://musab.dev/'],
		['https://www.musabolurode.dev/resume', 'https://musab.dev/resume'],
		['http://musab.dev/', 'https://musab.dev/'],
	])('redirects %s to %s permanently', async (from, to) => {
		const res = await call(from);

		expect(res.status).toBe(301);
		expect(res.headers.get('location')).toBe(to);
	});
});
