import { Message } from '../../util/message.js';
import { ReadConstants } from '../../config/constants/constants.js';
import fs from 'fs';

export class SyncConfigs {
    public static use() {
        const packageJson = JSON.parse(
            fs.readFileSync('./package.json', 'utf-8')
        );
        if (!packageJson?.config['ezi-cli-path']) {
            Message.sample({
                type: 'error',
                comment: 'package.json/config.ezi-cli-path is not exist'
            });
        } else {
            ReadConstants.syncConstant();
        }
    }
}
