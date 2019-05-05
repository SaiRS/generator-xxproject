import Generator from 'yeoman-generator';

class PrettierConfig extends Generator {
	writing() {
		const pkgJson = {
			devDependencies: {
				prettier: '^1.17.0'
			},
			scripts: {
				'prettier:lint': 'prettier --config .prettierrc.js --check src/**/*',
				'prettier:lint-fix': 'npm run prettier:lint -- --write'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	end() {
		this.fs.copy(
			this.templatePath('.prettierignore'),
			this.destinationPath('.prettierignore')
		);

		this.fs.copy(
			this.templatePath('.prettierrc.js'),
			this.destinationPath('.prettierrc.js')
		);
	}
}

module.exports = PrettierConfig;
