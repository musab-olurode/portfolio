import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import { profile } from '@/content/profile';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const serif = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-instrument-serif' });
const geist = Geist({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-geist' });

const description = 'Full-stack engineer with 7+ years building web apps, mobile apps and the backends behind them.';

export const metadata: Metadata = {
	metadataBase: new URL(profile.site),
	title: "Mus'ab Olurode — Full-stack engineer",
	description,
	alternates: { canonical: '/' },
	openGraph: { title: "Mus'ab Olurode — Full-stack engineer", description, url: '/', siteName: "Mus'ab Olurode", type: 'website' },
	twitter: { card: 'summary_large_image', creator: '@_RedDxt' },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f3f3f0' },
		{ media: '(prefers-color-scheme: dark)', color: '#1a2039' },
	],
};

const beaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className={`${serif.variable} ${geist.variable}`} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				{children}
				{beaconToken && (
					<script
						defer
						src='https://static.cloudflareinsights.com/beacon.min.js'
						data-cf-beacon={JSON.stringify({ token: beaconToken })}
					/>
				)}
			</body>
		</html>
	);
}
