import { Message } from '../../util/message.js';
import { Constants } from '../../config/constants/constants.js';
import fs from 'fs';

export class SyncConfigs {
    public static use() {
        const packageJson = JSON.parse(
            fs.readFileSync('./package.json', 'utf-8')
        );
        if (!packageJson?.config['ezi-cli-path']) {
            Message.error({
                error: 'package.json/config.ezi-cli-path is not exist'
            });
        } else {
            Constants.syncConstant();
        }
    }
}
