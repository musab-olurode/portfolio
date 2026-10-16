import { expect, test } from '@playwright/test';

test('résumé lists senior roles newest first with the new email', async ({ page }) => {
	await page.goto('/resume');
	const text = await page.locator('main').innerText();

	expect(text.indexOf('Senior Full Stack Engineer')).toBeGreaterThan(-1);
	expect(text.indexOf('Senior Full Stack Engineer')).toBeLessThan(text.indexOf('Senior Frontend Developer'));
	expect(text).toContain('me@musab.dev');
});

test('résumé header carries no location markers', async ({ page }) => {
	await page.goto('/resume');
	const html = await page.content();

	expect(html).not.toMatch(/\+234|Kwara|gmail/);
});

test('education shows no years', async ({ page }) => {
	await page.goto('/resume');
	const education = page.locator('section', { has: page.getByRole('heading', { name: 'EDUCATION' }) });

	await expect(education).toContainText('University of Ilorin');
	await expect(education).not.toContainText(/20\d\d/);
});

test('the PDF is served', async ({ request }) => {
	const res = await request.get('/musab-olurode-resume.pdf');

	expect(res.status()).toBe(200);
	expect(res.headers()['content-type']).toContain('application/pdf');
});
