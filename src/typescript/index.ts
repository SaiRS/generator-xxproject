import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Typescript extends Generator {
	initializing() {
		this.composeWith(require.resolve('../browserlist'), {});
	}

	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		this.fs.copy(
			this.templatePath('tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);
		this.fs.copy(
			this.templatePath('babel.config.js'),
			this.destinationPath('babel.config.js')
		);
	}
}

module.exports = Typescript;
