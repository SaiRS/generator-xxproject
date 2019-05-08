import Generator from 'yeoman-generator';
import { extendsStylelintConfig } from '../tools/extends-module-config';
import extendPkg from './extend-pkg.json';

class StylelintSass extends Generator {
	writing() {
		const pkgJson = extendPkg;

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
					console.log('+++++++++++++++++++++++++++++');
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
