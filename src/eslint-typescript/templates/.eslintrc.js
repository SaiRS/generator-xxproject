module.exports = {
	extends: [
		'plugin:eslint-comments/recommended',
		'plugin:promise/recommended',
		'plugin:unicorn/recommended',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended'
	],
	plugins: ['eslint-comments', 'promise', 'unicorn', '@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		browser: true,
		node: true,
		jest: true,
		commonjs: true,
		es6: true
	},
	rules: {
		'valid-jsdoc': 'error',
		'no-undefined': 'off',
		// Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
		'no-prototype-builtins': 'off',
		// https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
		'import/prefer-default-export': 'off',
		// Use function hoisting to improve code readability
		'no-use-before-define': [
			'error',
			{ functions: false, classes: true, variables: true }
		],
		// Common abbreviations are known and readable
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/number-literal-case': 'off',
		// Makes no sense to allow type inferrence for expression parameters, but require typing the response
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{ allowExpressions: true, allowTypedFunctionExpressions: true }
		],
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false, classes: true, variables: true, typedefs: true }
		],
		'@typescript-eslint/interface-name-prefix': ['off'],
		'@typescript-eslint/indent': 'off'
	},
	settings: {},
	overrides: [
		{
			files: ['*.json'],
			rules: {
				'no-unused-expressions': 'off'
			}
		},
		{
			files: ['*.stories.tsx'],
			rules: {
				'import/no-extraneous-dependencies': 'off'
			}
		},
		{
			files: ['*.jsx', '*.tsx'],
			rules: {
				'unicorn/filename-case': 'off'
			}
		}
	]
};
