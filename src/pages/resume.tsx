import type { NextPage } from 'next';
import Page from '../components/Page';
import AvatarImg from '../../public/avatar.jpg';
import Image from 'next/image';
import {
	LocationMarkerIcon,
	MailIcon,
	PhoneIcon,
} from '@heroicons/react/solid';
import { interests, languages, skills } from '../helpers/constants';
import BlobImg from '../../public/blob.svg';
import Head from 'next/head';

const Print: NextPage = () => {
	return (
		<>
			<Head>
				<title>Mus&apos;ab Olurode - Full Stack Developer</title>
				<meta
					name='description'
					content='Experienced full-stack developer with over 4+ years of professional experience'
				/>
			</Head>
			<a
				href='https://drive.google.com/file/d/1s3b2eJFmPri2QxJ3ZVHYX20gx0SdpJZX/view?usp=sharing'
				target='_blank'
				rel='noreferrer'
				className='link text-blue-900 absolute top-0 right-10'>
				Download PDF
			</a>
			<Page>
				<div className='grid grid-cols-6 h-full'>
					<div className='col-span-2 bg-gray-100 p-5 relative overflow-hidden'>
						<div className='absolute w-[30rem] h-[13rem] -top-[1rem] -left-[0rem] overflow-hidden'>
							<div className='w-32 scale-[4.0]'>
								<Image src={BlobImg} alt='blob' />
							</div>
						</div>
						<div className='avatar flex justify-center'>
							<div className='w-40 aspect-square object-cover rounded-full border-8 border-white'>
								<Image
									src={AvatarImg}
									alt='avatar'
									width={160}
									height={160}
									objectPosition='top'
								/>
							</div>
						</div>

						<div className='mt-8'>
							<div className='text-xl mb-2'>Contact</div>
							<div className='flex flex-row items-end'>
								<PhoneIcon className='w-6 h-5 mr-2' />
								<a className='link text-blue-700' href='tel:+2348101340291'>
									+2348101340291
								</a>
							</div>
							<div className='flex flex-row items-end'>
								<MailIcon className='w-6 h-5 mr-2' />
								<a
									className='link text-blue-700 text-sm'
									href='mailto:olurodemusab@gmail.com'>
									olurodemusab@gmail.com
								</a>
							</div>
							<div className='flex flex-row'>
								<LocationMarkerIcon className='w-6 h-5 mr-2' />
								<span className='text-blue-700'>Ilorin, Nigeria</span>
							</div>
						</div>

						<div className='mt-8'>
							<div className='text-xl mb-2'>Education</div>
							<div className='flex flex-row items-end'>2019 - Present</div>
							<div className='flex flex-row items-end'>
								<span className='text-blue-700 text-lg font-bold'>
									Computer Science
								</span>
							</div>
							<div className='flex flex-row items-end'>
								<span className=''>University of Ilorin</span>
							</div>
							<div className='divider my-2'></div>
						</div>

						<div>
							<div className='text-xl mb-2'>Skills</div>
							<div className='grid grid-cols-2 gap-y-1 gap-x-2'>
								{skills.map((skill, index) => (
									<div className='flex flex-row' key={index}>
										<div className='w-5 h-5 mr-2'>
											<Image src={skill.image} alt={skill.alt} />
										</div>
										{skill.name}
									</div>
								))}
							</div>
						</div>

						<div className='mt-8'>
							<div className='text-xl mb-2'>Languages</div>
							<div className=''>
								{languages.map((language, index) => (
									<div className='flex flex-row' key={index}>
										<div className='w-5 h-5 mr-3'>
											<Image src={language.image} alt={language.alt} />
										</div>
										{language.name} - {language.level}
									</div>
								))}
							</div>
						</div>

						<div className='mt-8'>
							<div className='text-xl mb-2'>Interests</div>
							<div className=''>
								{interests.map((interest, index) => (
									<div className='flex flex-row items-baseline' key={index}>
										<div className='w-5 h-5 mr-3 text-lg'>{interest.image}</div>
										{interest.name}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='col-span-4 p-4'>
						<h1 className='text-4xl font-bold'>
							Mus&apos;ab <span className='text-blue-900'>Olurode</span>
						</h1>
						<h3 className='text-xl'>Full-stack Developer</h3>

						<div className='mt-4'>
							<p className='mb-2 text-xl'>About</p>
							Well-qualified{' '}
							<span className='font-bold'>full-stack web developer</span>{' '}
							familiar with a wide range of programming utilities and languages
							with excellent technical abilities offering over{' '}
							<span className='font-bold'>4+ years</span> of related experience.
							Proven experience developing consumer-focused web-apps using{' '}
							<span className='font-bold'>Typescript</span>,{' '}
							<span className='font-bold'>React</span>,{' '}
							<span className='font-bold'>Next.js</span>,{' '}
							<span className='font-bold'>Nodejs</span>,{' '}
							<span className='font-bold'>HTML</span>,{' '}
							<span className='font-bold'>CSS</span>, and{' '}
							<span className='font-bold'>PHP (Laravel)</span>.
						</div>

						<div className='mt-6'>
							<p className='mb-2 text-xl'>Work Experience</p>
							<div>
								<div className='text-blue-900'>
									<span className='font-bold'>Studio 14</span> - Frontend
									Developer
								</div>
								<div>NOV 2022 - PRESENT | UNITED KINGDOM - REMOTE</div>
								<ul className='list-disc mt-2 text-sm pl-6'>
									<li>Building sophisticated frontend applications.</li>
									<li>
										Building vanilla HTML templates for WordPress applications.
									</li>
								</ul>
							</div>
							<div className='flex flex-row gap-x-2 mt-2'>
								{skills
									.filter((skill) => skill.application.includes('studio-14'))
									.map((skill, index) => (
										<div className='w-6 h-6' key={index}>
											<Image src={skill.image} alt={skill.alt} />
										</div>
									))}
							</div>
							<div className='divider'></div>
						</div>

						<div className='mt-2'>
							<div className='text-blue-900'>
								<span className='font-bold'>Montech Studios</span> - Backend
								Developer
							</div>
							<div>FEB 2022 - JUL 2022 | US - REMOTE</div>
							<ul className='list-disc mt-2 text-sm pl-6'>
								<li>Built proof of concepts for existing project concepts.</li>
								<li>Managed and updated full-fledged web3 applications.</li>
							</ul>
						</div>
						<div className='flex flex-row gap-x-2 mt-2'>
							{skills
								.filter((skill) => skill.application.includes('montech'))
								.map((skill, index) => (
									<div className='w-6 h-6' key={index}>
										<Image src={skill.image} alt={skill.alt} />
									</div>
								))}
						</div>
						<div className='divider'></div>

						<div className='mt-2'>
							<div className='text-blue-900'>
								<span className='font-bold'>Scrapays Technologies</span> -
								Full-stack Developer
							</div>
							<div>JAN 2020 - DEC 2022 | LAGOS, NIGERIA</div>
							<ul className='list-disc mt-2 text-sm pl-6'>
								<li>
									Consulted with engineering team members to determine system
									loads and develop improvement plans.
								</li>
								<li>
									Developed landing pages, dashboards and online applications
									using Angular, React, PHP and javascript scripting.
								</li>
							</ul>
						</div>
						<div className='flex flex-row gap-x-2 mt-2'>
							{skills
								.filter((skill) => skill.application.includes('scrapays'))
								.map((skill, index) => (
									<div className='w-6 h-6' key={index}>
										<Image src={skill.image} alt={skill.alt} />
									</div>
								))}
						</div>
						<div className='divider'></div>

						<div className='mt-2'>
							<div className='text-blue-900'>
								<span className='font-bold'>The Binary Agency</span> - Software
								Engineer
							</div>
							<div>FEB 2018 - JAN 2020 | ILORIN, NIGERIA</div>
							<ul className='list-disc mt-2 text-sm pl-6'>
								<li>
									Reviewed project specifications and designed technology
									solutions that met or exceeded performance expectations.
								</li>
								<li>
									Orchestrated efficient large-scale software deployments.
								</li>
							</ul>
						</div>
						<div className='flex flex-row gap-x-2 mt-2'>
							{skills
								.filter((skill) => skill.application.includes('binary'))
								.map((skill, index) => (
									<div className='w-6 h-6' key={index}>
										<Image src={skill.image} alt={skill.alt} />
									</div>
								))}
						</div>
					</div>
				</div>
			</Page>
		</>
	);
};

export default Print;
