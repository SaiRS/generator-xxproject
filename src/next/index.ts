import Generator from 'yeoman-generator';

class Webpack extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				next: 'latest'
			},
			devDependencies: {
				'@types/next': 'latest'
			},
			scripts: {
				'next:start': 'cross-env next start',
				'next:build': 'cross-env next build'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Webpack;
