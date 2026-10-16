import { figures } from '@/content/profile';

import CountUp from '@/components/CountUp';
import OverlapLine from '@/components/OverlapLine';

export default function Figures(): React.JSX.Element {
	return (
		<section
			aria-labelledby='figures-heading'
			className='flex min-h-[80svh] flex-col justify-center gap-10 px-4 py-28 sm:px-8 lg:px-[8.5vw]'>
			<h2 className='reveal text-display' id='figures-heading'>
				Since {figures.since}:
				<br />
				{figures.teams}&nbsp;teams, {figures.countries}&nbsp;countries.
			</h2>
			<p className='reveal max-w-[34ch] text-lead' style={{ '--d': '80ms' } as React.CSSProperties}>
				The latest, Canoo, has welcomed{' '}
				<span className='whitespace-nowrap'>
					<CountUp value={figures.canooMembers} /> newcomers
				</span>{' '}
				to Canada. I was the senior engineer on its app, site and backend.
			</p>
			<div className='reveal' style={{ '--d': '160ms' } as React.CSSProperties}>
				<OverlapLine />
			</div>
		</section>
	);
}
