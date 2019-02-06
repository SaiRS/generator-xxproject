"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class JestConfig extends yeoman_generator_1.default {
    writing() {
        const pkgJson = {
            scripts: {
                test: 'jest'
            },
            devDependencies: {
                jest: '^24.0.0',
                '@types/jest': '^24.0.0',
                "ts-jest": "^23.10.5"
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        // copying(1) --> shell脚本完成
        // copying(2)
        this.fs.copy(this.templatePath('jest.config.js'), this.destinationPath('jest.config.js'));
        this.fs.copy(this.templatePath('jest'), this.destinationPath('config/jest'));
    }
    install() {
        this.npmInstall();
    }
}
module.exports = JestConfig;
//# sourceMappingURL=index.js.map