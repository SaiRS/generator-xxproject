import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Faker extends Generator {
	// yo xxproject:faker --typescript
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('typescript', {
			default: false,
			description: 'combine with typescript?',
			type: Boolean
		});
	}

	initializing() {
		if (this.options.typescript) {
			this.composeWith(require.resolve('../faker-typescript'), {});
		}
	}

	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Faker;
