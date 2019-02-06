import Generator from 'yeoman-generator';

class EslintConfig extends Generator {
	writing() {
		// copying(1) --> shell脚本完成
		// copying(2)
		this.fs.copy(
			this.templatePath('.eslintrc'),
			this.destinationPath('.eslintrc')
		);

		this.fs.copy(
			this.templatePath('.eslintignore'),
			this.destinationPath('.eslintignore')
		);

		const pkgJson = {
			devDependencies: {
				eslint: '^5.12.1',
				'eslint-config-google': '^0.12.0'
			},
			scripts: {
				'eslint-check':
					'eslint --print-config .eslintrc.js | eslint-config-prettier-check',
				lint: 'eslint **/*.js --quiet',
				'lint-fix': 'eslint --fix'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = EslintConfig;
