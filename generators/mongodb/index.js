"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class Mongodb extends yeoman_generator_1.default {
    writing() {
        const pkgJson = {
            dependencies: {
                mongoose: '^5.4.9',
                mongodb: '^3.1.13'
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    install() {
        this.npmInstall();
    }
}
module.exports = Mongodb;
//# sourceMappingURL=index.js.map