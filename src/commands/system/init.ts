import { ArgumentsCamelCase } from 'yargs';
import { InitHandler, InitHandlerArgs } from '../../scripts/init/init.js';
import { SampleCommand } from '../sample.js';

export class InitCommand extends SampleCommand<InitHandlerArgs> {
    constructor() {
        super(
            'init-cli',
            'initialize ezi-cli',
            (yargs) => {
                return yargs.option('config-file-path', {
                    alias: 'p',
                    description:
                        'select an extension and name for your config file',
                    type: 'string',
                    default: './ezi-cli.json'
                });
            },
            async (args: ArgumentsCamelCase<InitHandlerArgs>) => {
                await new InitHandler(args).use();
            }
        );
    }
}
