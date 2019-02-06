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
        this.fs.copy(this.templatePath('.prettierrc'), this.destinationPath('.prettierrc'));
        const pkgJson = {
            devDependencies: {
                prettier: '^1.16.0',
                'pretty-quick': '^1.6.0'
            },
            scripts: {
                format: "prettier --write '**/*.{js,jsx,json,md}'",
                'format:changed': 'pretty-quick',
                'format:staged': 'pretty-quick --staged'
            },
            husky: {
                hooks: {
                    'pre-commit': 'pretty-quick --staged'
                }
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
}
module.exports = PrettierConfig;
//# sourceMappingURL=index.js.map