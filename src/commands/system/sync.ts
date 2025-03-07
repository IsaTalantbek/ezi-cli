import { Argv } from 'yargs';
import { BaseCommand } from '../base.js';
import { SyncConfigs } from '../../scripts/sync/sync.js';

export class SyncCommand extends BaseCommand {
    constructor() {
        super(
            'sync-ezi-cli',
            'sync settings ezi-cli',
            (yargs: Argv) => yargs,
            () => {
                SyncConfigs.use();
            }
        );
    }
}
