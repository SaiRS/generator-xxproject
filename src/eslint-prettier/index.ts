import Generator from 'yeoman-generator';
import cosmiconfig from 'cosmiconfig';
import { extendsConfig } from '../tools/extends-config';
import path from 'path';
import eslintPrettierPackage from './config.json';
import eslintPrettierConfig from './extend-config';
import _ from 'lodash';
import { mergeConfigValue } from '../tools/merge-config';

let _moduleName = 'eslint';

class EslintPrettier extends Generator {
	_extendConfig(config: { [key: string]: any }): { [key: string]: any } {
		let newConfig = { ...config };

		let result = _.mergeWith(newConfig, eslintPrettierConfig, mergeConfigValue);
		return result;
	}

	writing() {
		const pkgJson = eslintPrettierPackage;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		// NOTE: 此时package.json里边的配置key为eslintConfig，跟cosmiconfig的不一样
		let pkg = this.fs.readJSON(this.destinationPath('package.json'));
		if (pkg['eslintConfig']) {
			// 扩展package.json中的eslint配置项
			this.fs.extendJSON(this.destinationPath('package.json'), {
				eslintConfig: _.mergeWith(
					pkg['eslintConfig'],
					eslintPrettierConfig,
					mergeConfigValue
				)
			});
		} else {
			// 按照cosmiconfig去搜索
			let explorer: cosmiconfig.Explorer = cosmiconfig(_moduleName);
			let result: null | cosmiconfig.CosmiconfigResult = explorer.searchSync();
			if (result && !result.isEmpty) {
				let stylelintConfig: { [key: string]: any } = result.config;

				// 排除package.json的配置
				if (path.basename(result.filepath) === 'package.json') {
					return;
				}

				// 写入原来的地方
				extendsConfig(this._extendConfig(stylelintConfig), result.filepath);
			} else {
				// 新建
				this.fs.copy(
					this.templatePath('.eslintrc.js'),
					this.destinationPath('.eslintrc.js')
				);
			}
		}
	}
}

module.exports = EslintPrettier;
