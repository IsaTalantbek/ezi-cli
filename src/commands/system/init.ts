import { Argv } from 'yargs';
import { BaseCommand } from '../base.js';
import { InitConfig } from '../../scripts/init/init.js';

export class InitCommand extends BaseCommand {
    constructor() {
        super(
            'init-ezi-cli',
            'initialize ezi-cli',
            (yargs: Argv) => {
                return yargs.option('config-file-path', {
                    alias: 'p',
                    description:
                        'select an extension and name for your config file',
                    type: 'string',
                    default: './ezi-cli.json'
                });
            },
            async (argv: any) => {
                await new InitConfig(argv['config-file-path']).handler.bind(
                    new InitConfig(argv['config-file-path'])
                )();
            }
        );
    }
}
