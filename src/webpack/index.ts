import Generator from 'yeoman-generator';

class Webpack extends Generator {
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

	writing() {
		this.fs.copy(this.templatePath('config/'), this.destinationPath('config/'));

		this.fs.copy(
			this.templatePath('scripts/'),
			this.destinationPath('scripts/')
		);

		const pkgJson = {
			devDependencies: {
				webpack: '^4.29.2',
				'webpack-cli': '^3.2.3',
				'cross-env': '^5.2.0',
				ora: '^3.0.0',
				chalk: '^2.4.2'
			},
			scripts: {
				'webpack:build': 'cross-env node scripts/build.js'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = Webpack;
