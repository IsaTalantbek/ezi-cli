import { Argv } from 'yargs';
import { CommandConfig } from '../config/cli/read.js';
import { BaseCommand } from './base.js';
import { CommandExecuter } from './executer.js';
import path from 'path';

export class UserCommand extends BaseCommand {
    constructor(
        scriptsPath: string,
        command: string,
        commandConfig: CommandConfig
    ) {
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
                await CommandExecuter.use(
                    path.join(scriptsPath, commandConfig.handler),
                    argv
                );
            }
        );
    }
}
