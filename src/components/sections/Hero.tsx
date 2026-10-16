import { profile } from '@/content/profile';

import ThemeToggle from '@/components/ThemeToggle';

export default function Hero(): React.JSX.Element {
	const [first, last] = profile.name.split(' ');
	const [tagRole, tagWhere] = profile.tagline.split(' · ');

	return (
		<header className='flex min-h-svh flex-col px-4 pt-6 pb-10 sm:px-8 sm:pt-7 sm:pb-12'>
			<nav aria-label='Main' className='flex items-baseline justify-between gap-6 text-base'>
				<span>
					{tagRole}
					<span className='hidden sm:inline'> · {tagWhere}</span>
				</span>
				<span className='flex items-baseline gap-6 sm:gap-7'>
					<a className='link-underline' href='#work'>
						Work
					</a>
					<a className='link-underline' href='#cv'>
						CV
					</a>
					<ThemeToggle />
				</span>
			</nav>

			<h1 className='mt-10 text-display-xl md:mt-6 md:whitespace-nowrap'>
				<span className='mask-line'>
					<span>{first}</span>
				</span>{' '}
				<span className='mask-line'>
					<span>{last}</span>
				</span>
			</h1>

			<div className='hero-rise mt-auto grid grid-cols-1 gap-8 pt-16 lg:grid-cols-12 lg:items-end lg:gap-6'>
				<p className='max-w-[30ch] text-lead lg:col-span-6'>{profile.promise}</p>
				<dl className='grid max-w-xl grid-cols-2 gap-6 text-base lg:col-span-4 lg:col-start-8'>
					<div>
						<dt className='font-medium'>Now</dt>
						<dd>{profile.now}</dd>
					</div>
					<div>
						<dt className='font-medium'>Stack</dt>
						<dd>{profile.stackShort}</dd>
					</div>
				</dl>
				<div className='lg:col-span-1 lg:col-start-12 lg:justify-self-end'>
					<a className='btn whitespace-nowrap' href={`mailto:${profile.email}`}>
						Hire me
					</a>
				</div>
			</div>
		</header>
	);
}
