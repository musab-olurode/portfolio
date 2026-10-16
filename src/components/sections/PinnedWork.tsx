import Image from 'next/image';
import { projects, type Project } from '@/content/profile';

function Caption({ project }: { project: Project }) {
	return (
		<div className='reveal max-w-[30rem]'>
			<h3 className='font-display text-[clamp(40px,4vw,60px)] leading-none'>
				<a href={project.url} target='_blank' rel='noreferrer' className='link-underline'>
					{project.name}
				</a>
			</h3>
			<p className='mt-3 text-lg'>{project.line}</p>
			<p className='text-soft mt-3'>
				{project.org} · {project.years}
				{project.stack ? ` · ${project.stack}` : ''}
			</p>
			{project.subsite && (
				<p className='mt-2'>
					Also:{' '}
					<a href={project.subsite.url} target='_blank' rel='noreferrer' className='underline underline-offset-4'>
						the {project.subsite.name} subsite
					</a>
				</p>
			)}
		</div>
	);
}

function Shot({ project, className, sizes }: { project: Project; className: string; sizes: string }) {
	return (
		<a href={project.url} target='_blank' rel='noreferrer' tabIndex={-1} aria-hidden className={`block overflow-hidden bg-step-2 ${className}`}>
			<Image src={project.image} alt='' width={1200} height={1800} sizes={sizes} className='reveal reveal-img h-full w-full object-cover object-top' />
		</a>
	);
}

export default function PinnedWork() {
	return (
		<section id='work' aria-labelledby='work-heading' className='bg-step relative'>
			<h2 id='work-heading' className='sr-only'>
				Selected work
			</h2>

			{/* Desktop: the title stays pinned while each project passes beneath it. */}
			<div className='hidden lg:block'>
				<div className='pointer-events-none sticky top-0 z-10 -mb-[100svh] h-svh px-8 pt-[10svh] text-white mix-blend-difference' aria-hidden>
					<p className='font-display text-[clamp(96px,12.6vw,200px)] leading-[0.9] tracking-[-0.03em]'>
						Web, mobile
						<br />
						and backend.
					</p>
				</div>
				{projects.map((project) => (
					<article key={project.slug} className='relative grid h-svh grid-cols-12 gap-6 px-8 pb-[8svh]'>
						<div className='col-span-4 self-end' data-reveal-group>
							<Caption project={project} />
						</div>
						<div className='relative col-span-5 col-start-8 self-center'>
							<Shot project={project} className='aspect-[4/5] h-[74svh] w-auto' sizes='(min-width: 1024px) 40vw, 100vw' />
							{project.extraImages && (
								<div className='absolute -bottom-[6svh] -left-[34%] flex gap-3'>
									{project.extraImages.map((img) => (
										<Image
											key={img.src}
											src={img.src}
											alt={img.alt}
											width={860}
											height={1864}
											sizes='12vw'
											className='reveal reveal-img h-[40svh] w-auto'
											style={{ '--d': '160ms' } as React.CSSProperties}
										/>
									))}
								</div>
							)}
						</div>
					</article>
				))}
			</div>

			{/* Phones and tablets: a plain stacked list. */}
			<div className='flex flex-col gap-20 px-4 py-24 sm:px-8 lg:hidden'>
				<p className='reveal font-display text-[clamp(52px,13vw,104px)] leading-[0.92] tracking-[-0.03em]' aria-hidden>
					Web, mobile and backend.
				</p>
				{projects.map((project) => (
					<article key={project.slug} className='flex flex-col gap-6'>
						<Shot project={project} className='aspect-[16/10] w-full' sizes='100vw' />
						<Caption project={project} />
					</article>
				))}
			</div>
		</section>
	);
}
