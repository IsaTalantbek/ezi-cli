import path from 'path';
import { commandMessage } from '../../util/message.js';
import { ReadConstants } from '../constants/constants.js';
import fs from 'fs';

export interface FlagConfig {
    alias: string;
    type: 'string' | 'boolean' | 'number';
}

export interface CommandConfig {
    handler: string;
    description: string;
    flags?: {
        [flag: string]: FlagConfig;
    };
}

export interface CLIConfig {
    'cli-name': string;
    commands: {
        [command: string]: CommandConfig;
    };
}

export class ReadConfigFile {
    static getConfig(): CLIConfig {
        const configPath = ReadConstants.getConstants()['config-file-path'];

        const fullConfigPath = path.join(process.cwd(), configPath);

        if (fs.existsSync(fullConfigPath)) {
            const rawData = fs.readFileSync(fullConfigPath, 'utf-8');

            return JSON.parse(rawData);
        } else {
            commandMessage({
                type: 'error',
                path: configPath,
                comment: 'config file was not found'
            });
            process.exit(1);
        }
    }
}
