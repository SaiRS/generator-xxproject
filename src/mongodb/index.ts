import Generator from 'yeoman-generator';

class Mongodb extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				mongoose: '^5.4.9',
				mongodb: '^3.1.13'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Mongodb;
