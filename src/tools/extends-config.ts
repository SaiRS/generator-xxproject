import path from 'path';
// import jsonfile from 'jsonfile';
import fs from 'fs';
import yaml from 'js-yaml';
import Generator from 'yeoman-generator';
import cosmiconfig from 'cosmiconfig';
import _ from 'lodash';
import { mergeConfigValue } from './merge-config';

export interface ExtendsOptions {
	onNoConfigExitCallback: () => void; // 没找到配置文件的回调
}

function noop() {}

type AnyObject = { [key: string]: any };

/**
 * 扩展模块的配置
 * @export
 * @param {string} moduleName 模块名字
 * @param {AnyObject} newConfig 扩展的配置
 * @param {Generator} generator yeoman generator实例
 * @param {string} [moduleConfigNameInPkg=moduleName] package.json中的配置key
 * @param {ExtendsOptions} [options={
 * 		noConfigExitCallback: noop
 * 	}] 扩展选项
 * @returns {boolean} true表示成功
 */
export function extendsModuleConfig(
	moduleName: string,
	newConfig: AnyObject,
	generator: Generator,
	moduleConfigNameInPkg: string = moduleName,
	options: ExtendsOptions = {
		onNoConfigExitCallback: noop
	}
): boolean {
	// 先判断package中的配置名
	if (moduleName !== moduleConfigNameInPkg) {
		// 读取package.json
		let pkg = generator.fs.readJSON(generator.destinationPath('package.json'));
		if (pkg[moduleConfigNameInPkg]) {
			// 扩展package.json中的配置项
			generator.fs.extendJSON(generator.destinationPath('package.json'), {
				[moduleConfigNameInPkg]: _.mergeWith(
					pkg[moduleConfigNameInPkg],
					newConfig,
					mergeConfigValue
				)
			});
		} else {
			let explorer: cosmiconfig.Explorer = cosmiconfig(moduleName);
			let result: null | cosmiconfig.CosmiconfigResult = explorer.searchSync();
			if (result && !result.isEmpty) {
				// 旧的配置
				let oldConfig: { [key: string]: any } = result.config;

				// 排除package.json的配置
				if (path.basename(result.filepath) === 'package.json') {
					return;
				}

				// 写入原来的地方
				extendsConfig(
					_.mergeWith(oldConfig, newConfig, mergeConfigValue),
					result.filepath,
					generator
				);
			} else {
				// // 新建
				// this.fs.copy(
				// 	this.templatePath('.eslintrc.js'),
				// 	this.destinationPath('.eslintrc.js')
				// );
				if (_.isFunction(options.onNoConfigExitCallback)) {
					options.onNoConfigExitCallback();
				}
			}
		}
	}
}

/**
 * 扩展配置
 * @export
 * @param {AnyObject} config 全部配置
 * @param {string} filePath 文件路径
 * @param {Generator} generator yeoman实例
 * @returns {boolean} 实例
 */
function extendsConfig(
	config: AnyObject,
	filePath: string,
	generator: Generator
) {
	switch (path.extname(filePath)) {
		case '.json':
			return extendsJsonConfig(config, filePath, generator);

		case '.js':
			return extendsJsConfig(config, filePath);

		case '.yml':
		default:
			return extendsYmlConfig(config, filePath);
	}
}

/**
 * 扩展json配置
 * @param {AnyObject} config 配置（这儿是全部配置，为了统一起见）
 * @param {string} filePath 路径
 * @param {Generator} generator yeoman实例
 * @returns {boolean} true表示成功
 */
function extendsJsonConfig(
	config: AnyObject,
	filePath: string,
	generator: Generator
): boolean {
	try {
		// jsonfile.writeFileSync(filePath, newConfig, {
		// 	spaces: 2
		// });
		generator.fs.extendJSON(filePath, config);
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * 扩展.js结尾的配置
 * @param {AnyObject} config 全部配置
 * @param {string} filePath 路径
 * @returns {boolean} true表示成功
 */
function extendsJsConfig(config: AnyObject, filePath: string): boolean {
	try {
		fs.writeFileSync(
			filePath,
			`module.exports = ${JSON.stringify(config, undefined, 2)}`
		);
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * 扩展.yml结尾的配置
 * @param {AnyObject} config 全部配置
 * @param {string} filePath 路径
 * @returns {boolean} true表示成功
 */
function extendsYmlConfig(config: AnyObject, filePath: string) {
	try {
		let str = yaml.dump(config);
		fs.writeFileSync(filePath, str);
		return true;
	} catch (error) {
		return false;
	}
}
