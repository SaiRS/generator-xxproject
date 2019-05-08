import Generator from 'yeoman-generator';
import { isLintStagedEnable } from '../tools/detect';
import generateExtendedPkg from './extend-pkg';

class Stylelint extends Generator {
	// yo xxproject stylelint --prettier --sass
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('sass', {
			default: false,
			description: 'combine with sass?',
			type: Boolean
		});

		this.option('prettier', {
			default: false,
			description: 'combine with prettier?',
			type: Boolean
		});
	}

	initializing() {
		if (this.options.prettier) {
			this.composeWith(require.resolve('../prettier'), {});
			this.composeWith(require.resolve('../stylelint-prettier'), {});
		}

		if (this.options.sass) {
			this.composeWith(require.resolve('../sass'), {});
			this.composeWith(require.resolve('../stylelint-sass'), {});
		}
	}

	configuring() {
		this.fs.copy(
			this.templatePath('.stylelintignore'),
			this.destinationPath('.stylelintignore')
		);

		this.fs.copy(
			this.templatePath('.stylelintrc.js'),
			this.destinationPath('.stylelintrc.js')
		);
	}

	writing() {
		const pkgJson = generateExtendedPkg(isLintStagedEnable());

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Stylelint;
