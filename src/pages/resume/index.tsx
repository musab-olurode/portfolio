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
				className={clsx(
					'link absolute top-0 right-10',
					currentTheme === 'light' ? 'text-main' : 'text-white'
				)}>
				Download PDF
			</a>
			<Page>
				<div className='h-full p-14 font-sans font-medium'>
					<h1 className='text-2xl font-black'>Mus&apos;ab Olurode</h1>
					<div className='flex'>
						<a className='link text-sm' href='mailto:olurodemusab@gmail.com'>
							olurodemusab@gmail.com
						</a>
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
					</div>

					<div className='mt-8'>
						<p className='mb-2 font-black text-xl'>SUMMARY</p>
						Full-stack developer with 5 years of industry experience familiar
						with a wide range of programming utilities and languages with
						excellent technical abilities. Proven experience developing
						consumer-focused applications using Typescript, React, Next.js,
						Nodejs, React Native, and PHP (Laravel).
					</div>

					<p className='mt-8 mb-2 font-black text-xl'>EXPERIENCE</p>

					<div className=''>
						<div className='flex justify-between'>
							<span className='font-black'>Frontend Developer</span>
							<span>Aug 2022 - Present</span>
						</div>
						<div className='pt-1'>Studio 14</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>Building sophisticated frontend applications.</li>
							<li>
								Building vanilla HTML templates for WordPress applications.
							</li>
						</ul>
					</div>

					<div className='pt-8'>
						<div className='flex justify-between'>
							<span className='font-black'>Backend Developer</span>
							<span>February 2022 - July 2022</span>
						</div>
						<div className='pt-1'>Montech Studio</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Built proof of concepts for existing project specifications.
							</li>
							<li>Managed and updated full-fledged web3 applications.</li>
						</ul>
					</div>

					<div className='pt-8'>
						<div className='flex justify-between'>
							<span className='font-black'>Full-stack Developer</span>
							<span>January 2020 - August 2022</span>
						</div>
						<div className='pt-1'>Scrapays Technologies</div>
						<ul className='list-disc mt-2 text-sm pl-6'>
							<li>
								Led the development of the company&apos;s flagship product as a
								principal engineer.
							</li>
							<li>
								Developed mobile apps, landing pages, dashboards and IOT
								applications for the company&apos;s product.
							</li>
						</ul>
					</div>

					<div className='pt-8'>
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
						<li>Backend - Typescript, NodeJs, NestJs, Docker, Laravel</li>
						<li>Databases - MongoDB, MySQL, PostgreSQL</li>
						<li>
							Frontend - Typescript, React, Next.js, React Native, TailwindCSS,
							React Native
						</li>
					</ul>
				</div>
			</Page>
		</>
	);
};

export default Print;
