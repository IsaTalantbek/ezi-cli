import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Message } from '../../util/message.js';
import { FileExtension } from '../../util/file.extension.js';

export interface IConstants {
    'config-file-path': string;
}

export class Constants {
    public static getConstants(): IConstants {
        const constantsPath = this.givePathToConstants();
        return JSON.parse(fs.readFileSync(constantsPath, 'utf-8'));
    }

    public static givePathToConstants(): string {
        // Получаем абсолютный путь к текущему модулю
        const currentFilePath = fileURLToPath(import.meta.url);
        return path.join(path.dirname(currentFilePath), './constants.json');
    }

    public static syncConstant(eziCliPath?: string): void {
        const configPath = eziCliPath
            ? eziCliPath
            : JSON.parse(fs.readFileSync('./package.json', 'utf-8')).config[
                  'ezi-cli-path'
              ];

        const fullPath = path.resolve(configPath);

        if (fs.existsSync(fullPath)) {
            const extension = FileExtension.get(fullPath);
            if (extension !== 'json' && extension !== 'yaml') {
                Message.error({
                    path: fullPath,
                    error: `the extension of this configuration file is not ".json" or ".ymal"`
                });
            }

            const constantData: IConstants = {
                'config-file-path': configPath
            };

            const content = JSON.stringify(constantData);

            const constantsConfigPath = this.givePathToConstants();

            fs.writeFileSync(constantsConfigPath, content, 'utf-8');
        } else {
            Message.error({
                path: fullPath,
                error: 'in package.json/config.ezi-cli-path contains incorrect path to configuration file'
            });
        }
    }
}
