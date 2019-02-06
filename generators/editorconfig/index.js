"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class EditorConfig extends yeoman_generator_1.default {
    writing() {
        // copying(1) --> shell脚本完成
        // copying(2)
        this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
    }
}
module.exports = EditorConfig;
//# sourceMappingURL=index.js.map