import Generator from 'yeoman-generator';

class React extends Generator {
	writing() {
		const pkgJson = {
			dependencies: {
				react: '^16.8.6',
				'react-dom': '^16.8.6'
			},
			devDependencies: {
				'@types/react': '^16.8.13',
				'@types/react-dom': '^16.8.4'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = React;
