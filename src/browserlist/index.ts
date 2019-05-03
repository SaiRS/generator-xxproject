import Generator from 'yeoman-generator';

class Browswerlist extends Generator {
	writing() {
		const pkgJson = {
			browserslist: {
				production: ['>0.2%', 'not dead', 'not op_mini all'],
				development: [
					'last 1 chrome version',
					'last 1 firefox version',
					'last 1 safari version'
				]
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = Browswerlist;
