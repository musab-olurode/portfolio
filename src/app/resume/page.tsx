import type { Metadata } from 'next';
import { competencies, education, profile, projects, roles, skills, softSkills, summary } from '@/content/profile';
import styles from './resume.module.css';

export const metadata: Metadata = {
	title: "Mus'ab Olurode — Résumé",
	description: 'Résumé of Mus’ab Olurode, full-stack engineer with 7+ years of experience.',
	alternates: { canonical: '/resume' },
};

const heading = 'text-lg font-bold text-[#003366] border-b border-gray-300 mb-3';
const link = 'text-blue-600 underline';

const resumeProjects = projects.filter((p) => ['canoo', 'newborn', 'scrapays'].includes(p.slug));

export default function Resume() {
	return (
		<div className='min-h-svh bg-white py-0 font-sans text-black sm:bg-neutral-100 sm:py-10 print:bg-white print:py-0'>
			<a href={profile.resumePdf} className='absolute top-3 right-6 text-sm text-black underline print:hidden'>
				Download PDF
			</a>
			<main className={styles.page}>
				<div className='space-y-6 px-8'>
					<header className='space-y-2 text-center'>
						<h1 className='text-2xl font-bold text-[#003366] uppercase'>{profile.name}</h1>
						<p className='text-sm'>
							Remote (GMT+1) | <a href={`mailto:${profile.email}`} className={link}>{profile.email}</a> |{' '}
							<a href={profile.links.linkedin} className={link}>
								LinkedIn Profile
							</a>{' '}
							|{' '}
							<a href={profile.links.github} className={link}>
								Github
							</a>{' '}
							|{' '}
							<a href={profile.site} className={link}>
								Portfolio
							</a>
						</p>
					</header>

					<section>
						<h2 className={heading}>PROFESSIONAL SUMMARY</h2>
						<p className='text-sm'>{summary}</p>
					</section>

					<section>
						<h2 className={heading}>CORE COMPETENCIES</h2>
						<ul className='ml-4 grid list-outside list-disc grid-cols-2 gap-x-4 text-sm'>
							{competencies.map((c) => (
								<li key={c}>{c}</li>
							))}
						</ul>
					</section>

					<section>
						<h2 className={heading}>WORK EXPERIENCE</h2>
						<div className='space-y-4'>
							{roles.map((role) => (
								<div key={role.company} className='break-inside-avoid'>
									<div className='flex items-baseline justify-between'>
										<div>
											<h3 className='font-bold text-[#800000]'>{role.title}</h3>
											<p className='italic'>{role.company}</p>
										</div>
										<div className='text-right'>
											<p className='italic'>
												{role.type} · {role.region}
											</p>
											<p className='text-sm'>
												{role.start} – {role.end}
											</p>
										</div>
									</div>
									<ul className='mt-2 ml-4 list-outside list-disc space-y-1 text-sm'>
										{role.bullets.map((b) => (
											<li key={b}>{b}</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>

					<section className='break-inside-avoid'>
						<h2 className={heading}>EDUCATION</h2>
						<div className='flex justify-between'>
							<h3 className='font-bold text-[#800000]'>{education.school}</h3>
							<span className='text-sm italic'>{education.dates}</span>
						</div>
						<p className='text-sm italic'>{education.degree}</p>
					</section>

					<section className='break-inside-avoid'>
						<h2 className={heading}>PROJECTS</h2>
						<ul className='ml-4 list-outside list-disc space-y-2 text-sm'>
							{resumeProjects.map((p) => (
								<li key={p.slug}>
									<a href={p.url} className={`${link} font-bold`}>
										{p.name}:
									</a>{' '}
									{p.line}
								</li>
							))}
							<li>
								<span className='font-bold text-[#800000]'>More Studio 14 work:</span> CEMatchMaker,
								WorldKite, Ericc Help Desk, Gender Lens and Sandwell Business Growth.
							</li>
						</ul>
					</section>

					<section className='break-inside-avoid'>
						<h2 className={heading}>ADDITIONALS</h2>
						<div className='space-y-2 text-sm'>
							<p>
								<span className='font-bold'>Technical Skills:</span> {skills.join(', ')}.
							</p>
							<p>
								<span className='font-bold'>Soft Skills:</span> {softSkills}.
							</p>
						</div>
					</section>

					<section>
						<h2 className={heading}>REFERENCES</h2>
						<p className='text-sm'>Available on request</p>
					</section>
				</div>
			</main>
		</div>
	);
}
