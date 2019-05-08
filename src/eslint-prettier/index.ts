import Generator from 'yeoman-generator';
import eslintPrettierPackage from './extend-pkg.json';
import eslintPrettierConfig from './extend-config';
import { extendEslintConfig } from '../tools/extends-module-config';

class EslintPrettier extends Generator {
	writing() {
		const pkgJson = eslintPrettierPackage;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		extendEslintConfig(eslintPrettierConfig, this, {
			onNoConfigExitCallback: () => {
				this.fs.copy(
					this.templatePath('.eslintrc.js'),
					this.destinationPath('.eslintrc.js')
				);
			}
		});
	}
}

module.exports = EslintPrettier;
