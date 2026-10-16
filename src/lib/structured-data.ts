import { profile, roles, skills } from '@/content/profile';

/** schema.org ProfilePage + Person, for search engines and rich link previews. */
export function profileJsonLd(): Record<string, unknown> {
	const current = roles[0];

	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: profile.site,
		mainEntity: {
			'@type': 'Person',
			name: profile.name,
			url: profile.site,
			image: `${profile.site}/icon.png`,
			email: `mailto:${profile.email}`,
			jobTitle: current?.title,
			worksFor: current ? { '@type': 'Organization', name: current.company } : undefined,
			knowsAbout: skills,
			sameAs: [profile.links.linkedin, profile.links.github, profile.links.x],
		},
	};
}
