import Generator from 'yeoman-generator';

class Express extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				express: '^4.16.4',
				'cookie-parser': '^1.4.3',
				morgan: '^1.9.1',
				superagent: '^4.1.0',
				'http-errors': '^1.7.1'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Express;
