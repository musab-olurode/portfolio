import { describe, expect, test } from 'vitest';

import { getOverlap, MY_TZ, overlapSentence } from '@/lib/overlap';

const now = new Date('2026-10-16T13:20:00Z');

describe('getOverlap', () => {
	test('Toronto in daylight time shares three hours', () => {
		expect(getOverlap(now, 'America/Toronto')).toEqual({ myTime: '14:20', overlapHours: 3, visitorPlace: 'Toronto' });
	});

	test('Toronto in winter shares two hours', () => {
		expect(getOverlap(new Date('2026-12-01T13:20:00Z'), 'America/Toronto').overlapHours).toBe(2);
	});

	test('London shares the whole day', () => {
		expect(getOverlap(now, 'Europe/London').overlapHours).toBe(8);
	});

	test('Tokyo and Los Angeles share nothing', () => {
		expect(getOverlap(now, 'Asia/Tokyo').overlapHours).toBe(0);
		const la = getOverlap(now, 'America/Los_Angeles');

		expect(la.overlapHours).toBe(0);
		expect(la.visitorPlace).toBe('Los Angeles');
	});

	test('an unknown, invalid or hidden zone makes no overlap claim', () => {
		for (const tz of ['Not/AZone', undefined, 'UTC', 'Etc/GMT']) {
			expect(getOverlap(now, tz)).toEqual({ myTime: '14:20', overlapHours: null, visitorPlace: null });
		}
	});

	test('my own zone has no place name', () => {
		expect(getOverlap(now, MY_TZ).visitorPlace).toBeNull();
	});
});

describe('overlapSentence', () => {
	test('names the place and pluralises', () => {
		expect(overlapSentence({ myTime: '14:20', overlapHours: 3, visitorPlace: 'Toronto' })).toBe(
			"That's 3 hours of overlap with your workday in Toronto."
		);
		expect(overlapSentence({ myTime: '14:20', overlapHours: 1, visitorPlace: null })).toBe(
			"That's 1 hour of overlap with your workday."
		);
	});

	test('handles no overlap', () => {
		expect(overlapSentence({ myTime: '14:20', overlapHours: 0, visitorPlace: 'Tokyo' })).toBe(
			"Our workdays don't overlap, but I shift my hours to meet the team."
		);
	});

	test('states my hours when the visitor zone is unknown', () => {
		expect(overlapSentence({ myTime: '14:20', overlapHours: null, visitorPlace: null })).toBe(
			'I work 09:00–17:00 GMT+1 and shift my hours to meet the team.'
		);
	});

	test('handles the same zone', () => {
		expect(overlapSentence(getOverlap(now, MY_TZ))).toBe("We'd share the whole workday.");
	});
});
