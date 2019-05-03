import * as shell from "shelljs";

function getModuleSrcTemplateDir(moduleName: string): string {
	return `src/${moduleName}/templates`;
}
function getModuleGenerateTemplateDir(moduleName: string): string {
	return `generators/${moduleName}/templates`;
}



shell.mkdir('-p', 'generators/app/templates');
shell.mkdir('-p', 'generators/typescript/templates');
shell.mkdir('-p', 'generators/next/templates');
shell.mkdir('-p', 'generators/tslint/templates');
shell.mkdir('-p', 'generators/dev-env/templates');

// editorconfig
shell.cp('-r', getModuleSrcTemplateDir('editorconfig'), getModuleGenerateTemplateDir('editorconfig'));

// prettier
shell.cp('-r', getModuleSrcTemplateDir('prettier'), getModuleGenerateTemplateDir('prettier'));

shell.cp('-u', 'src/typescript/templates/**', 'generators/typescript/templates/');

// next
shell.cp('-u', 'src/next/templates/**', 'generators/next/templates/');

// tslint
shell.cp('-u', 'src/tslint/templates/**', 'generators/tslint/templates/');

// dev-env
shell.cp('-ur', 'src/dev-env/templates/', 'generators/dev-env');

// copy eslint
shell.cp('-ur', 'src/eslint/templates', 'generators/eslint/templates');

// generator templates
shell.cp('-u', 'src/app/templates/**', 'generators/app/templates/');

// jest config
shell.cp('-r', getModuleSrcTemplateDir('jest'), getModuleGenerateTemplateDir('jest'));


// webpack
shell.cp('-ur', 'src/webpack/templates', 'generators/webpack/templates/');
