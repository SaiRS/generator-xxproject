import Generator from 'yeoman-generator';

class Faker extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				faker: '^4.1.0'
			},
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

module.exports = Faker;
