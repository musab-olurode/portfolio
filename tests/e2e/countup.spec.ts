import { expect, test } from '@playwright/test';

test('the words after the counter stay put while it counts', async ({ page }) => {
	await page.goto('/');
	// Measure only once the web font is in, or the swap itself moves the text.
	await page.evaluate(() => document.fonts.ready);
	const statement = page.locator('#figures-heading + p');

	await statement.evaluate((p) => {
		// Wrap the first word after the counter so we can watch where it sits.
		const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);

		for (let node = walker.nextNode(); node; node = walker.nextNode()) {
			const i = node.textContent?.indexOf('newcomers') ?? -1;

			if (i >= 0) {
				const range = document.createRange();

				range.setStart(node, i);
				range.setEnd(node, i + 'newcomers'.length);
				const mark = document.createElement('span');

				mark.id = 'after-counter';
				range.surroundContents(mark);
				break;
			}
		}
	});

	const positions = await statement.evaluate(async (p) => {
		p.scrollIntoView({ block: 'center' });
		const mark = document.getElementById('after-counter')!;
		const seen: number[] = [];
		const start = performance.now();

		while (performance.now() - start < 1600) {
			// Relative to the paragraph, so its own reveal slide does not count as movement.
			const r = mark.getBoundingClientRect();
			const box = p.getBoundingClientRect();

			seen.push(Math.round((r.left - box.left) * 10) / 10, Math.round(r.top - box.top));
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}

		return seen;
	});

	expect(new Set(positions.filter((_, i) => i % 2 === 0)).size).toBe(1);
	expect(new Set(positions.filter((_, i) => i % 2 === 1)).size).toBe(1);
});
