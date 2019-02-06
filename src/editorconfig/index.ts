import Generator from 'yeoman-generator';

class EditorConfig extends Generator {
	writing() {
		// copying(1) --> shell脚本完成
		// copying(2)
		this.fs.copy(
			this.templatePath('.editorconfig'),
			this.destinationPath('.editorconfig')
		);
	}
}

module.exports = EditorConfig;
