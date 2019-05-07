import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Sass extends Generator {
	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Sass;
