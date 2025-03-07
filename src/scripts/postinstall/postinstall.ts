import fs from 'fs';
import { Constants } from '../../config/constants/constants.js';
import { Message } from '../../util/message.js';

export class Postinstall {
    public static syncConfigs(check?: boolean): void {
        const rawData = fs.readFileSync('package.json', 'utf-8');
        const packageJson = JSON.parse(rawData);
        if (packageJson?.config) {
            if (packageJson.config['ezi-cli-path']) {
                Constants.syncConstant(packageJson.config['ezi-cli-path']);
                process.exit(1);
            }
        }
        if (check) {
            Message.error({
                error: 'package.json/config.ezi-cli-path is not exist'
            });
        }
    }
}

Postinstall.syncConfigs();
