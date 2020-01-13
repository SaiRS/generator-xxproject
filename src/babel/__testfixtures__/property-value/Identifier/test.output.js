let plugins;

plugins = [
	'@babel/proposal-class-properties',
	'@babel/proposal-object-rest-spread'
];

module.exports = {
	plugins: plugins,
	presets: ['@babel/typescript', '@babel/react']
};
