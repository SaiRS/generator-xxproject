import Generator from 'yeoman-generator';
import { isLintStagedEnable } from '../tools/detect';

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
		this.options.prettier &&
			this.composeWith(require.resolve('../stylelint-prettier'), {});
		this.options.sass &&
			this.composeWith(require.resolve('../stylelint-sass'), {});
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
		let linter: { [key: string]: any } = {};
		if (isLintStagedEnable()) {
			linter['**/*.{css,scss}'] = ['npm run stylelint:lint-fix', 'git add'];
		}
		const pkgJson = {
			devDependencies: {
				stylelint: '^10.0.1',
				'stylelint-config-recommended': '^2.2.0'
			},
			scripts: {
				'stylelint-check': 'stylelint --print-config .',
				'stylelint:lint':
					'stylelint ./src/**/*.{css,scss,js,jsx,ts,tsx}; exit 0',
				'stylelint:lint-fix': 'stylelint ./src/**/*.{css,scss} --fix'
			},
			'lint-staged': {
				linter: linter
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Stylelint;
