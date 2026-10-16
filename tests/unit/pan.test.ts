import { describe, expect, test } from 'vitest';

import { panFor } from '@/lib/pan';

describe('panFor', () => {
	test('scrolls a tall capture until its bottom meets the bottom of a 4:5 frame', () => {
		// 1200×4800 in a 1200-wide 4:5 frame (1500 tall): travel 3300 of 4800.
		expect(panFor({ width: 1200, height: 4800 })).toEqual({ end: '-68.75%', duration: '15.4s' });
	});

	test('scales the duration with how far the capture travels', () => {
		const short = panFor({ width: 1200, height: 2875 });

		expect(short?.end).toBe('-47.83%');
		expect(short?.duration).toBe('6.4s');
	});

	test('does not pan a capture that already fits the frame', () => {
		expect(panFor({ width: 1200, height: 1500 })).toBeNull();
		expect(panFor({ width: 1200, height: 750 })).toBeNull();
	});
});
