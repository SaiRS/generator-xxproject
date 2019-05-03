import Generator from 'yeoman-generator';

class Browswerlist extends Generator {
	writing() {
		const pkgJson = {
			scripts: {
				'lint-staged': 'lint-staged'
			},
			devDependencies: {
				'lint-staged': '^8.1.5'
			},
			husky: {
				hooks: {
					'pre-commit': 'lint-staged'
				}
			},
			'lint-staged': {
				linters: {},
				ignore: ['*.d.ts']
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = Browswerlist;
