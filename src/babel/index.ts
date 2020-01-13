import Generator from 'yeoman-generator';
import fs from 'fs';
import path from 'path';

import babelConfig from './templates/babel.config';
import { getBabelPackageConfig } from './extend-pkg';

import transform from './transform';
import jscodeshift from 'jscodeshift';

const BABEL_PACKAGE_CONFIG = 'package.json#babel';

/**
 * 生成babel配置的generator
 * @description 使用方式: yo xxproject:babel --typescript --react
 * @export
 * @class BabelGenerator
 * @extends {Generator}
 */
export default class BabelGenerator extends Generator {
	babelConfigPath: string; // 配置文件的路径

	constructor(args: string | string[], opts: {}) {
		super(args, opts);

		this.option('typescript', {
			default: true,
			description: '给babel新增typescript配置',
			type: Boolean
		});

		this.option('react', {
			default: true,
			description: '给babel新增react配置',
			type: Boolean
		});

		this.babelConfigPath = '';
	}

	initializing() {
		// Your initialization methods (checking current project state, getting configs, etc)
		// 找到已经安装的babel的配置路径

		// babel配置只寻找目录下
		/* project width config path */
		// babel.config.js
		// babel.config.cjs
		// babel.config.json
		/* relative file config path */
		// .babelrc
		// .babelrc.js
		// .babelrc.cjs
		// package.json#babel
		// 不会像babel那样子去往上层目录寻找

		const ROOT_CONFIG_FILENAMES = [
			'babel.config.js',
			'babel.config.cjs',
			'babel.config.json',
			'.babelrc',
			'.babelrc.js',
			'.babelrc.cjs'
		];

		let babelConfigPath = '';
		ROOT_CONFIG_FILENAMES.forEach((path) => {
			if (babelConfigPath) {
				return;
			}

			if (fs.existsSync(this.destinationPath(path))) {
				babelConfigPath = this.destinationPath(path);
			}
		});

		if (!babelConfigPath) {
			// 去寻找package.json#babel
			let pkg: Record<string, any> = this.fs.readJSON(
				this.destinationPath('package.json')
			);
			if (pkg.babel) {
				babelConfigPath = BABEL_PACKAGE_CONFIG;
			}
		}

		if (!babelConfigPath) {
			babelConfigPath = this.destinationPath('babel.config.js');
		}

		// 记录最终使用的babelConfigPath
		this.babelConfigPath = babelConfigPath;
	}

	prompting() {
		// Where you prompt users for options (where you’d call this.prompt())
	}

	configuring() {
		// Saving configurations and configure the project (creating .editorconfig files and other metadata files)

		// 配置package.json
		this.fs.extendJSON(
			this.destinationPath('package.json'),
			// @ts-ignore
			getBabelPackageConfig(this.options)
		);
	}

	/**** default *******/

	/**** default *******/

	writing() {
		// Where you write the generator specific files (routes, controllers, etc)

		// 修改对应的文件
		let ext = path.extname(this.babelConfigPath);
		if (ext === '.js' || ext === '.cjs') {
			// 修改对应的js文件
			if (fs.existsSync(this.babelConfigPath)) {
				// 修改
				// 通过执行jscodeshift

				// 生成config
				let configs = [
					{
						name: 'plugins',
						value: '@babel/proposal-class-properties',
						optValus: [
							'@babel/proposal-class-properties',
							'@babel/plugin-proposal-class-properties'
						]
					},
					{
						name: 'plugins',
						value: '@babel/proposal-object-rest-spread',
						optValus: [
							'@babel/proposal-object-rest-spread',
							'@babel/plugins-proposal-object-rest-spread'
						]
					}
				];
				if (this.options.typescript) {
					configs.push({
						name: 'presets',
						value: '@babel/typescript',
						optValus: ['@babel/typescript', '@babel/preset-typescript']
					});
				}

				if (this.options.react) {
					configs.push({
						name: 'presets',
						value: '@babel/react',
						optValus: ['@babel/react', '@babel/preset-react']
					});
				}

				const source = fs.readFileSync(this.babelConfigPath, 'utf8');
				transform(
					{
						path: this.babelConfigPath,
						source
					},
					{
						j: jscodeshift,
						jscodeshift: jscodeshift,
						stats: () => {},
						report: () => {}
					},
					{
						configs: []
					}
				);
			} else {
				// 复制
				this.fs.copy(
					this.templatePath('babel.config.js'),
					this.babelConfigPath
				);
			}
		} else {
			// 扩展json
			this.fs.extendJSON(this.babelConfigPath, babelConfig);
		}
	}

	install() {
		// Where installations are run (npm, bower)
	}

	end() {
		// Called last, cleanup, say good bye, etc
	}
}
