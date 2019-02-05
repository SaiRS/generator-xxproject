import Generator from 'yeoman-generator';
import * as shell from 'shelljs';
import yosay from 'yosay';
import path from 'path';

export default class extends Generator {
	private projectName: string;
	private projectDescription: string;
	private projectVersion: string;
	private authorName: string;

	async prompting() {
		// this._welcome();
		const answers = await this.prompt([
			{
				name: 'projectName',
				type: 'input',
				message: 'Project name:',
				default: path.basename(this.destinationPath())
			},
			{
				name: 'projectDescription',
				type: 'input',
				message: 'Project description:'
			},
			{
				name: 'projectVersion',
				type: 'input',
				message: 'Project version:',
				default: '0.1.0'
			},
			{
				name: 'authorName',
				type: 'input',
				message: 'Author name:'
			}
		]);

		this.projectName = answers.projectName;
		this.projectDescription = answers.projectDescription;
		this.projectVersion = answers.projectVersion;
		this.authorName = answers.authorName;
	}

	initializing() {
		// 切换到
		// shell.cd(this.options.projectname);
		// package init
		//
		// this.destinationRoot(this.options.projectname);
	}

	configuring() {
		this.log('configuring');

		shell.mkdir(this.projectName);
		// this.destinationRoot(this.destinationPath());
	}

	writing() {
		this.log('writing');
		this._editorconfig();
		this._eslintignore();
		this._eslintrc();
		this._prettierrc();
		this._prettierignore();
		this._tsconfig();
		this._packageJSON();
	}

	conflicts() {
		this.log('conflicts');
	}

	install() {
		shell.cd(this.projectName);
		this.installDependencies({
			npm: true,
			bower: false,
			yarn: false
		});
	}

	end() {
		this.log('end');
	}

	/********************* prompt start *************************/

	_welcome() {
		// this.log(
		// 	yosay(
		// 		"'Allo 'allo! This generator add Redux, " +
		// 			'styled-components and some useful tools and libraries like ' +
		// 			'auto-generate boilerplate code to the most common ' +
		// 			'React starter Create React App'
		// 	)
		// );
	}

	async _ask() {
		return this.prompt([
			{
				name: 'projectName',
				type: 'input',
				message: 'Project name:',
				default: path.basename(this.destinationPath())
			},
			{
				name: 'projectDescription',
				type: 'input',
				message: 'Project description:'
			},
			{
				name: 'projectVersion',
				type: 'input',
				message: 'Project version:',
				default: '0.1.0'
			},
			{
				name: 'authorName',
				type: 'input',
				message: 'Author name:'
			}
		]).then((answers) => {
			this.projectName = answers.projectName;
			this.projectDescription = answers.projectDescription;
			this.projectVersion = answers.projectVersion;
			this.authorName = answers.authorName;
		});
	}

	/********************* prompt end *************************/

	_copy(sourcePath: string, destinationPath: string) {
		this.log(
			`template path', ${this.templatePath(
				sourcePath
			)}, 'destinatin path', ${this.destinationPath(
				`${this.projectName}/${destinationPath}`
			)}`
		);
		this.fs.copy(
			this.templatePath(sourcePath),
			this.destinationPath(`${this.projectName}/${destinationPath}`)
		);
	}

	_editorconfig() {
		this._copy('.editorconfig', '.editorconfig');
	}

	_eslintignore() {
		this._copy('.eslintignore', '.eslintignore');
	}

	_eslintrc() {
		this._copy('.eslintrc', '.eslintrc');
	}

	_prettierrc() {
		this._copy('.prettierrc', '.prettierrc');
	}

	_prettierignore() {
		this._copy('.prettierignore', '.prettierignore');
	}

	_tsconfig() {
		this._copy('tsconfig.json', 'tsconfig.json');
	}

	_packageJSON() {
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath(`${this.projectName}/package.json`),
			{
				projectName: this.projectName,
				projectDescription: this.projectDescription,
				projectVersion: this.projectVersion,
				authorName: this.authorName
			}
		);
	}
}
