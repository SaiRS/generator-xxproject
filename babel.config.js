const path = require('path');
const tsConfigPath = require('tsconfig-paths');

let config = tsConfigPath.loadConfig();
let match = tsConfigPath.createMatchPath(config.absoluteBaseUrl, config.paths);

function isRelativePath(nodePath) {
	return nodePath.match(/^\.?\.\//);
}

const presets = [['@babel/env'], '@babel/typescript'];
const plugins = [
	'@babel/proposal-class-properties',
	'@babel/proposal-object-rest-spread',
	[
		'module-resolver',
		{
			// root: ['./']
			resolvePath(sourcePath, currentFile, opts) {
				/**
				 * The `opts` argument is the options object that is passed through the Babel config.
				 * opts = {
				 *   extensions: [".js"],
				 *   resolvePath: ...,
				 * }
				 */

				// sourcePath是import之后的路径
				// currentFile是当前文件的路径

				if (isRelativePath(sourcePath)) {
					return sourcePath;
				}

				let matchPath = match(sourcePath, undefined, undefined, [
					'.js',
					'.json',
					'.node',
					'.mjs',
					'.ts',
					'.tsx'
				]);

				if (matchPath) {
					// 匹配了alias
					let result = path.relative(path.dirname(currentFile), matchPath);
					return result;
				} else {
					return sourcePath;
				}
			}
		}
	]
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
