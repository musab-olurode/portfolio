import { profile } from '@/content/profile';

export default function Footer(): React.JSX.Element {
	const [user, domain] = profile.email.split('@');

	return (
		<footer className='flex min-h-[70svh] flex-col px-4 pt-20 pb-8 sm:px-8'>
			<p className='reveal text-lead'>Hiring for web, mobile or backend? Write to me.</p>
			<a
				className='reveal mt-auto pt-20 font-display text-[clamp(64px,16vw,96px)] leading-display tracking-[-0.03em] no-underline transition-opacity hover:opacity-80 md:text-[min(calc((100vw-4rem)/5),300px)]'
				href={`mailto:${profile.email}`}>
				{user}
				<wbr />@{domain}
			</a>
			<div className='mt-10 flex flex-col gap-2 text-base text-soft sm:flex-row sm:justify-between'>
				<span className='flex gap-5'>
					<a className='link-underline' href={profile.links.github} rel='noreferrer' target='_blank'>
						GitHub
					</a>
					<a className='link-underline' href={profile.links.linkedin} rel='noreferrer' target='_blank'>
						LinkedIn
					</a>
					<a className='link-underline' href={profile.links.x} rel='noreferrer' target='_blank'>
						X
					</a>
				</span>
				<a className='link-underline' href={profile.resumePdf}>
					Résumé (PDF)
				</a>
				<span>Remote · GMT+1 · {new Date().getFullYear()}</span>
			</div>
		</footer>
	);
}
