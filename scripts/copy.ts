import * as shell from "shelljs";

function getModuleSrcTemplateDir(moduleName: string): string {
	return `src/${moduleName}/templates`;
}
function getModuleGenerateTemplateDir(moduleName: string): string {
	return `generators/${moduleName}/templates`;
}



shell.mkdir('-p', 'generators/app/templates');
shell.mkdir('-p', 'generators/dev-env/templates');

// editorconfig
shell.cp('-r', getModuleSrcTemplateDir('editorconfig'), getModuleGenerateTemplateDir('editorconfig'));

// prettier
shell.cp('-r', getModuleSrcTemplateDir('prettier'), getModuleGenerateTemplateDir('prettier'));

// stylint
shell.cp('-r', getModuleSrcTemplateDir('stylelint'), getModuleGenerateTemplateDir('stylelint'));
shell.cp('-r', getModuleSrcTemplateDir('stylelint-prettier'), getModuleGenerateTemplateDir('stylelint-prettier'));
shell.cp('-r', getModuleSrcTemplateDir('stylelint-sass'), getModuleGenerateTemplateDir('stylelint-sass'));

// typescript
shell.cp('-r', getModuleSrcTemplateDir('typescript'), getModuleGenerateTemplateDir('typescript'));

// storybook
shell.cp('-r', getModuleSrcTemplateDir('storybook'), getModuleGenerateTemplateDir('storybook'));

// webpack react app
shell.cp('-r', getModuleSrcTemplateDir('webpack-react-app'), getModuleGenerateTemplateDir('webpack-react-app'));
shell.cp('-r', getModuleSrcTemplateDir('webpack-lib'), getModuleGenerateTemplateDir('webpack-lib'));
shell.cp('-r', getModuleSrcTemplateDir('rollup-react-lib'), getModuleGenerateTemplateDir('rollup-react-lib'));

// next
shell.cp('-r', getModuleSrcTemplateDir('next'), getModuleGenerateTemplateDir('next'));

// dev-env
shell.cp('-ur', 'src/dev-env/templates/', 'generators/dev-env');

// copy eslint
shell.cp('-r', getModuleSrcTemplateDir('eslint'), getModuleGenerateTemplateDir('eslint'));
shell.cp('-r', getModuleSrcTemplateDir('eslint-prettier'), getModuleGenerateTemplateDir('eslint-prettier'));
shell.cp('-r', getModuleSrcTemplateDir('eslint-typescript'), getModuleGenerateTemplateDir('eslint-typescript'));

// generator templates
shell.cp('-u', 'src/app/templates/**', 'generators/app/templates/');

// jest config
shell.cp('-r', getModuleSrcTemplateDir('jest'), getModuleGenerateTemplateDir('jest'));


// webpack
shell.cp('-ur', 'src/webpack/templates', 'generators/webpack/templates/');
