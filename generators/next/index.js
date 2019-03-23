"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class Webpack extends yeoman_generator_1.default {
    writing() {
        const pkgJson = {
            dependencies: {
                next: 'latest'
            },
            devDependencies: {
                '@types/next': 'latest'
            },
            scripts: {
                'next:start': 'cross-env next start',
                'next:build': 'cross-env next build'
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
    install() {
        this.npmInstall();
    }
}
module.exports = Webpack;
//# sourceMappingURL=index.js.map