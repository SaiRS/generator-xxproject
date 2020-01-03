export interface IBabelOptions {
	typescript: boolean;
	react: boolean;
}

/**
 * 生成babel对应的package.json中的配置
 * @export
 * @param {IOptions} [Options = {typescript: true, react: trye}] opts
 * @returns {Record<string, string>} 配置
 */
export function getBabelPackageConfig(
	{ typescript = true, react = true }: IBabelOptions = {
		typescript: true,
		react: true
	}
) {
	let config = {
		devDependencies: {
			'ts-node': '^8.1.0',
			'cross-env': '^5.2.0',
			'core-js': '^2.6.11',
			'@babel/cli': '^7.4.3',
			'@babel/core': '^7.4.3',
			'@babel/plugin-proposal-class-properties': '^7.4.0',
			'@babel/plugin-proposal-object-rest-spread': '^7.4.3',
			'@babel/preset-env': '^7.4.3',
			'@babel/preset-react': '^7.0.0',
			'@babel/preset-typescript': '^7.3.3'
		}
	};

	if (!typescript) {
		Reflect.deleteProperty(config.devDependencies, '@babel/preset-typescript');
	}

	if (!react) {
		Reflect.deleteProperty(config.devDependencies, '@babel/preset-react');
	}

	return config;
}
