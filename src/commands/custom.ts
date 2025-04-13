import { SampleCommand } from './sample.js';
import path from 'path';
import { CommandExecutorHandler } from '../scripts/executor/handler.js';
import { CommandConfig } from '../config/cli/read.js';

export class UserCommand extends SampleCommand<any> {
    constructor(
        scriptsPath: string,
        command: string,
        commandConfig: CommandConfig
    ) {
        super(
            command,
            commandConfig.description || 'description is missing',
            (yargs) => {
                if (commandConfig.flags) {
                    for (const [flagName, flagConfig] of Object.entries(
                        commandConfig.flags
                    )) {
                        yargs.option(flagName, flagConfig);
                    }
                }
                return yargs;
            },
            async (args: any) => {
                await new CommandExecutorHandler(
                    args,
                    path.join(scriptsPath, commandConfig.handler)
                ).use();
            }
        );
    }
}
