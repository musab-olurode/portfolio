import { describe, expect, test } from 'vitest';

import { alsoBuilt, profile, projects, roles, summary } from '@/content/profile';

const byName = (name: string) => alsoBuilt.find((a) => a.name.includes(name));

describe('profile content', () => {
	test('uses the custom-domain email', () => {
		expect(profile.email).toBe('me@musab.dev');
	});

	test('shows senior titles for ICC and Studio 14', () => {
		expect(roles.find((r) => r.company.startsWith('Institute'))?.title).toBe('Senior Full Stack Engineer');
		const studio = roles.find((r) => r.company === 'Studio 14');

		expect(studio?.title).toBe('Senior Frontend Developer');
		expect(studio?.start).toBe('Aug 2022');
		expect(studio?.end).toBe('Jul 2025');
	});

	test('lists roles newest first', () => {
		expect(roles.map((r) => r.company)).toEqual([
			'Institute for Canadian Citizenship',
			'Studio 14',
			'Montech Studios Inc.',
			'Scrapays Technologies',
			'The Binary Agency',
		]);
	});

	test('orders projects and links the PANSAA subsite', () => {
		expect(projects.map((p) => p.slug)).toEqual(['canoo', 'newborn', 'cematchmaker', 'worldkite', 'ericc', 'scrapays']);
		expect(projects.find((p) => p.slug === 'newborn')?.subsite?.url).toBe('https://pansaa.newborntoolkit.org/');
	});

	test('credits the Canoo team', () => {
		const line = projects.find((p) => p.slug === 'canoo')!.line;

		expect(line).toMatch(/senior engineer on the team/i);
		expect(line).not.toMatch(/^I built Canoo/);
	});

	test('credits the Studio 14 team rather than claiming solo builds', () => {
		const bullets = roles.find((r) => r.company === 'Studio 14')!.bullets.join(' ');

		expect(bullets).toMatch(/Studio 14 team/);
		expect(bullets).not.toMatch(/^Built the front end|Revamped the|Optimised the|Developed admin panels/);
	});

	test('keeps location out of headline copy', () => {
		for (const text of [profile.tagline, profile.promise, profile.now, summary]) {
			expect(text).not.toMatch(/Ilorin|Nigeria|Kwara|\+234/);
		}
	});

	test('has no stale years or old email', () => {
		expect(JSON.stringify({ profile, roles, projects, summary })).not.toMatch(/6 years|olurodemusab@gmail\.com/);
	});

	test('links the also-built entries correctly', () => {
		expect(byName('Naseeb')?.url).toBe('https://naseeb-by-qadr.pages.dev/');
		expect(byName('Gender Lens')?.url).toBe('https://gender-lens-wp.s14staging.uk/');
		expect(byName('Sandwell')?.url).toBe('https://www.sandwell.gov.uk/SBG/');
		expect(byName('Montech')?.url).toBeUndefined();
	});
});
