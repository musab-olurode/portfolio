import { expect, type Page, test } from '@playwright/test';

const SITE = 'https://musab.dev';

const meta = async (page: Page, selector: string): Promise<string | null> =>
	page.locator(selector).first().getAttribute('content');

test.describe('home page metadata', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has a canonical URL, description and author', async ({ page }) => {
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE);
		expect(await meta(page, 'meta[name="description"]')).toContain('7+ years');
		expect(await meta(page, 'meta[name="author"]')).toBe("Mus'ab Olurode");
	});

	test('has complete Open Graph tags for WhatsApp, LinkedIn and Slack', async ({ page, request }) => {
		expect(await meta(page, 'meta[property="og:title"]')).toBe("Mus'ab Olurode — Full-stack engineer");
		expect(await meta(page, 'meta[property="og:description"]')).toContain('7+ years');
		expect(await meta(page, 'meta[property="og:url"]')).toBe(SITE);
		expect(await meta(page, 'meta[property="og:site_name"]')).toBe("Mus'ab Olurode");
		expect(await meta(page, 'meta[property="og:type"]')).toBe('profile');
		expect(await meta(page, 'meta[property="og:locale"]')).toBe('en_GB');
		expect(await meta(page, 'meta[property="og:image:width"]')).toBe('1200');
		expect(await meta(page, 'meta[property="og:image:height"]')).toBe('630');
		expect(await meta(page, 'meta[property="og:image:alt"]')).toBeTruthy();

		const image = (await meta(page, 'meta[property="og:image"]'))!;

		expect(image.startsWith(`${SITE}/`)).toBe(true);
		const res = await request.get(new URL(image).pathname);

		expect(res.status()).toBe(200);
		// WhatsApp skips preview images over about 300 KB.
		expect((await res.body()).byteLength).toBeLessThan(300_000);
	});

	test('has Twitter / X card tags', async ({ page }) => {
		expect(await meta(page, 'meta[name="twitter:card"]')).toBe('summary_large_image');
		expect(await meta(page, 'meta[name="twitter:creator"]')).toBe('@_RedDxt');
		expect(await meta(page, 'meta[name="twitter:title"]')).toBeTruthy();
		expect(await meta(page, 'meta[name="twitter:image"]')).toMatch(/^https:\/\/musab\.dev\//);
	});

	test('has icons, a manifest and theme colours', async ({ page, request }) => {
		for (const selector of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]', 'link[rel="manifest"]']) {
			const href = (await page.locator(selector).first().getAttribute('href'))!;

			expect((await request.get(href)).status(), selector).toBe(200);
		}
		await expect(page.locator('meta[name="theme-color"]')).toHaveCount(2);
	});

	test('describes the person in JSON-LD', async ({ page }) => {
		const raw = (await page.locator('script[type="application/ld+json"]').first().textContent())!;
		const data = JSON.parse(raw) as { '@type': string; mainEntity: Record<string, unknown> };

		expect(data['@type']).toBe('ProfilePage');
		expect(data.mainEntity).toMatchObject({
			'@type': 'Person',
			name: "Mus'ab Olurode",
			jobTitle: 'Senior Full Stack Engineer',
			email: 'mailto:me@musab.dev',
			url: SITE,
		});
		expect(data.mainEntity['sameAs']).toEqual(
			expect.arrayContaining(['https://www.linkedin.com/in/musab-olurode/', 'https://github.com/musab-olurode'])
		);
		expect(JSON.stringify(data)).not.toMatch(/Ilorin|Nigeria|gmail/);
	});
});

test('the résumé has its own canonical URL and preview', async ({ page }) => {
	await page.goto('/resume');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}/resume`);
	expect(await meta(page, 'meta[property="og:url"]')).toBe(`${SITE}/resume`);
	expect(await meta(page, 'meta[property="og:title"]')).toContain('Résumé');
	expect(await meta(page, 'meta[property="og:image"]')).toMatch(/^https:\/\/musab\.dev\//);
});

test('the 404 page is not indexed', async ({ page }) => {
	await page.goto('/does-not-exist');
	expect(await meta(page, 'meta[name="robots"]')).toContain('noindex');
});

test('robots.txt and the sitemap point at the real pages', async ({ request }) => {
	const robots = await (await request.get('/robots.txt')).text();

	expect(robots).toContain('Allow: /');
	expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
	const sitemap = await (await request.get('/sitemap.xml')).text();

	expect(sitemap).toContain(`<loc>${SITE}</loc>`);
	expect(sitemap).toContain(`<loc>${SITE}/resume</loc>`);
});
