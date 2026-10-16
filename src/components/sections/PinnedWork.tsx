import Image from 'next/image';
import WorkIndex from '@/components/WorkIndex';
import { projects, type Project } from '@/content/profile';

function Caption({ project }: { project: Project }) {
	return (
		<div className='reveal max-w-[34rem]'>
			<h3 className='text-heading'>
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

function Shot({ project }: { project: Project }) {
	return (
		<a
			href={project.url}
			target='_blank'
			rel='noreferrer'
			tabIndex={-1}
			aria-hidden
			className='reveal reveal-img bg-step-2 block aspect-[16/10] overflow-hidden lg:aspect-[4/5]'>
			<Image src={project.image} alt='' width={1200} height={1800} sizes='(min-width: 1024px) 42vw, 100vw' className='pan h-auto w-full' />
		</a>
	);
}

export default function PinnedWork() {
	return (
		<section id='work' aria-labelledby='work-heading' className='bg-step px-4 py-28 sm:px-8 lg:py-0'>
			<h2 id='work-heading' className='sr-only'>
				Selected work
			</h2>
			<div className='lg:grid lg:grid-cols-12 lg:gap-6'>
				{/* The title stays pinned in its own column while the projects pass beside it. */}
				<div className='lg:col-span-6'>
					<div className='lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center'>
						<p className='reveal text-display' aria-hidden>
							Web, mobile
							<br />
							and backend.
						</p>
						<WorkIndex items={projects.map(({ slug, name }) => ({ slug, name }))} />
					</div>
				</div>
				<div className='mt-16 flex flex-col gap-24 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:gap-32 lg:py-[16svh]'>
					{projects.map((project) => (
						<article key={project.slug} id={`work-${project.slug}`} className='flex scroll-mt-[12svh] flex-col gap-6'>
							<Shot project={project} />
							{project.extraImages && (
								<div className='grid grid-cols-2 gap-4'>
									{project.extraImages.map((img, i) => (
										<Image
											key={img.src}
											src={img.src}
											alt={img.alt}
											width={860}
											height={1864}
											sizes='(min-width: 1024px) 20vw, 50vw'
											className='reveal reveal-img h-auto w-full'
											style={{ '--d': `${80 + i * 80}ms` } as React.CSSProperties}
										/>
									))}
								</div>
							)}
							<Caption project={project} />
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
