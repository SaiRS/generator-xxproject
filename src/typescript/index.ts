import Generator from 'yeoman-generator';

class Typescript extends Generator {
	writing() {
		this.fs.copy(
			this.templatePath('tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);

		const pkgJson = {
			dependencies: {
				typescript: '^3.2.4'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Typescript;
