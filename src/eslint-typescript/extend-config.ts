export default {
	extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json'
	},
	rules: {
		'@typescript-eslint/indent': 'off',
		// Makes no sense to allow type inferrence for expression parameters, but require typing the response
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{ allowExpressions: true, allowTypedFunctionExpressions: true }
		],
		'@typescript-eslint/no-use-before-define': [
			'error',
			{ functions: false, classes: true, variables: true, typedefs: true }
		],
		'@typescript-eslint/interface-name-prefix': ['off']
	}
};
