import { Argv } from 'yargs';
import { CommandConfig } from '../config/cli/read.js';
import { BaseCommand } from './base.js';
import { HandlerExecuter } from './executer.js';

export class UserCommand extends BaseCommand {
    constructor(command: string, commandConfig: CommandConfig) {
        super(
            command,
            commandConfig.description || 'description is missing',
            (yargs: Argv) => {
                if (commandConfig.flags) {
                    for (const [flagName, flagConfig] of Object.entries(
                        commandConfig.flags
                    )) {
                        yargs.option(flagName, flagConfig);
                    }
                }
                return yargs;
            },
            async (argv: any) => {
                await HandlerExecuter.use(commandConfig.handler, argv);
            }
        );
    }
}
