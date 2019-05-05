import Generator from 'yeoman-generator';
import eslintTypescriptPackage from './config.json';
import eslintTypescriptConfig from './extend-config';
import { extendEslintConfig } from '../tools/extends-module-config';

class EslintTypescript extends Generator {
	writing() {
		const pkgJson = eslintTypescriptPackage;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		extendEslintConfig(eslintTypescriptConfig, this, {
			onNoConfigExitCallback: () => {
				this.fs.copy(
					this.templatePath('.eslintrc.js'),
					this.destinationPath('.eslintrc.js')
				);
			}
		});
	}
}

module.exports = EslintTypescript;
