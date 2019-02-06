import Generator from 'yeoman-generator';

class EslintConfig extends Generator {
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

		let additionDevDependencies = {};
		if (this.options.prettier) {
			additionDevDependencies = {
				...additionDevDependencies,
				'eslint-config-prettier': '^3.6.0',
				'eslint-plugin-prettier': '^3.0.1'
			};
		}

		if (this.options.typescript) {
			additionDevDependencies = {
				...additionDevDependencies,
				'@typescript-eslint/eslint-plugin': '^1.2.0',
				'@typescript-eslint/parser': '^1.2.0',
				'eslint-config-alloy': '^1.4.2'
			};
		}

		const pkgJson = {
			devDependencies: {
				eslint: '^5.12.1',
				'eslint-config-google': '^0.12.0',
				...additionDevDependencies
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

		// 读取eslint配置
		let additionEsrc: {
			[key: string]: any
			} = this.fs.readJSON(this.destinationPath('.eslintrc'));;
		if (this.options.typescript) {
			additionEsrc = {
				...additionEsrc,
				extends: [
					...(additionEsrc.extends || []),
					'eslint-config-alloy/typescript'
				],
				override: [
					{
						files: 'src/**/*.{ts,tsx}',
						parser: '@typescript-eslint/parser',
						plugins: ['@typescript-eslint'],
						rules: {
							'no-undef': 'off',
							'no-dupe-class-members': 'off',
							complexity: 'off',
							'func-name-matching': 'off'
						}
					}
				]
			};
		}

		if (this.options.prettier) {
			additionEsrc = {
				...additionEsrc,
				extends: [...additionEsrc.extends, 'prettier'],
				plugins: [...additionEsrc.plugins, 'prettier'],
				rules: {
					'prettier/prettier': 'error'
				}
			};
		}
		// 修改eslintrc
		this.fs.extendJSON(this.destinationPath('.eslintrc'), additionEsrc);
	}

	install() {
		this.npmInstall();
	}
}

module.exports = EslintConfig;
