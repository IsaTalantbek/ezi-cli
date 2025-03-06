import fs from 'fs';
import { ReadConstants } from '../../config/constants/constants.js';

export class Postinstall {
    public static syncConfigs(): void {
        const rawData = fs.readFileSync('package.json', 'utf-8');
        const packageJson = JSON.parse(rawData);
        if (packageJson?.config) {
            if (packageJson.config['easy-cli-path']) {
                ReadConstants.syncConstant(packageJson.config['easy-cli-path']);

                process.exit(1);
            }
        }
    }
}

Postinstall.syncConfigs();
