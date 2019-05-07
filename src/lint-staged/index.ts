import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Browswerlist extends Generator {
	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = Browswerlist;
