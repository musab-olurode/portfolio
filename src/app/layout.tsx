import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';

import { themeInitScript } from '@/lib/theme';
import { profile } from '@/content/profile';

import './globals.css';

const serif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-instrument-serif' });
const geist = Geist({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-geist' });

const description = 'Full-stack engineer with 7+ years building web apps, mobile apps and the backends behind them.';

const title = "Mus'ab Olurode — Full-stack engineer";

export const metadata: Metadata = {
	metadataBase: new URL(profile.site),
	title,
	description,
	applicationName: profile.name,
	authors: [{ name: profile.name, url: profile.site }],
	creator: profile.name,
	keywords: [
		'full-stack engineer',
		'senior engineer',
		'TypeScript',
		'React',
		'Next.js',
		'React Native',
		'Node.js',
		'NestJS',
		'remote',
	],
	alternates: { canonical: '/' },
	formatDetection: { telephone: false, address: false, email: false },
	openGraph: {
		title,
		description,
		url: '/',
		siteName: profile.name,
		locale: 'en_GB',
		type: 'profile',
		firstName: "Mus'ab",
		lastName: 'Olurode',
		username: 'musab-olurode',
	},
	twitter: { card: 'summary_large_image', creator: '@_RedDxt', title, description },
	robots: { index: true, follow: true },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f3f3f0' },
		{ media: '(prefers-color-scheme: dark)', color: '#1a2039' },
	],
};

const beaconToken = process.env['NEXT_PUBLIC_CF_BEACON_TOKEN'];

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html suppressHydrationWarning className={`${serif.variable} ${geist.variable}`} lang='en'>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				{children}
				{beaconToken && (
					<script
						defer
						data-cf-beacon={JSON.stringify({ token: beaconToken })}
						src='https://static.cloudflareinsights.com/beacon.min.js'
					/>
				)}
			</body>
		</html>
	);
}
