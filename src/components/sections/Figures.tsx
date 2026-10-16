import CountUp from '@/components/CountUp';
import OverlapLine from '@/components/OverlapLine';
import { figures } from '@/content/profile';

const Fig = ({ children }: { children: React.ReactNode }) => <span className='text-ink'>{children}</span>;

export default function Figures() {
	return (
		<section aria-labelledby='figures-heading' className='flex min-h-[80svh] flex-col justify-center gap-12 px-4 py-24 sm:px-8 lg:px-[8.5vw]'>
			<h2 id='figures-heading' className='sr-only'>
				In numbers
			</h2>
			<p className='font-display text-soft max-w-[22ch] text-[clamp(34px,4.6vw,68px)] leading-[1.1] md:max-w-none'>
				Since <Fig>{figures.since}</Fig> I have shipped for <Fig>{figures.teams}&nbsp;teams</Fig> in{' '}
				<Fig>{figures.countries}&nbsp;countries</Fig>. The latest, Canoo, has welcomed{' '}
				<Fig>
					<CountUp value={figures.canooMembers} />
					&nbsp;newcomers
				</Fig>{' '}
				to Canada, with me as the senior engineer on its app, site and backend.
			</p>
			<OverlapLine />
		</section>
	);
}
