// const custom = require('../webpack.config.js');
const path = require('path');

module.exports = async ({ config, mode }) => {
	return {
		...config,
		module: {
			...config.module,
			rules: [
				{
					// Include ts, tsx, js, and jsx files.
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					include: [path.resolve(__dirname, 'src')],
					use: {
						loader: 'babel-loader'
					}
				}
			]
		},
		resolve: {
			extensions: [...config.resolve.extensions, 'tsx', 'ts']
		}
	};
};
