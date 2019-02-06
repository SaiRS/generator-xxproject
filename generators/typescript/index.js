"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class Typescript extends yeoman_generator_1.default {
    writing() {
        this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
        const pkgJson = {
            dependencies: {
                typescript: '^3.2.4'
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    install() {
        this.npmInstall();
    }
}
module.exports = Typescript;
//# sourceMappingURL=index.js.map