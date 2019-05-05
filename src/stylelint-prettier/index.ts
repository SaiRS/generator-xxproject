import Generator from 'yeoman-generator';
import { extendsStylelintConfig } from '../tools/extends-module-config';

class StylelintPrettier extends Generator {
	writing() {
		const pkgJson = {
			devDependencies: {
				'stylelint-config-prettier': '^5.1.0',
				'stylelint-prettier': '^1.0.6'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		extendsStylelintConfig(
			{
				extends: ['stylelint-prettier/recommended']
			},
			this,
			{
				onNoConfigExitCallback: () => {
					this.fs.copy(
						this.templatePath('.stylelintrc.js'),
						this.destinationPath('.stylelintrc.js')
					);
				}
			}
		);
	}
}

module.exports = StylelintPrettier;
