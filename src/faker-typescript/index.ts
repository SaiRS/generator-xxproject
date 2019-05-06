import Generator from 'yeoman-generator';

class FakerTypescript extends Generator {
	writing() {
		const pkgJson = {
			devDependencies: {
				'@types/faker': '^4.1.5'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = FakerTypescript;
