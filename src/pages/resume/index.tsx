import type { NextPage } from 'next';
import Page from '../../components/Page';
import Head from 'next/head';
import clsx from 'clsx';
import useCurrentTheme from '../../hooks/useCurrentTheme';

const Print: NextPage = () => {
	const [currentTheme] = useCurrentTheme();

	return (
		<>
			<Head>
				<title>Mus&apos;ab Olurode - Full Stack Developer</title>
				<meta
					name='description'
					content='Experienced full-stack developer with over 5 years of professional experience'
				/>
			</Head>
			<a
				href={process.env.NEXT_PUBLIC_RESUME_URL}
				target='_blank'
				rel='noreferrer'
				className={clsx('link absolute top-0 right-10', currentTheme === 'light' ? 'text-main' : 'text-white')}>
				Download PDF
			</a>
			<Page>
				<div className='font-sans px-8 space-y-6'>
					{/* Header/Contact Info */}
					<header className='text-center space-y-2'>
						<h1 className='text-2xl font-bold text-[#003366]'>MUS&apos;AB OLURODE</h1>
						<p className='text-sm'>
							Kwara, NGA | P: +2348101340291 | olurodemusab@gmail.com |{' '}
							<a href='https://www.linkedin.com/in/musab-olurode' className='text-blue-600 link'>
								LinkedIn Profile
							</a>{' '}
							|{' '}
							<a href='https://github.com/musab-olurode' className='text-blue-600 link'>
								Github
							</a>{' '}
							|{' '}
							<a href='https://www.musabolurode.dev' className='text-blue-600 link'>
								Portfolio
							</a>
						</p>
					</header>

					{/* Professional Summary */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>PROFESSIONAL SUMMARY</h2>
						<p className='text-sm'>
							Results-driven Full Stack Developer with over 6 years of hands-on experience delivering scalable,
							consumer-focused digital solutions. Skilled at building robust web and mobile applications using modern
							frameworks and languages, including Typescript, React.js, React Native, Node.js, Kotlin, PHP (Laravel),
							and Go. Proven expertise in frontend and backend development, driving efficiency and innovation for
							startups, agencies, and government projects.
						</p>
					</section>

					{/* Core Competencies */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>CORE COMPETENCIES</h2>
						<div className='grid grid-cols-2 gap-4'>
							<ul className='list-disc list-outside ml-4 text-sm'>
								<li>Frontend Development</li>
								<li>Backend Development</li>
								<li>Mobile App Development</li>
								<li>Web3 Development</li>
								<li>Project Management</li>
							</ul>
							<ul className='list-disc list-outside ml-4 text-sm'>
								<li>Database Management</li>
								<li>Problem-Solving</li>
							</ul>
						</div>
					</section>

					{/* Work Experience */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>WORK EXPERIENCE</h2>

						<div className='space-y-4'>
							{/* Studio 14 */}
							<div>
								<div className='flex justify-between items-baseline'>
									<div>
										<h3 className='font-bold text-[#800000]'>Senior Frontend Developer</h3>
										<p className='italic'>Studio 14</p>
									</div>
									<div className='text-right'>
										<p className='italic'>Remote</p>
										<p className='text-sm'>Apr 2022 – Till date</p>
									</div>
								</div>
								<ul className='list-disc list-outside ml-4 text-sm mt-2 space-y-1'>
									<li>
										Leading the design and development of frontend applications, creating responsive, user-friendly
										interfaces for diverse clients.
									</li>
									<li>
										Collaborating with cross-functional teams to deliver high-quality digital solutions, ensuring
										compliance with accessibility standards and user experience best practices.
									</li>
									<li>
										Revamped the{' '}
										<a href='https://cematchmaker.com/' className='text-blue-600 link'>
											CEMatchMaker
										</a>{' '}
										platform, improving site performance by 35% and user engagement by 40%.
									</li>
									<li>
										Optimized the{' '}
										<a href='https://worldkite.co.uk' className='text-blue-600 link'>
											WorldKite
										</a>{' '}
										residency tracker, reducing page load times by 50% and enhancing functionality with advanced
										tax-tracking algorithms.
									</li>
									<li>
										Developed admin panels for NGOs (
										<a href='https://ericchelpdesk.org' className='text-blue-600 link'>
											Ericc Help Desk
										</a>
										) and advocacy platforms (
										<a href='https://gender-lens-wp.s14staging.uk/' className='text-blue-600 link'>
											Gender Lens
										</a>
										), simplifying backend operations and reducing administrative workload by 25%.
									</li>
								</ul>
							</div>

							{/* Montech Studios Inc. */}
							<div>
								<div className='flex justify-between items-baseline'>
									<div>
										<h3 className='font-bold text-[#800000]'>Backend Developer</h3>
										<p className='italic'>Montech Studios Inc.</p>
									</div>
									<div className='text-right'>
										<p className='italic'>Remote</p>
										<p className='text-sm'>Feb 2022 – Jul 2022</p>
									</div>
								</div>
								<ul className='list-disc list-outside ml-4 text-sm mt-2 space-y-1'>
									<li>
										Built backend infrastructures supporting over 10,000 concurrent users on blockchain applications.
									</li>
									<li>Streamlined API integrations for Web3 applications, reducing data retrieval latency by 40%.</li>
								</ul>
							</div>

							{/* Scrapays Technologies */}
							<div>
								<div className='flex justify-between items-baseline'>
									<div>
										<h3 className='font-bold text-[#800000]'>Full Stack Developer</h3>
										<p className='italic'>Scrapays Technologies</p>
									</div>
									<div className='text-right'>
										<p className='italic'>Remote</p>
										<p className='text-sm'>Jan 2020 – Aug 2022</p>
									</div>
								</div>
								<ul className='list-disc list-outside ml-4 text-sm mt-2 space-y-1'>
									<li>
										Spearheaded the development of the first version of the Scrapays web and mobile platform, working
										independently to create a robust infrastructure that met early-stage business needs.
									</li>
									<li>
										Deployed a fully functional mobile app on Google Play Store, increasing the app’s user base by 300%
										in the first six months.
									</li>
									<li>
										Developed a real-time IoT-enabled waste tracking system that improved operational efficiency by 50%
									</li>
									<li>
										Played a pivotal role in securing partnerships by delivering demo-ready applications showcasing the
										product&apos;s potential.
									</li>
								</ul>
							</div>

							{/* The Binary Agency */}
							<div>
								<div className='flex justify-between items-baseline'>
									<div>
										<h3 className='font-bold text-[#800000]'>Software Engineer</h3>
										<p className='italic'>The Binary Agency</p>
									</div>
									<div className='text-right'>
										<p className='italic'>Remote</p>
										<p className='text-sm'>Jan 2019 – Jan 2020</p>
									</div>
								</div>
								<ul className='list-disc list-outside ml-4 text-sm mt-2 space-y-1'>
									<li>
										Built and maintained bespoke web applications for multiple clients, ensuring timely delivery and
										adherence to project specifications.
									</li>
									<li>Delivered five client projects on schedule, each with a 95% satisfaction rate.</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Education */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>EDUCATION</h2>
						<div>
							<div className='flex justify-between'>
								<h3 className='font-bold text-[#800000]'>University of Ilorin</h3>
								<span className='italic'>Kwara, NGA</span>
							</div>
							<div className='flex justify-between'>
								<p className='text-sm italic'>B.Sc. Computer Science</p>
								<span className='text-sm italic'>Sep. 2019 - Aug. 2024</span>
							</div>
							<p className='text-sm italic'>
								Relevant Coursework: Software Development, Web Programming, Algorithms, and Data Structures.
							</p>
						</div>
					</section>

					{/* Projects */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>PROJECTS</h2>
						<ul className='list-disc list-outside ml-4 text-sm space-y-2'>
							<li>
								<a href='https://scrapays.com/' className='text-blue-600 link font-bold'>
									Scrapays Web and Mobile Platforms:
								</a>{' '}
								Developed a comprehensive platform for waste recycling management, integrating IoT features.
							</li>
							<li>
								<span className='font-bold text-[#800000]'>Web3 Apps at Montech Studios:</span> Engineered secure
								backend systems for crypto wallets and blockchain games.
							</li>
							<li>
								<span className='font-bold text-[#800000]'>Studio 14 Government Projects:</span> Delivered digital
								products for institutions and NGOs, including platforms for healthcare, tax tracking, and advocacy.
							</li>
						</ul>
					</section>

					{/* Additional Skills */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>ADDITIONALS</h2>
						<div className='space-y-2 text-sm'>
							<p>
								<span className='font-bold'>Technical Skills:</span> Git, Typescript, React, Next.js, React Native,
								TailwindCSS, GraphQL, Node.js, NestJS, Laravel, Go, Docker, Firebase, MongoDB, MySQL, PostgreSQL,
								Firebase Firestore.
							</p>
							<p>
								<span className='font-bold'>Soft Skills:</span> Communication, Team Leadership, Adaptability, Critical
								Thinking, Attention to Detail, Time Management, Collaboration, Creative Problem-Solving
							</p>
						</div>
					</section>

					{/* References */}
					<section>
						<h2 className='text-lg font-bold text-[#003366] border-b border-gray-300 mb-3'>REFERENCES</h2>
						<p className='text-sm'>Available on request</p>
					</section>
				</div>
			</Page>
		</>
	);
};

export default Print;
