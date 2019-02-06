"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const shell = __importStar(require("shelljs"));
class default_1 extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        let argmentOptions = {
            type: String,
            required: false
        };
        // yo xproject projectName
        this.argument('projectName', argmentOptions);
        this.projectName = this.options.projectName || '';
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.projectName) {
                // create new project
                const answers = yield this.prompt([
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
            }
            else {
                // attach to exist projct
                // 检查当前目录下是否有package.json
                if (!this.fs.exists('package.json')) {
                    // eslint-disable-next-line
                    return Promise.reject(new Error('unvalid project(should has package.json)'));
                }
                else {
                    // 设置project Name为当前文件夹的名字
                    // this.projectName = path.basename(this.destinationPath());
                }
            }
        });
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
        }
        else {
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
    _copy(sourcePath, destinationPath) {
        this.fs.copy(this.templatePath(sourcePath), this.destinationPath(`${destinationPath}`));
    }
    _packageJSON() {
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath(`package.json`), {
            projectName: this.projectName,
            projectDescription: this.projectDescription,
            projectVersion: this.projectVersion,
            authorName: this.authorName
        });
    }
    _extendJson() {
        let pkgJson = this.fs.readJSON(this.templatePath('package.json'));
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map