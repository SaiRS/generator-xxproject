import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class JestConfig extends Generator {
	// yo xxproject:jest --typescript
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
			this.composeWith(require.resolve('../jest-typescript'), {});
		}
	}

	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

		// copying(1) --> shell脚本完成
		// copying(2)
	}

	install() {
		this.npmInstall();
	}

	end() {
		this.fs.copy(
			this.templatePath('jest.config.js'),
			this.destinationPath('jest.config.js')
		);

		this.fs.copy(
			this.templatePath('config/jest'),
			this.destinationPath('config/jest')
		);
	}
}

module.exports = JestConfig;
