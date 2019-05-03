const presets = [
	[
		'@babel/env',
		{
			useBuiltIns: 'usage',
			corejs: 3
		}
	],
	'@babel/typescript',
	'@babel/react'
];
const plugins = [
	'@babel/proposal-class-properties',
	'@babel/proposal-object-rest-spread'
	// 'babel-plugin-styled-components',
];

module.exports = {
	presets,
	plugins,
	env: {
		// the env is set by cli BABEN_ENV or other methods
		commonjs: {
			plugins: [['transform-es2015-modules-commonjs']]
		},
		umd: {
			plugins: [['transform-es2015-modules-umd']]
		},
		amd: {
			plugins: [['transform-es2015-modules-amd']]
		}
	}
};
