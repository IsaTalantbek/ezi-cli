import path from 'path';
import { Message } from '../../util/message.js';
import { Constants } from '../constants/constants.js';
import fs from 'fs';
import yaml from 'yaml';
import { Options } from 'yargs';
import { FileExtension } from '../../util/file.extension.js';

export interface CommandConfig {
    handler: string;
    description: string;
    flags?: {
        [flag: string]: Options;
    };
}

export interface CLIConfig {
    commands: {
        [command: string]: CommandConfig;
    };
}

export class ReadConfigFile {
    static getConfig(error: boolean): CLIConfig | null {
        const configPath = Constants.getConstants()['config-file-path'];

        const fullConfigPath = path.resolve(configPath);

        if (fs.existsSync(fullConfigPath)) {
            const rawData = fs.readFileSync(fullConfigPath, 'utf-8');
            if (!rawData) {
                if (error) {
                    Message.error({
                        path: configPath,
                        error: 'config file is empty'
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
                    Message.error({
                        path: fullConfigPath,
                        error: `config file has invalid extension, available extensions: "json", "yaml"`
                    });
            }
            return JSON.parse(rawData);
        } else {
            if (error) {
                Message.error({
                    path: fullConfigPath,
                    error: 'config file was not found'
                });
            }
            return null;
        }
    }
}
