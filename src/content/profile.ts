import type { ImageSize } from '@/lib/pan';

import workImages from './work-images.json' with { type: 'json' };

export interface Role {
	company: string;
	title: string;
	type: string;
	region: string;
	start: string;
	end: string;
	bullets: string[];
}

export interface Project {
	slug: 'canoo' | 'newborn' | 'cematchmaker' | 'worldkite' | 'ericc' | 'scrapays';
	name: string;
	line: string;
	org: string;
	years: string;
	url: string;
	image: string;
	imageSize: ImageSize;
	imageAlt: string;
	stack?: string;
	subsite?: { name: string; url: string };
	app?: { name: string; store: string; url: string };
	reel?: { webm: string; mp4: string; poster: string; label: string };
}

export interface AlsoBuilt {
	name: string;
	kind: string;
	year: string;
	url?: string;
	image?: string;
}

export const profile = {
	name: "Mus'ab Olurode",
	tagline: 'Full-stack engineer · Remote',
	promise: 'I build the whole product: the app, the website and the backend behind them.',
	now: 'Senior Full Stack Engineer, Institute for Canadian Citizenship',
	stackShort: 'TypeScript, React, Next.js, React Native, Node, NestJS',
	email: 'me@musab.dev',
	site: 'https://musab.dev',
	links: {
		github: 'https://github.com/musab-olurode',
		linkedin: 'https://www.linkedin.com/in/musab-olurode/',
		x: 'https://twitter.com/_RedDxt',
	},
	resumePdf: '/musab-olurode-resume.pdf',
	yearsLabel: '7+ years',
} as const;

export const heroReel = {
	webm: '/work/projects-reel.webm',
	mp4: '/work/projects-reel.mp4',
	poster: '/work/projects-reel-poster.webp',
	label: 'Screen recordings of every live project, one after another',
};

export const figures = { since: 2019, teams: 5, countries: 4, canooMembers: 1_000_000 } as const;

export const summary =
	'Full-stack engineer with 7+ years of experience shipping web apps, mobile apps and the backends behind them for startups, agencies, non-profits and public institutions. Most recently the senior engineer on the team behind Canoo, the Institute for Canadian Citizenship platform that has welcomed over a million newcomers. Works across TypeScript, React, Next.js, React Native, Node.js, NestJS, Laravel and Go, and is comfortable owning a product end to end.';

export const roles: Role[] = [
	{
		company: 'Institute for Canadian Citizenship',
		title: 'Senior Full Stack Engineer',
		type: 'Contract',
		region: 'Remote, Canada',
		start: 'Jul 2025',
		end: 'Present',
		bullets: [
			'Senior engineer on the team building Canoo, working across the React Native app, the Next.js website (canoo.ca) and the Node.js backend and CMS.',
			'Helped ship the relaunched canoo.ca, which presents 2,000+ free and discounted experiences across Canada to newcomers and partners.',
			'Supported the platform as it grew past one million members.',
		],
	},
	{
		company: 'Studio 14',
		title: 'Senior Frontend Developer',
		type: 'Full-time',
		region: 'Remote, UK',
		start: 'Aug 2022',
		end: 'Jul 2025',
		bullets: [
			'As a senior developer in the Studio 14 team, led front-end design and development for NGOs, public bodies and agencies, building responsive, accessible interfaces.',
			'Worked on the front end of the Newborn Toolkit for NEST360 and UNICEF, including its PANSAA partnership subsite, and the Sandwell Business Growth council site.',
			'Helped revamp the CEMatchMaker platform, improving site performance by 35% and user engagement by 40%.',
			'Helped optimise the WorldKite residency tracker, reducing page load times by 50% and extending its tax-tracking features.',
			'Worked on admin panels for Ericc Help Desk and the Gender Lens platform that reduced administrative workload by 25%.',
		],
	},
	{
		company: 'Montech Studios Inc.',
		title: 'Back End Developer',
		type: 'Full-time',
		region: 'Remote, US',
		start: 'Feb 2022',
		end: 'Jul 2022',
		bullets: [
			'Built backend infrastructure supporting over 10,000 concurrent users on blockchain applications.',
			'Streamlined API integrations for Web3 applications, reducing data retrieval latency by 40%.',
		],
	},
	{
		company: 'Scrapays Technologies',
		title: 'Fullstack Developer',
		type: 'Full-time',
		region: 'Nigeria',
		start: 'Jan 2020',
		end: 'Aug 2022',
		bullets: [
			'Built the first version of the Scrapays web and mobile platform independently, creating infrastructure that met early-stage business needs.',
			'Shipped the Android app on Google Play, growing its user base by 300% in the first six months.',
			'Developed a real-time IoT waste-tracking system that improved operational efficiency by 50%.',
			'Delivered demo-ready applications that helped secure partnerships.',
		],
	},
	{
		company: 'The Binary Agency',
		title: 'Software Engineer',
		type: 'Freelance',
		region: 'Remote',
		start: 'Jan 2019',
		end: 'Jan 2020',
		bullets: [
			'Built and maintained bespoke web applications for multiple clients, delivering to specification and on time.',
			'Delivered five client projects on schedule, each with a 95% satisfaction rate.',
		],
	},
];

