const presets = [
	[
		'@babel/env',
		{
			useBuiltIns: 'usage',
			corejs: 2
		}
	],
	'@babel/typescript',
	'@babel/react'
];
const plugins = [
	'@babel/proposal-class-properties',
	'@babel/proposal-object-rest-spread'
];

module.exports = {
	presets,
	plugins,
	env: {
		// the env is set by cli BABEN_ENV or other methods
		// like BABEL_ENV=commonjs
		// commonjs: {
		// 	plugins: [['transform-es2015-modules-commonjs']]
		// }
	}
};
