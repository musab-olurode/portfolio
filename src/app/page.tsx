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