export const projects: Project[] = [
	{
		slug: 'canoo',
		name: 'Canoo',
		line: "A free app opening Canada's museums, parks and concerts to newcomers. Senior engineer on the team across the app, canoo.ca and the backend.",
		org: 'Institute for Canadian Citizenship',
		years: '2025–now',
		url: 'https://canoo.ca/',
		image: '/work/canoo-web.webp',
		imageSize: workImages['canoo-web'],
		imageAlt: 'The canoo.ca home page',
		stack: 'React Native · Next.js · Node.js · CMS',
		reel: {
			webm: '/work/canoo-reel.webm',
			mp4: '/work/canoo-reel.mp4',
			poster: '/work/canoo-reel-poster.webp',
			label: 'Screen recording: the canoo.ca website scrolling, then the Canoo app',
		},
	},
	{
		slug: 'newborn',
		name: 'Newborn Toolkit',
		line: 'Implementation toolkit for small and sick newborn care, co-created by NEST360 and UNICEF, with the PANSAA partnership subsite.',
		org: 'Studio 14',
		years: '2022–25',
		url: 'https://newborntoolkit.org/',
		image: '/work/newborn.webp',
		imageSize: workImages.newborn,
		imageAlt: 'The Newborn Toolkit home page',
		subsite: { name: 'PANSAA', url: 'https://pansaa.newborntoolkit.org/' },
	},
	{
		slug: 'cematchmaker',
		name: 'CEMatchMaker',
		line: 'Platform revamp: 35% faster, 40% more engagement.',
		org: 'Studio 14',
		years: '2022–25',
		url: 'https://cematchmaker.com/',
		image: '/work/cematchmaker.webp',
		imageSize: workImages.cematchmaker,
		imageAlt: 'The CEMatchMaker home page',
	},
	{
		slug: 'worldkite',
		name: 'WorldKite',
		line: 'Residency and tax tracker; page loads cut in half.',
		org: 'Studio 14',
		years: '2022–25',
		url: 'https://worldkite.co.uk/',
		image: '/work/worldkite.webp',
		imageSize: workImages.worldkite,
		imageAlt: 'The WorldKite home page',
	},
	{
		slug: 'ericc',
		name: 'Ericc Help Desk',
		line: 'Admin panel for an NGO help desk; 25% less admin work.',
		org: 'Studio 14',
		years: '2022–25',
		url: 'https://ericchelpdesk.org/',
		image: '/work/ericc.webp',
		imageSize: workImages.ericc,
		imageAlt: 'The Ericc Help Desk home page',
	},
	{
		slug: 'scrapays',
		name: 'Scrapays',
		line: 'First version of the recycling platform: web, Android app and real-time IoT tracking.',
		org: 'Scrapays',
		years: '2020–22',
		url: 'https://scrapays.com/',
		image: '/work/scrapays.webp',
		imageSize: workImages.scrapays,
		imageAlt: 'The Scrapays home page',
		app: {
			name: 'Scrapays Agent',
			store: 'Google Play',
			url: 'https://play.google.com/store/apps/details?id=com.scrapays.agent',
		},
		reel: {
			webm: '/work/scrapays-reel.webm',
			mp4: '/work/scrapays-reel.mp4',
			poster: '/work/scrapays-reel-poster.webp',
			label: 'Screen recording: the scrapays.com website scrolling, then the Scrapays Agent Android app as it is today',
		},
	},
];

export const alsoBuilt: AlsoBuilt[] = [
	{
		name: 'Naseeb by Qadr',
		kind: 'Wedding website, design by Qoreeb Abubakar',
		year: '2025',
		url: 'https://naseeb-by-qadr.pages.dev/',
		image: '/work/naseeb.webp',
	},
	{
		name: 'Sandwell Business Growth',
		kind: 'Council business-support site, Studio 14',
		year: '2023',
		url: 'https://www.sandwell.gov.uk/SBG/',
		image: '/work/sandwell.webp',
	},
	{
		name: 'Gender Lens',
		kind: 'Impact investing site for Plan International, Studio 14',
		year: '2023',
		url: 'https://gender-lens-wp.s14staging.uk/',
		image: '/work/gender-lens.webp',
	},
	{ name: 'Montech', kind: 'Web3 backends, 10,000+ concurrent users', year: '2022' },
	{
		name: 'This site',
		kind: 'Next.js, on GitHub',
		year: '2026',
		url: 'https://github.com/musab-olurode/portfolio',
		image: '/work/this-site.webp',
	},
];

export const skills: string[] = [
	'TypeScript',
	'JavaScript',
	'React',
	'Next.js',
	'React Native',
	'Kotlin',
	'Flutter',
	'Angular',
	'Node.js',
	'NestJS',
	'Laravel (PHP)',
	'Go',
	'GraphQL',
	'PostgreSQL',
	'MySQL',
	'MongoDB',
	'Firebase',
	'AWS',
	'Docker',
	'Tailwind CSS',
	'web3.js',
	'Webflow',
	'Headless CMS',
	'Git',
];

export const competencies: string[] = [
	'Frontend development',
	'Backend and API development',
	'Mobile app development',
	'Database design',
	'Web3 development',
	'Technical leadership',
];

export const softSkills =
	'Communication, team leadership, adaptability, critical thinking, attention to detail, time management, collaboration';

export const education = {
	school: 'University of Ilorin',
	degree: 'B.Sc. Computer Science',
};
