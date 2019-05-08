import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Storybook extends Generator {
	// yo xxproject:storybook --react  --typescript
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('react', {
			default: false,
			description: 'combine with react?',
			type: Boolean
		});
	}

	initializing() {
		// eslint-disable-next-line
		if (/* this.options.react */ true) {
			this.composeWith(require.resolve('../react'), {});
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

	end() {
		this.fs.copy(this.templatePath('stories'), this.destinationPath('stories'));
		this.fs.copy(
			this.templatePath('.storybook'),
			this.destinationPath('.storybook')
		);
	}
}

module.exports = Storybook;
