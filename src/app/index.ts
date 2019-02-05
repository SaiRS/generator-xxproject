import Generator from 'yeoman-generator';
import * as shell from 'shelljs';
import yosay from 'yosay';
import path from 'path';

export default class extends Generator {
	private projectName: string;
	private projectDescription: string;
	private projectVersion: string;
	private authorName: string;

	constructor(args: string | string[], options: {}) {
		super(args, options);

		let argmentOptions: Generator.ArgumentConfig = {
			type: String,
			required: false
		};
		// yo xproject projectName
		this.argument('projectName', argmentOptions);

		this.projectName = this.options.projectName || '';
	}

	async prompting() {
		if (this.projectName) {
			// create new project
			const answers = await this.prompt([
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

			this.projectDescription = answers.projectDescription;
			this.projectVersion = answers.projectVersion;
			this.authorName = answers.authorName;
		} else {
			// attach to exist projct
			// 检查当前目录下是否有package.json
			if (!this.fs.exists('package.json')) {
				// eslint-disable-next-line
				return Promise.reject(
					new Error('unvalid project(should has package.json)')
				);
			} else {
				// 设置project Name为当前文件夹的名字
				this.projectName = path.basename(this.destinationPath());
			}
		}
	}

	initializing() {
		//
	}

	configuring() {
		this.destinationRoot(this.projectName);
	}

	writing() {
		this._eslintignore();
		this._eslintrc();
		this._prettierrc();
		this._prettierignore();
		this._tsconfig();
		this._packageJSON();
	}

	// conflicts() {
	// 	this.log('conflicts');
	// }

	install() {
		// shell.cd(this.projectName);
		this.installDependencies({
			npm: true,
			bower: false,
			yarn: false
		});

		// 创建src
		shell.mkdir('src');
	}

	// end() {
	// 	this.log('end');
	// }

	/********************* prompt start *************************/

	/********************* prompt end *************************/

	_copy(sourcePath: string, destinationPath: string) {
		this.fs.copy(
			this.templatePath(sourcePath),
			this.destinationPath(`${destinationPath}`)
		);
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
			this.destinationPath(`package.json`),
			{
				projectName: this.projectName,
				projectDescription: this.projectDescription,
				projectVersion: this.projectVersion,
				authorName: this.authorName
			}
		);
	}
}
