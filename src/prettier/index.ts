import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';
class PrettierConfig extends Generator {
	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
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
