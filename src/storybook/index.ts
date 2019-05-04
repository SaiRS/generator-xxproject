import Generator from 'yeoman-generator';

class Storybook extends Generator {
	// yo xxproject:storybook --react
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('react', {
			default: true,
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
		const pkgJson = {
			dependencies: {
				typescript: '^3.2.4'
			},
			devDependencies: {
				'@storybook/addon-actions': '^5.0.9',
				'@storybook/addon-links': '^5.0.9',
				'@storybook/addon-viewport': '^5.0.10',
				'@storybook/addons': '^5.0.9',
				'@storybook/react': '^5.0.9',
				'@types/storybook__addon-actions': '^3.4.2',
				'@types/storybook__addon-links': '^3.3.4',
				'@types/storybook__react': '^4.0.1',
				'babel-loader': '^8.0.5'
			},
			scripts: {
				storybook: 'start-storybook -p 6006',
				'build-storybook': 'build-storybook'
			}
		};

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
