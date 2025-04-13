import path from 'path';
import fs from 'fs';
import yaml from 'yaml';
import { Options } from 'yargs';
import { FileExtension } from '../../util/file.extension.js';
import { PackageJson } from '../package.json.js';
import ezcl from 'ezi-console';

export interface CommandConfig {
    handler: string;
    description: string;
    flags?: {
        [flag: string]: Options;
    };
}

export interface CLIConfig {
    'scripts-path': string;
    commands: {
        [command: string]: CommandConfig;
    };
}

export class ReadConfigFile {
    static getConfig(
        errorExist?: boolean,
        errorPath?: boolean
    ): CLIConfig | null {
        const configPath = PackageJson.getEziCliPath(errorExist) as string;

        if (!configPath) {
            return null;
        }

        const fullConfigPath = path.resolve(configPath);

        if (fs.existsSync(fullConfigPath)) {
            const rawData = fs.readFileSync(fullConfigPath, 'utf-8');
            if (!rawData) {
                if (errorExist) {
                    ezcl.error({
                        path: configPath,
                        error: 'config file is empty',
                        exit: true
                    });
                }
                return null;
            }

            switch (FileExtension.get(fullConfigPath)) {
                case 'json':
                    return JSON.parse(rawData);
                case 'yaml':
                    return yaml.parse(rawData);
                default:
                    ezcl.error({
                        path: fullConfigPath,
                        error: `config file has invalid extension, available extensions: "json", "yaml"`,
                        exit: true
                    });
            }
            return JSON.parse(rawData);
        } else {
            if (errorPath) {
                ezcl.error({
                    path: fullConfigPath,
                    error: 'config file was not found',
                    comment: 'check package.json/config.ezi-cli-path',
                    exit: true
                });
            }
            return null;
        }
    }
}
