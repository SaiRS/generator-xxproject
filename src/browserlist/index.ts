import Generator from 'yeoman-generator';
import pkg from './pkg.json';

class Browswerlist extends Generator {
	writing() {
		const pkgJson = pkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = Browswerlist;
