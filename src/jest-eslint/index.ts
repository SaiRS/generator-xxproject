import Generator from 'yeoman-generator';
import { extendEslintConfig } from '../tools/extends-module-config';

class JestEslint extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				'eslint-plugin-jest': '^22.4.1'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		extendEslintConfig(
			{
				plugins: ['jest']
			},
			this,
			{
				onNoConfigExitCallback: () => {
					// do nothing
				}
			}
		);
	}
}

module.exports = JestEslint;
