import Generator from 'yeoman-generator';
import * as shell from 'shelljs';
import _ from 'lodash';

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
				// this.projectName = path.basename(this.destinationPath());
			}
		}
	}

	initializing() {
		this.composeWith(require.resolve('../editorconfig'), {});
		this.composeWith(require.resolve('../jest'), {});
		this.composeWith(require.resolve('../express'), {});
		this.composeWith(require.resolve('../mongodb'), {});
		this.composeWith(require.resolve('../prettier'), {});
		this.composeWith(require.resolve('../faker'), {});
		this.composeWith(require.resolve('../typescript'), {});
		this.composeWith(require.resolve('../eslint'), {
			typescript: true,
			prettier: true
		});
	}

	configuring() {
		if (this.projectName) {
			this.destinationRoot(this.destinationPath(this.projectName));
		}
	}

	writing() {
		if (this.projectName) {
			this._packageJSON();
		} else {
			this._extendJson();
		}
	}

	install() {
		this.installDependencies({
			npm: true,
			bower: false,
			yarn: false
		});
		// // 创建src
		shell.mkdir('src');
	}

	/********************* prompt start *************************/

	/********************* prompt end *************************/

	_copy(sourcePath: string, destinationPath: string) {
		this.fs.copy(
			this.templatePath(sourcePath),
			this.destinationPath(`${destinationPath}`)
		);
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

	_extendJson() {
		let pkgJson = this.fs.readJSON(this.templatePath('package.json'));
		pkgJson = _.omit(pkgJson, ['name', 'description', 'version', 'author']);
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}
}
