/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	arrowParens: 'always',
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'ignore',
	jsxSingleQuote: true,
	printWidth: 120,
	proseWrap: 'always',
	quoteProps: 'as-needed',
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'es5',
	useTabs: true,
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindStylesheet: './src/app/globals.css',
};

export default config;
