import Image from 'next/image';

import { panFor } from '@/lib/pan';
import { type Project, projects } from '@/content/profile';

import ReelVideo from '@/components/ReelVideo';
import WorkIndex from '@/components/WorkIndex';

function Caption({ project }: { project: Project }) {
	return (
		<div className='reveal max-w-136'>
			<h3 className='text-heading'>
				<a className='link-underline' href={project.url} rel='noreferrer' target='_blank'>
					{project.name}
				</a>
			</h3>
			<p className='mt-3 text-lg'>{project.line}</p>
			<p className='mt-3 text-soft'>
				{project.org} · {project.years}
				{project.stack ? ` · ${project.stack}` : ''}
			</p>
			{project.subsite && (
				<p className='mt-2'>
					Also:{' '}
					<a className='underline underline-offset-4' href={project.subsite.url} rel='noreferrer' target='_blank'>
						the {project.subsite.name} subsite
					</a>
				</p>
			)}
		</div>
	);
}

function panStyle(project: Project): React.CSSProperties | undefined {
	const pan = panFor(project.imageSize);

	return pan ? ({ '--pan-end': pan.end, '--pan-duration': pan.duration } as React.CSSProperties) : undefined;
}

function Shot({ project }: { project: Project }): React.JSX.Element {
	if (project.reel) {
		return (
			<div className='reveal reveal-img aspect-4/5 overflow-hidden bg-step-2'>
				<ReelVideo className='size-full object-cover' {...project.reel} />
			</div>
		);
	}

	return (
		<a
			aria-hidden
			className='reveal reveal-img block aspect-16/10 overflow-hidden bg-step-2 lg:aspect-4/5'
			href={project.url}
			rel='noreferrer'
			tabIndex={-1}
			target='_blank'>
			<Image
				alt=''
				className='pan h-auto w-full'
				height={project.imageSize.height}
				sizes='(min-width: 1024px) 42vw, 100vw'
				src={project.image}
				style={panStyle(project)}
				width={project.imageSize.width}
			/>
		</a>
	);
}

export default function PinnedWork(): React.JSX.Element {
	return (
		<section aria-labelledby='work-heading' className='bg-step px-4 py-28 sm:px-8 lg:py-0' id='work'>
			<h2 className='sr-only' id='work-heading'>
				Selected work
			</h2>
			<div className='lg:grid lg:grid-cols-12 lg:gap-6'>
				{/* The title stays pinned in its own column while the projects pass beside it. */}
				<div className='lg:col-span-6'>
					<div className='lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center'>
						<p aria-hidden className='reveal text-display'>
							Web, mobile
							<br />
							and backend.
						</p>
						<WorkIndex items={projects.map(({ slug, name }) => ({ slug, name }))} />
					</div>
				</div>
				<div className='mt-16 flex flex-col gap-24 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:gap-32 lg:py-[16svh]'>
					{projects.map((project) => (
						<article key={project.slug} className='flex scroll-mt-[12svh] flex-col gap-6' id={`work-${project.slug}`}>
							<Shot project={project} />
							<Caption project={project} />
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
