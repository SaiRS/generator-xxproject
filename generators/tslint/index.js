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
        this.fs.copy(this.templatePath('tslint.json'), this.destinationPath('tslint.json'));
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
//# sourceMappingURL=index.js.map