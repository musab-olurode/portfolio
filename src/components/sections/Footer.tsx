import { profile } from '@/content/profile';

export default function Footer() {
	const [user, domain] = profile.email.split('@');
	return (
		<footer className='flex min-h-[70svh] flex-col px-4 pt-20 pb-8 sm:px-8'>
			<p className='reveal text-xl sm:text-2xl'>Hiring for web, mobile or backend? Write to me.</p>
			<a
				href={`mailto:${profile.email}`}
				className='reveal font-display mt-auto pt-20 text-[clamp(64px,16vw,260px)] leading-[0.9] tracking-[-0.03em] no-underline transition-opacity hover:opacity-80'>
				{user}
				<wbr />@{domain}
			</a>
			<div className='text-soft mt-10 flex flex-col gap-2 text-base sm:flex-row sm:justify-between'>
				<span className='flex gap-5'>
					<a href={profile.links.github} target='_blank' rel='noreferrer' className='link-underline'>
						GitHub
					</a>
					<a href={profile.links.linkedin} target='_blank' rel='noreferrer' className='link-underline'>
						LinkedIn
					</a>
					<a href={profile.links.x} target='_blank' rel='noreferrer' className='link-underline'>
						X
					</a>
				</span>
				<a href={profile.resumePdf} className='link-underline'>
					Résumé (PDF)
				</a>
				<span>Remote · GMT+1 · {new Date().getFullYear()}</span>
			</div>
		</footer>
	);
}
