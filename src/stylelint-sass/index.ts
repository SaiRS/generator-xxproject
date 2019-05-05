import Generator from 'yeoman-generator';
import { extendsStylelintConfig } from '../tools/extends-module-config';

class StylelintSass extends Generator {
	writing() {
		const pkgJson = {
			devDependencies: {
				'stylelint-scss': '^3.6.0'
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
				plugins: ['stylelint-scss']
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

module.exports = StylelintSass;
