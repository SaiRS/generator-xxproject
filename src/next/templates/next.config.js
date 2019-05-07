/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-var-requires */

// https://github.com/zeit/next.js/blob/master/packages/next-server/lib/constants.js
// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
// const configFactory = require('./webpack.config');
// const webpackConfig = configFactory('development');

// module.exports = {
//   distDir: 'build',
//   pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     // Example using webpack option
//     config.plugins.push(...webpackConfig.plugins);
//     config.module.rules.push(...webpackConfig.module.rules);
//     return config;
//   },
//   webpackDevMiddleware: config => {
//     // Perform customizations to webpack dev middleware config
//     // Important: return the modified config
//     return config;
//   },
// };
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

function hackRemoveMinimizeOptionFromCssLoaders(config) {
	// eslint-disable-next-line no-console
	console.warn(
		'HACK: Removing `minimize` option from `css-loader` entries in Webpack config'
	);
	config.module.rules.forEach((rule) => {
		if (Array.isArray(rule.use)) {
			rule.use.forEach((u) => {
				if (u.loader === 'css-loader' && u.options) {
					Reflect.deleteProperty(u.options, 'minimize');
				}
			});
		}
	});
}

function hackChangeToCssLoaderFromCssLocalLoaders(config) {
	// eslint-disable-next-line no-console
	console.warn(
		'HACK: change `css-loader/locals` to `css-loader` entries in Webpack config'
	);
	config.module.rules.forEach((rule) => {
		if (Array.isArray(rule.use)) {
			rule.use.forEach((u) => {
				if (u.loader === 'css-loader/locals') {
					Reflect.set(u, 'loader', 'css-loader');
				}
			});
		}
	});
}

module.exports = withTypescript(
	withSass({
		distDir: 'ssr-build',
		cssModules: true,
		webpack(config, options) {
			hackChangeToCssLoaderFromCssLocalLoaders(config);
			// 因为next中的webpack查找css-loader的版本(当前项目的css-loader2.1.1)[没有minimize]
			// 与next-css提供的css-loader(1.0.0)版本不一致，导致css-loader的options中多了minimize配置的错误
			hackRemoveMinimizeOptionFromCssLoaders(config);
			// Further custom configuration here
			return config;
		}
	})
);
