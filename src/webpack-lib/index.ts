import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Webpack extends Generator {
	// yo xxproject:webpack-lib --typescript
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('typescript', {
			default: false,
			description: 'combine with typescript?',
			type: Boolean
		});

		this.option('prettier', {
			default: false,
			description: 'combine with prettier?',
			type: Boolean
		});
	}

	initializing() {
		this.composeWith(require.resolve('../typescript'), {});
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
		this.fs.copy(this.templatePath('config/'), this.destinationPath('config/'));

		this.fs.copy(
			this.templatePath('scripts/'),
			this.destinationPath('scripts/')
		);
	}
}

module.exports = Webpack;
