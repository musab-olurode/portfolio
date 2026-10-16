import { profile, roles } from '@/content/profile';

export default function CvBand() {
	return (
		<section id='cv' aria-labelledby='cv-heading' className='bg-band text-band-ink grid grid-cols-1 gap-12 px-4 py-28 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:py-40'>
			<h2 id='cv-heading' className='reveal font-display text-[clamp(52px,5vw,76px)] leading-[0.95] lg:col-span-4'>
				Seven years,
				<br />
				five teams
			</h2>
			<div className='flex flex-col gap-10 lg:col-span-7 lg:col-start-6'>
				<ol className='flex flex-col gap-10'>
					{roles.map((role, i) => (
						<li key={role.company} className='reveal' style={{ '--d': `${80 + i * 60}ms` } as React.CSSProperties}>
							<p className='font-display text-[clamp(30px,2.4vw,36px)] leading-tight'>{role.company}</p>
							<p className='text-band-soft mt-1'>
								{role.title} · {role.type}, {role.region} · {role.start} to {role.end === 'Present' ? 'now' : role.end}
							</p>
						</li>
					))}
				</ol>
				<a href={profile.resumePdf} className='btn !bg-band-ink !text-band self-start'>
					Download the résumé
				</a>
			</div>
		</section>
	);
}
