import ThemeToggle from '@/components/ThemeToggle';
import { profile } from '@/content/profile';

export default function Hero() {
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
					<a href='#work' className='link-underline'>
						Work
					</a>
					<a href='#cv' className='link-underline'>
						CV
					</a>
					<ThemeToggle />
				</span>
			</nav>

			<h1 className='font-display mt-10 text-[clamp(84px,34vw,140px)] leading-[0.88] tracking-[-0.03em] md:mt-6 md:text-[clamp(96px,19.2vw,300px)] md:whitespace-nowrap'>
				<span className='mask-line'>
					<span>{first}</span>
				</span>{' '}
				<span className='mask-line'>
					<span>{last}</span>
				</span>
			</h1>

			<div className='hero-rise mt-auto grid grid-cols-1 gap-8 pt-16 md:grid-cols-12 md:items-end md:gap-6'>
				<p className='font-display text-[clamp(30px,3.1vw,46px)] leading-[1.08] md:col-span-6'>{profile.promise}</p>
				<dl className='grid grid-cols-2 gap-6 text-base md:col-span-4 md:col-start-8'>
					<div>
						<dt className='font-medium'>Now</dt>
						<dd>{profile.now}</dd>
					</div>
					<div>
						<dt className='font-medium'>Stack</dt>
						<dd>{profile.stackShort}</dd>
					</div>
				</dl>
				<div className='md:col-span-1 md:col-start-12 md:justify-self-end'>
					<a href={`mailto:${profile.email}`} className='btn whitespace-nowrap'>
						Hire me
					</a>
				</div>
			</div>
		</header>
	);
}
