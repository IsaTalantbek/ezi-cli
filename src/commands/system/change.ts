import { Argv } from 'yargs';
import { BaseCommand } from '../base.js';
import { ChangeHandler } from '../../scripts/change/change.js';

export class ChangeCommand extends BaseCommand {
    constructor() {
        super(
            'change-cli <config-file-path>',
            'change path to ezi-cli',
            (yargs: Argv) => {
                return yargs.positional('config-file-path', {
                    description:
                        'select an extension and name for your config file',
                    type: 'string',
                    default: './ezi-cli.json'
                });
            },
            (argv: any) => {
                ChangeHandler.use(argv);
            }
        );
    }
}
