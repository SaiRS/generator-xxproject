import Generator from 'yeoman-generator';

class Sass extends Generator {
	writing() {
		const pkgJson = {
			devDependencies: {
				'node-sass': '^4.12.0'
			},
			scripts: {
				'build:sass': 'node-sass src/ -o dist/'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Sass;
