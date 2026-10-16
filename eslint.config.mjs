import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import pluginJs from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Modelled on the canoo directus-v2 client config, tightened: strict + stylistic
// type-checked TypeScript rules, strict a11y, hooks rules on, and every warning an error.
export default defineConfig([
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'coverage/**',
		'next-env.d.ts',
		'.superpowers/**',
		'.taste-skill/**',
		'.wrangler/**',
		'test-results/**',
		'playwright-report/**',
	]),
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaFeatures: { jsx: true },
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
		settings: {
			react: { version: 'detect' },
			tailwindcss: {
				// Absolute, so class checks are identical whatever the cwd.
				cssConfigPath: `${__dirname}/src/app/globals.css`,
			},
			'import/resolver': { typescript: true, node: true },
		},
	},
	pluginJs.configs.recommended,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	pluginPromise.configs['flat/recommended'],
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	reactHooks.configs.flat['recommended-latest'],
	jsxA11y.flatConfigs.strict,
	tailwind.configs.recommended,
	{
		plugins: { '@next/next': nextPlugin },
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},
	eslintConfigPrettier,
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
			'unused-imports': unusedImports,
		},
		rules: {
			// Core
			'no-console': 'error',
			'no-implied-eval': 'error',
			'no-else-return': 'error',
			'no-await-in-loop': 'error',
			'no-duplicate-case': 'error',
			'no-inner-declarations': 'error',
			'no-nested-ternary': 'error',
			'no-unused-vars': 'off',
			'no-var': 'error',
			'prefer-const': 'error',
			'object-shorthand': 'error',
			eqeqeq: ['error', 'always'],
			'newline-before-return': 'error',
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
				{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
			],

			// TypeScript
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/explicit-member-accessibility': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

			// Imports
			'import/no-unresolved': 'off', // TypeScript resolves paths.
			'import/no-named-as-default': 'off',
			'import/no-named-as-default-member': 'off',
			'import/no-duplicates': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'unused-imports/no-unused-imports': 'error',
			'simple-import-sort/exports': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^node:'], // Node built-ins
						['^react', '^next'], // React and Next
						['^@?\\w'], // Other packages
						['^@/lib', '^@/content'], // Data and logic
						['^@/components'], // Components
						['^\\.'], // Relative imports and styles
					],
				},
			],

			// React
			'react/prop-types': 'off', // TypeScript checks props.
			'react/self-closing-comp': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'react/jsx-boolean-value': ['error', 'never'],
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
			'react/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true, reservedFirst: true }],
			'react-hooks/exhaustive-deps': 'error',
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		plugins: { tailwindcss: tailwind },
		settings: { tailwindcss: { cssConfigPath: `${__dirname}/src/app/globals.css` } },
		rules: {
			// Every recommended Tailwind check as an error.
			...Object.fromEntries(Object.keys(tailwind.configs.recommended.rules).map((rule) => [rule, 'error'])),
			'tailwindcss/no-arbitrary-value': 'off', // The type scale uses clamp() values on purpose.
			'tailwindcss/no-unnecessary-arbitrary-value': 'error',
			'tailwindcss/no-custom-classname': [
				'error',
				{ whitelist: ['reveal', 'reveal-img', 'pan', 'mask-line', 'hero-rise', 'group/list'] },
			],
		},
	},
	{
		files: ['tests/**/*.{ts,tsx}'],
		rules: {
			// Tests assert on known fixtures; a failed lookup fails the test anyway.
			'@typescript-eslint/no-non-null-assertion': 'off',
			// Browser steps must run in order.
			'no-await-in-loop': 'off',
		},
	},
	{
		files: ['scripts/**/*.mjs'],
		rules: {
			// CLI scripts drive one browser page at a time and report to the terminal.
			'no-await-in-loop': 'off',
			'no-console': 'off',
		},
	},
	{
		// Plain JS config and scripts sit outside the TypeScript project.
		files: ['**/*.{js,mjs,cjs}'],
		extends: [tseslint.configs.disableTypeChecked],
		rules: {
			'@typescript-eslint/explicit-module-boundary-types': 'off',
		},
	},
]);
