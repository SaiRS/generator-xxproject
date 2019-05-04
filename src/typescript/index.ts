import Generator from 'yeoman-generator';

class Typescript extends Generator {
	initializing() {
		this.composeWith(require.resolve('../browserlist'), {});
	}

	writing() {
		const pkgJson = {
			dependencies: {
				typescript: '^3.2.4'
			},
			devDependencies: {
				'ts-node': '^8.1.0',
				'cross-env': '^5.2.0',
				'core-js': '^3.0.1',
				'@babel/cli': '^7.4.3',
				'@babel/core': '^7.4.3',
				'@babel/plugin-proposal-class-properties': '^7.4.0',
				'@babel/plugin-proposal-object-rest-spread': '^7.4.3',
				'@babel/preset-env': '^7.4.3',
				'@babel/preset-react': '^7.0.0',
				'@babel/preset-typescript': '^7.3.3',
				'babel-plugin-transform-es2015-modules-amd': '^6.24.1',
				'babel-plugin-transform-es2015-modules-commonjs': '^6.26.2',
				'babel-plugin-transform-es2015-modules-umd': '^6.24.1'
			},
			scripts: {
				'type-check': 'tsc --noEmit',
				'type-check:watch': 'npm run type-check -- --watch',
				'build:types': 'tsc --emitDeclarationOnly',
				'build:source':
					'babel src --extensions ".ts,.tsx,.js,.jsx" --source-maps inline',
				'build:typescript':
					'npm run build:commonjs && npm run build:umd  && npm run build:es',
				'build:commonjs':
					'npm run build:types -- --outDir lib && cross-env BABEL_ENV=commonjs npm run build:source -- --out-dir lib',
				'build:es':
					'npm run build:types -- --outDir es && cross-env BABEL_ENV=es npm run build:source -- --out-dir es',
				'build:amd':
					'npm run build:types -- --outDir amd && cross-env BABEL_ENV=amd npm run build:source -- --out-dir amd',
				'build:umd':
					'npm run build:types -- --outDir umd && cross-env BABEL_ENV=umd npm run build:source -- --out-dir umd'
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
			this.templatePath('tsconfig.json'),
			this.destinationPath('tsconfig.json')
		);
		this.fs.copy(
			this.templatePath('babel.config.js'),
			this.destinationPath('babel.config.js')
		);
	}
}

module.exports = Typescript;
