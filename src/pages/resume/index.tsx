import type { NextPage } from 'next';
import Page from '../../components/Page';
import Head from 'next/head';
import clsx from 'clsx';
import useCurrentTheme from '../../hooks/useCurrentTheme';
import Link from 'next/link';

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
				// href={process.env.NEXT_PUBLIC_RESUME_URL}
				href='/api/pdf'
				// target='_blank'
				// rel='noreferrer'
				download='musab_olurode_resume.pdf'
				className={clsx(
					'link absolute top-0 right-10',
					currentTheme === 'light' ? 'text-main' : 'text-white'
				)}>
				Download PDF
			</a>
			<Page>
				<div className='h-full px-14 font-sans font-medium'>
					<h1 className='text-2xl font-black'>Mus&apos;ab Olurode</h1>
					<div className='flex'>
						<a className='link text-sm' href='mailto:olurodemusab@gmail.com'>
							olurodemusab@gmail.com
						</a>
						<div className='w-px border border-black mx-5'></div>
						<span className='text-sm'>Ilorin, Nigeria</span>
						<div className='w-px border border-black mx-5'></div>
						<a
							className='link text-sm'
							href='https://www.linkedin.com/in/musab-olurode'>
							linkedin
						</a>
						<div className='w-px border border-black mx-5'></div>
						<a className='link text-sm' href='https://github.com/musab-olurode'>
							github
						</a>
						<div className='w-px border border-black mx-5'></div>
						<Link href='/'>
							<a className='link text-sm'>website</a>
						</Link>
					</div>

					<div className='mt-8'>
						<p className='mb-2 font-black text-xl'>SUMMARY</p>
						Full-stack developer with over 5 years of industry experience
						familiar with a wide range of programming utilities and languages
						with excellent technical abilities. Proven experience developing
						consumer-focused applications using Typescript, React.js, React
						Native, Node.js, Kotlin, PHP (Laravel), and Go.
					</div>

					<p className='mt-8 mb-2 font-black text-xl'>EXPERIENCE</p>

					<div className=''>
						<div className='flex justify-between'>
							<span className='font-black'>Frontend Developer</span>
							<span>Aug 2022 - Present</span>
						</div>
						<div className='pt-1'>Studio 14</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Building sophisticated frontend applications with HTML, CSS, and
								Javascript.
							</li>
							<li>
								Building vanilla HTML templates for WordPress applications.
							</li>
						</ul>
					</div>

					<div className='pt-4'>
						<div className='flex justify-between'>
							<span className='font-black'>Backend Developer</span>
							<span>February 2022 - July 2022</span>
						</div>
						<div className='pt-1'>Montech Studio</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Built proof of concepts for existing project specifications
								using Typescript, React and Node.js
							</li>
							<li>Managed and updated full-fledged web3 applications.</li>
						</ul>
					</div>

					<div className='pt-4'>
						<div className='flex justify-between'>
							<span className='font-black'>Full-stack Developer</span>
							<span>January 2020 - August 2022</span>
						</div>
						<div className='pt-1'>Scrapays Technologies</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Led the development of the company&apos;s flagship product as a
								principal engineer using Typescript, Next.js, React Native,
								Nestjs, Graphql, and Laravel.
							</li>
							<li>
								Developed mobile apps, landing pages, dashboards and IOT
								applications for the company&apos;s product.
							</li>
						</ul>
					</div>

					<div className='pt-4'>
						<div className='flex justify-between'>
							<span className='font-black'>Software Engineer</span>
							<span>January 2019 - January 2020</span>
						</div>
						<div className='pt-1'>The Binary Agency</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Built and maintained web applications for multiple clients.
							</li>
							<li>
								Reviewed project specifications and developed solutions to meet
								the requirements.
							</li>
						</ul>
					</div>

					<p className='mt-8 mb-2 font-black text-xl'>TECHNICAL SKILLS</p>
					<ul className='list-disc mt-2 text-sm pl-6'>
						<li>
							Backend - Typescript, Node.js, NestJS, Docker, Laravel, Go,
							Firebase
						</li>
						{/* <li>
							Frontend - React, Typescript, HTML5, CSS3, Javascript, Styled
							Components, Next.js, React Native, TailwindCSS, React Native
						</li> */}
						<li>
							Frontend - Typescript, React, Next.js, React Native, TailwindCSS,
							React Native, Graphql
						</li>
						<li>Databases - MongoDB, MySQL, PostgreSQL, Firebase Firsetore</li>
					</ul>

					<p className='mt-8 mb-2 font-black text-xl'>EDUCATION</p>
					<div className='flex justify-between'>
						<span className='font-black'>University Of Ilorin</span>
						<span>September 2019 - August 2024</span>
					</div>
					<p className='mt-2 text-sm pl-6'>
						Bachelor of Science in computer science. Focused on software and
						programming, with courses like Algorithms, Data Structures, Web
						Programming and Compiler Design.
					</p>

					<p className='mt-8 mb-2 font-black text-xl'>LANGUAGES</p>
					<ul className='list-disc mt-2 text-sm pl-6'>
						<li>
							<span className='font-bold'>English</span> - native level
						</li>
						<li>
							<span className='font-bold'>Yoruba</span> - native level
						</li>
						<li>
							<span className='font-bold'>Arabic</span> - conversational level
						</li>
						<li>
							<span className='font-bold'>Japanese</span> - basic level
						</li>
					</ul>
				</div>
			</Page>
		</>
	);
};

export default Print;
