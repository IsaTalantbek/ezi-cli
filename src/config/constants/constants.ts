import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface IConstants {
    'cli-name': string;
    'config-file-path': string;
}

export class ReadConstants {
    public static getConstants(): IConstants {
        const constantsPath = this.givePathToConstants();
        return JSON.parse(fs.readFileSync(constantsPath, 'utf-8'));
    }

    public static givePathToConstants(): string {
        // Получаем абсолютный путь к текущему модулю
        const currentFilePath = fileURLToPath(import.meta.url);
        return path.join(path.dirname(currentFilePath), './constants.json');
    }
}
