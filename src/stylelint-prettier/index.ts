import Generator from 'yeoman-generator';
import cosmiconfig from 'cosmiconfig';
import { extendsConfig } from '../tools/extends-config';
import path from 'path';

let _moduleName = 'stylelint';

class StylelintPrettier extends Generator {
	_extendConfig(config: { [key: string]: any }): { [key: string]: any } {
		let newConfig = { ...config };
		let configExtends: string[] = newConfig['extends'] || [];
		configExtends.push('stylelint-prettier/recommended');
		newConfig['extends'] = configExtends;
		return newConfig;
	}

	writing() {
		const pkgJson = {
			devDependencies: {
				'stylelint-config-prettier': '^5.1.0',
				'stylelint-prettier': '^1.0.6'
			}
		};

		let explorer: cosmiconfig.Explorer = cosmiconfig(_moduleName);
		let result: null | cosmiconfig.CosmiconfigResult = explorer.searchSync();
		if (result && !result.isEmpty) {
			// 判断是否在package.json里边
			if (path.basename(result.filepath) === 'package.json') {
				let stylelintConfig: { [key: string]: any } = result.config;
				// @ts-ignore
				pkgJson['stylelint'] = this._extendConfig(stylelintConfig);
			}
		}

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
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
				this.templatePath('.stylelintrc.js'),
				this.destinationPath('.stylelintrc.js')
			);
		}
	}
}

module.exports = StylelintPrettier;
