"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class EslintConfig extends yeoman_generator_1.default {
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
        // copying(1) --> shell脚本完成
        // copying(2)
        this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
        this.fs.copy(this.templatePath('.eslintignore'), this.destinationPath('.eslintignore'));
        let additionDevDependencies = {};
        if (this.options.prettier) {
            additionDevDependencies = Object.assign({}, additionDevDependencies, { 'eslint-config-prettier': '^3.6.0', 'eslint-plugin-prettier': '^3.0.1' });
        }
        if (this.options.typescript) {
            additionDevDependencies = Object.assign({}, additionDevDependencies, { '@typescript-eslint/eslint-plugin': '^1.2.0', '@typescript-eslint/parser': '^1.2.0', 'eslint-config-alloy': '^1.4.2' });
        }
        const pkgJson = {
            devDependencies: Object.assign({ eslint: '^5.12.1', 'eslint-config-google': '^0.12.0' }, additionDevDependencies),
            scripts: {
                'eslint-check': 'eslint --print-config .eslintrc.js | eslint-config-prettier-check',
                lint: 'eslint **/*.js --quiet',
                'lint-fix': 'eslint --fix'
            }
        };
        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        // 读取eslint配置
        let additionEsrc = this.fs.readJSON(this.destinationPath('.eslintrc'));
        ;
        if (this.options.typescript) {
            additionEsrc = Object.assign({}, additionEsrc, { extends: [
                    ...(additionEsrc.extends || []),
                    'eslint-config-alloy/typescript'
                ], override: [
                    {
                        files: 'src/**/*.{ts,tsx}',
                        parser: '@typescript-eslint/parser',
                        plugins: ['@typescript-eslint'],
                        rules: {
                            'no-undef': 'off',
                            'no-dupe-class-members': 'off',
                            complexity: 'off',
                            'func-name-matching': 'off'
                        }
                    }
                ] });
        }
        if (this.options.prettier) {
            additionEsrc = Object.assign({}, additionEsrc, { extends: [...additionEsrc.extends, 'prettier'], plugins: [...additionEsrc.plugins, 'prettier'], rules: {
                    'prettier/prettier': 'error'
                } });
        }
        // 修改eslintrc
        this.fs.extendJSON(this.destinationPath('.eslintrc'), additionEsrc);
    }
    install() {
        this.npmInstall();
    }
}
module.exports = EslintConfig;
//# sourceMappingURL=index.js.map