"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class Webpack extends yeoman_generator_1.default {
    constructor(args, options) {
        super(args, options);
        this.option('typescript', {
            default: false,
            description: 'combine with typescript?',
            type: Boolean
        });
        this.option('prettier', {
            default: false,
            description: 'combine with prettier?',
            type: Boolean
        });
    }
    writing() {
        this.fs.copy(this.templatePath('config/'), this.destinationPath('config/'));
        this.fs.copy(this.templatePath('scripts/'), this.destinationPath('scripts/'));
        const pkgJson = {
            devDependencies: {
                webpack: '^4.29.2',
                'webpack-cli': '^3.2.3',
                'cross-env': '^5.2.0',
                "ora": '^3.0.0'
            },
            scripts: {
                build: 'cross-env node scripts/build.js'
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