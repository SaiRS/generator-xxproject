import Generator from 'yeoman-generator';
import { extendsBabelConfig } from '../tools/extends-module-config';

class Webpack extends Generator {
	initializing() {
		this.composeWith(require.resolve('../react'), {});
		this.composeWith(require.resolve('../typescript'), {});
	}

	writing() {
		const pkgJson = {
			dependencies: {
				next: '^8.1.0'
			},
			devDependencies: {
				'node-sass': '^4.12.0',
				'@types/next': '^8.0.5',
				'@zeit/next-sass': '^1.0.1',
				'@zeit/next-typescript': '^1.1.1'
			},
			scripts: {
				'next:start': 'cross-env next start ./src',
				'next:build': 'cross-env next build ./src'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		this.fs.copy(
			this.templatePath('next.config.js'),
			this.destinationPath('next.config.js')
		);

		const babelConfig = {
			presets: ['next/babel', '@zeit/next-typescript/babel']
		};
		// 修改babel
		extendsBabelConfig(babelConfig, this);

		// 修改tsconfig.json？
	}
}

module.exports = Webpack;
