import { ArgumentsCamelCase } from 'yargs';
import {
    ChangeHandler,
    ChangeHandlerArgs
} from '../../scripts/change/change.js';
import { SampleCommand } from '../sample.js';

export class ChangeCommand extends SampleCommand<ChangeHandlerArgs> {
    constructor() {
        super(
            'change-cli <config-file-path>',
            'change path to ezi-cli',
            (yargs) =>
                yargs.positional('config-file-path', {
                    description:
                        'select an extension and name for your config file',
                    type: 'string',
                    default: './ezi-cli.json'
                }),
            async (args: ArgumentsCamelCase<ChangeHandlerArgs>) => {
                await new ChangeHandler(args).use();
            }
        );
    }
}
