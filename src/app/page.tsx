import { profileJsonLd } from '@/lib/structured-data';

import Reveal from '@/components/Reveal';
import AlsoBuilt from '@/components/sections/AlsoBuilt';
import CvBand from '@/components/sections/CvBand';
import Figures from '@/components/sections/Figures';
import Footer from '@/components/sections/Footer';
import Hero from '@/components/sections/Hero';
import PinnedWork from '@/components/sections/PinnedWork';

export default function Home(): React.JSX.Element {
	return (
		<>
			<script
				// JSON-LD must be raw JSON; < is escaped so content can never close the tag.
				dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd()).replace(/</g, '\\u003c') }}
				type='application/ld+json'
			/>
			<Hero />
			<main>
				<Figures />
				<PinnedWork />
				<AlsoBuilt />
				<CvBand />
			</main>
			<Footer />
			<Reveal />
		</>
	);
}
