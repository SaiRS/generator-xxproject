import Generator from 'yeoman-generator';
import * as shell from 'shelljs';

class DevEnv extends Generator {
	_copy(dirOrFile: string, dst: string = dirOrFile) {
		this.fs.copy(this.templatePath(dirOrFile), this.destinationPath(dst));
		// this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('config/'));
	}

	_copyAll() {
		this._copy('config/');
		this._copy('.editorconfig');
		this._copy('.eslintignore');
		this._copy('.eslintrc.js');
		this._copy('.gitattributes');
		// this._copy('.gitignore');
		this._copy('.npmrc');
		this._copy('.npmignore');
		this._copy('.prettierignore');
		this._copy('.prettierrc.js');
		this._copy('.stylelintrc.js');
		this._copy('.stylelintignore');
		this._copy('babel.config.js');
		this._copy('jest.config.js');
		this._copy('tsconfig.json');
		this._copy('webpack.config.js');

		shell.mkdir('.storybook');
		this._copy('storybook/webpack.config.js', '.storybook/webpack.config.js');
		this._copy('stories');
		shell.mkdir('src');
	}

	writing() {
		this._copyAll();

		const pkgJson = {
			scripts: {
				storybook: 'start-storybook -p 6006',
				'build-storybook': 'build-storybook',
				bundle: 'webpack',
				'type-check': 'tsc --noEmit',
				'type-check:watch': 'npm run type-check -- --watch',
				'eslint-content': 'eslint --print-config .',
				'eslint-check':
					'eslint --print-config . | eslint-config-prettier-check',
				'eslint:lint': 'eslint --quiet ./src/**/*',
				'eslint:lint-fix': 'eslint --fix ./src/**/*',
				'prettier:lint': 'prettier --config .prettierrc.js --check src/**/*',
				'prettier:lint-fix':
					'prettier --write --config .prettierrc.js src/**/*',
				'lint-staged': 'lint-staged',
				'stylelint-check': 'stylelint --print-config .',
				'stylelint:lint':
					'stylelint ./src/**/*.{css,less,scss,js,jsx,ts,tsx}; exit 0',
				'stylelint:lint-fix': 'stylelint ./src/**/*.{css,less,scss} --fix',
				'test:clean': 'rimraf ./coverage',
				test: 'cross-env NODE_ENV=test jest --coverage',
				'test:watch': 'cross-env NODE_ENV=test jest --watchAll',
				'build:types': 'tsc --emitDeclarationOnly',
				'build:js':
					'babel src --extensions ".ts,.tsx,.js,.jsx" --source-maps inline',
				build:
					'npm run build:commonjs && npm run build:umd && npm run build:umd:min && npm run build:es',
				'build:commonjs':
					'npm run build:types -- --outDir lib && cross-env BABEL_ENV=commonjs npm run build:js -- --out-dir lib',
				'build:es':
					'npm run build:types -- --outDir es && cross-env BABEL_ENV=es npm run build:js -- --out-dir es',
				'build:amd':
					'npm run build:types -- --outDir amd && cross-env BABEL_ENV=amd npm run build:js -- --out-dir amd',
				'build:umd':
					'npm run build:types -- --outDir umd && cross-env BABEL_ENV=umd npm run build:js -- --out-dir umd',
				'build:umd:min':
					'npm run build:types && cross-env BABEL_ENV=commonjs NODE_ENV=production webpack'
			},
			dependencies: {
				'@types/react': '^16.8.13',
				'@types/react-dom': '^16.8.4',
				'@types/storybook__addon-links': '^3.3.4',
				'core-js': '^3.0.1',
				faker: '^4.1.0',
				react: '^16.8.6',
				'react-dom': '^16.8.6'
			},
			devDependencies: {
				'@babel/cli': '^7.4.3',
				'@babel/core': '^7.4.3',
				'@babel/plugin-proposal-class-properties': '^7.4.0',
				'@babel/plugin-proposal-object-rest-spread': '^7.4.3',
				'@babel/preset-env': '^7.4.3',
				'@babel/preset-react': '^7.0.0',
				'@babel/preset-typescript': '^7.3.3',
				'@storybook/addon-actions': '^5.0.9',
				'@storybook/addon-links': '^5.0.9',
				'@storybook/addon-viewport': '^5.0.10',
				'@storybook/addons': '^5.0.9',
				'@storybook/react': '^5.0.9',
				'@types/faker': '^4.1.5',
				'@types/jest': '^24.0.11',
				'@types/storybook__addon-actions': '^3.4.2',
				'@types/storybook__react': '^4.0.1',
				'@types/styled-components': '^4.1.14',
				'@typescript-eslint/eslint-plugin': '^1.6.0',
				'@typescript-eslint/parser': '^1.6.0',
				'babel-jest': '^24.7.1',
				'babel-loader': '^8.0.5',
				'babel-plugin-styled-components': '^1.10.0',
				'babel-plugin-transform-es2015-modules-amd': '^6.24.1',
				'babel-plugin-transform-es2015-modules-commonjs': '^6.26.2',
				'babel-plugin-transform-es2015-modules-umd': '^6.24.1',
				'cross-env': '^5.2.0',
				eslint: '^5.16.0',
				'eslint-config-airbnb-typescript': '^2.0.0',
				'eslint-config-google': '^0.12.0',
				'eslint-config-prettier': '^4.1.0',
				'eslint-friendly-formatter': '^4.0.1',
				'eslint-loader': '^2.1.2',
				'eslint-plugin-eslint-comments': '^3.1.1',
				'eslint-plugin-import': '^2.17.2',
				'eslint-plugin-jest': '^22.4.1',
				'eslint-plugin-jsx-a11y': '^6.2.1',
				'eslint-plugin-prettier': '^3.0.1',
				'eslint-plugin-promise': '^4.1.1',
				'eslint-plugin-react': '^7.12.4',
				'eslint-plugin-unicorn': '^8.0.2',
				husky: '^1.3.1',
				jest: '^24.7.1',
				'lint-staged': '^8.1.5',
				prettier: '^1.17.0',
				'react-app-polyfill': '^0.2.2',
				rimraf: '^2.6.3',
				stylelint: '^10.0.1',
				'stylelint-config-prettier': '^5.1.0',
				'stylelint-config-recommended': '^2.2.0',
				'stylelint-config-styled-components': '^0.1.1',
				'stylelint-prettier': '^1.0.6',
				'stylelint-processor-styled-components': '^1.6.0',
				'stylelint-scss': '^3.6.0',
				'stylelint-webpack-plugin': '^0.10.5',
				'ts-jest': '^24.0.2',
				typescript: '^3.4.3',
				'ts-node': '^8.1.0',
				webpack: '^4.30.0',
				'webpack-cli': '^3.3.0'
			},
			husky: {
				hooks: {
					'pre-commit': 'lint-staged'
				}
			},
			'lint-staged': {
				linters: {
					'**/*.{js,ts,tsx,jsx,json}': ['eslint --fix', 'git add'],
					'**/*.{css,less,scss}': ['npm run stylelint:lint-fix', 'git add'],
					'*.{md,html}': ['prettier --write', 'git add']
				},
				ignore: ['**/dist/*.min.js', '*.d.ts']
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();

		// storybook
		shell.exec('npx -p @storybook/cli sb init');
	}

	end() {
		// storybook config
		this._copy('storybook/addons.js', '.storybook/addons.js');
		this._copy('storybook/config.js', '.storybook/config.js');
	}
}

module.exports = DevEnv;
