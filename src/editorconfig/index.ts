import Generator from 'yeoman-generator';

export default class extends Generator {
	writing() {
		// copying(1) --> shell脚本完成
		// copying(2)
		this.fs.copy(
			this.templatePath('.editorconfig'),
			this.destinationPath('.editorconfig')
		);
	}
}
