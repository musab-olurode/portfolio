/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				main: {
					DEFAULT: '#080B16',
					50: '#394E9D',
					100: '#34478E',
					200: '#293870',
					300: '#1E2952',
					400: '#131A34',
					500: '#080B16',
					600: '#000000',
					700: '#000000',
					800: '#000000',
					900: '#000000',
				},
			},
			animation: {
				'slide-in': 'slide-in 0.5s ease-in-out',
				'slide-in-x': 'slide-in-x 0.5s ease-in-out',
				'slide-in-right': 'slide-in-right 0.5s ease-in-out',
				'slide-in-top': 'slide-in-top 0.5s ease-in-out',
			},
			keyframes: {
				'slide-in': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'slide-in-x': {
					'0%': { transform: 'translateX(-300%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(300%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'slide-in-top': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				dark: {
					primary: '#0052cc',
					'primary-focus': '#004ab8',
					'primary-content': '#ffffff',
					secondary: '#ffba10',
					'secondary-focus': '#e6a70e',
					'secondary-content': '#ffffff',
					accent: '#ff5668',
					'accent-focus': '#e64d5e',
					'accent-content': '#ffffff',
					neutral: '#080B16',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#080B16',
					'base-200': '#2a2e37',
					'base-300': '#16181d',
					'base-content': 'white',
					info: '#2094f3',
					success: '#009485',
					warning: '#ff9900',
					error: '#ff5724',
				},
			},
			{
				light: {
					primary: '#0052cc',
					'primary-focus': '#004ab8',
					'primary-content': '#ffffff',
					secondary: '#ffba10',
					'secondary-focus': '#e6a70e',
					'secondary-content': '#ffffff',
					accent: '#ff5668',
					'accent-focus': '#e64d5e',
					'accent-content': '#ffffff',
					neutral: '#080B16',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#d1d5db',
					// 'base-content': '#080B16',
					info: '#2094f3',
					success: '#009485',
					warning: '#ff9900',
					error: '#ff5724',
				},
			},
		],
	},
};
