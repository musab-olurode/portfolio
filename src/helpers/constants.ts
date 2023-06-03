import TypescriptImg from '../../public/typescript.png';
import JavascriptImg from '../../public/javascript.png';
import NodeJsImg from '../../public/nodejs.png';
import NestJsImg from '../../public/nestjs.png';
import ReactJsImg from '../../public/react.png';
import TailwindCSSImg from '../../public/tailwindcss.png';
import NextJsImg from '../../public/nextjs.png';
import HTMLImg from '../../public/html5.png';
import CSSImg from '../../public/css.png';
import PHPImg from '../../public/php.png';
import LaravelImg from '../../public/laravel.png';
import DockerImg from '../../public/docker.png';
import SocketIOImg from '../../public/socket-io.png';
import MongoDBImg from '../../public/mongo_db.png';
import FirebaseImg from '../../public/firebase.png';
import NigeriaFlagImg from '../../public/flag-nigeria.png';
import UKFlagImg from '../../public/flag-united-kingdom.png';
import SaudiFlagImg from '../../public/flag-saudi-arabia.png';
import MetamaskImg from '../../public/metamask.png';
import EthereumImg from '../../public/ethereum.png';

export const skills: {
	image: StaticImageData;
	name: string;
	alt: string;
	application: string[];
}[] = [
	{
		image: TypescriptImg,
		name: 'Typescript',
		alt: 'typescript',
		application: ['montech', 'scrapays', 'binary'],
	},
	{
		image: JavascriptImg,
		name: 'Javascript',
		alt: 'javascript',
		application: ['scrapays', 'studio-14'],
	},
	{
		image: NodeJsImg,
		name: 'NodeJS',
		alt: 'node js',
		application: ['montech', 'scrapays', 'binary', 'studio-14'],
	},
	{
		image: NestJsImg,
		name: 'NestJS',
		alt: 'nest js',
		application: ['montech', 'scrapays'],
	},
	{
		image: ReactJsImg,
		name: 'React',
		alt: 'react js',
		application: ['scrapays', 'binary'],
	},
	{
		image: TailwindCSSImg,
		name: 'TailwindCSS',
		alt: 'tailwind css',
		application: ['scrapays', 'studio-14'],
	},
	{
		image: NextJsImg,
		name: 'Next.js',
		alt: 'next js',
		application: ['scrapays'],
	},
	{
		image: HTMLImg,
		name: 'HTML',
		alt: 'html',
		application: ['scrapays', 'binary', 'studio-14'],
	},
	{
		image: CSSImg,
		name: 'CSS',
		alt: 'css',
		application: ['scrapays', 'binary', 'studio-14'],
	},
	{
		image: PHPImg,
		name: 'PHP',
		alt: 'php',
		application: ['scrapays'],
	},
	{
		image: LaravelImg,
		name: 'Laravel',
		alt: 'laravel',
		application: ['scrapays'],
	},
	{
		image: DockerImg,
		name: 'Docker',
		alt: 'docker',
		application: ['scrapays'],
	},
	{
		image: SocketIOImg,
		name: 'Socket.io',
		alt: 'socket.io',
		application: ['montech', 'scrapays', 'binary'],
	},
	{
		image: MongoDBImg,
		name: 'MongoDB',
		alt: 'mongo db',
		application: ['montech', 'scrapays', 'binary'],
	},
	{
		image: FirebaseImg,
		name: 'Firebase',
		alt: 'firebase',
		application: ['binary'],
	},
	{
		image: MetamaskImg,
		name: 'Metamask',
		alt: 'metamask',
		application: ['montech'],
	},
	{
		image: EthereumImg,
		name: 'Ethereum',
		alt: 'ethereum',
		application: ['montech'],
	},
];

export const languages: {
	image: StaticImageData;
	name: string;
	level: string;
	alt: string;
}[] = [
	{
		image: NigeriaFlagImg,
		name: 'Yoruba',
		level: 'Native',
		alt: 'yoruba',
	},
	{
		image: UKFlagImg,
		name: 'English',
		level: 'Fluent',
		alt: 'english',
	},
	{
		image: SaudiFlagImg,
		name: 'Arabic',
		level: 'Intermediate',
		alt: 'arabic',
	},
];

export const interests: {
	image: string;
	name: string;
	alt: string;
}[] = [
	{
		image: '👨‍💻',
		name: 'Programming',
		alt: 'programming',
	},
	{
		image: '📚',
		name: 'Reading',
		alt: 'reading',
	},
	{
		image: '🤸',
		name: 'Parkour',
		alt: 'parkour',
	},
	{
		image: '🎮',
		name: 'Gaming',
		alt: 'gaming',
	},
];
