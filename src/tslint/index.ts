import Generator from 'yeoman-generator';

class PrettierConfig extends Generator {
	writing() {
		// copying(1) --> shell脚本完成
		// copying(2)
		this.fs.copy(
			this.templatePath('tslint.json'),
			this.destinationPath('tslint.json')
		);

		const pkgJson = {
			devDependencies: {
				tslint: 'latest'
			}
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}

module.exports = PrettierConfig;
