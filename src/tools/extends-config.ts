import path from 'path';
import jsonfile from 'jsonfile';
import fs from 'fs';
import yaml from 'js-yaml';

export function extendsConfig(
	newConfig: { [key: string]: any },
	filePath: string
) {
	switch (path.extname(filePath)) {
		case '.json':
			return extendsJsonConfig(newConfig, filePath);

		case '.js':
			return extendsJsConfig(newConfig, filePath);

		case '.yml':
		default:
			return extendsYmlConfig(newConfig, filePath);
	}
}

function extendsJsonConfig(
	newConfig: { [key: string]: any },
	filePath: string
): boolean {
	try {
		jsonfile.writeFileSync(filePath, newConfig, {
			spaces: 2
		});
		return true;
	} catch (error) {
		return false;
	}
}

function extendsJsConfig(
	newConfig: { [key: string]: any },
	filePath: string
): boolean {
	try {
		fs.writeFileSync(
			filePath,
			`module.exports = ${JSON.stringify(newConfig, undefined, 2)}`
		);
		return true;
	} catch (error) {
		return false;
	}
}

function extendsYmlConfig(newConfig: { [key: string]: any }, filePath: string) {
	try {
		let str = yaml.dump(newConfig);
		fs.writeFileSync(filePath, str);
		return true;
	} catch (error) {
		return false;
	}
}
