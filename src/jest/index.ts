import Generator from 'yeoman-generator';

class JestConfig extends Generator {
	writing() {
		const pkgJson = {
			scripts: {
				test: 'jest'
			},
			devDependencies: {
				jest: '^24.0.0'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

		// copying(1) --> shell脚本完成
		// copying(2)
		this.fs.copy(
			this.templatePath('jest.config.js'),
			this.destinationPath('jest.config.js')
		);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = JestConfig;
