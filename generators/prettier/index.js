"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class PrettierConfig extends yeoman_generator_1.default {
    writing() {
        // copying(1) --> shell脚本完成
        // copying(2)
        this.fs.copy(this.templatePath('.prettierignore'), this.destinationPath('.prettierignore'));
        this.fs.copy(this.templatePath('.prettierrc.js'), this.destinationPath('.prettierrc.js'));
        const pkgJson = {
            devDependencies: {
                prettier: '^1.17.0'
            },
            scripts: {
                'prettier:lint': 'prettier --config .prettierrc.js --check src/**/*',
                'prettier:lint-fix': 'npm run prettier:lint -- --write'
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
}
module.exports = PrettierConfig;
//# sourceMappingURL=index.js.map