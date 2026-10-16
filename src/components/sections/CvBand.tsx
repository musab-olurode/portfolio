import { profile, roles } from '@/content/profile';

export default function CvBand(): React.JSX.Element {
	return (
		<section
			aria-labelledby='cv-heading'
			className='grid grid-cols-1 gap-12 bg-band px-4 py-28 text-band-ink sm:px-8 lg:grid-cols-12 lg:gap-6 lg:py-40'
			id='cv'>
			<h2 className='reveal text-heading lg:col-span-4' id='cv-heading'>
				Seven years,
				<br />
				five teams
			</h2>
			<div className='flex flex-col gap-10 lg:col-span-7 lg:col-start-6'>
				<ol className='flex flex-col gap-10'>
					{roles.map((role, i) => (
						<li key={role.company} className='reveal' style={{ '--d': `${80 + i * 60}ms` } as React.CSSProperties}>
							<p className='text-lead'>{role.company}</p>
							<p className='mt-1 text-band-soft'>
								{role.title} · {role.type}, {role.region} · {role.start} to {role.end === 'Present' ? 'now' : role.end}
							</p>
						</li>
					))}
				</ol>
				<a className='btn self-start bg-band-ink! text-band!' href={profile.resumePdf}>
					Download the résumé
				</a>
			</div>
		</section>
	);
}
