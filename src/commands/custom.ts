import { Argv } from 'yargs';
import { CommandConfig } from '../config/cli/read.js';
import { BaseCommand } from './base.js';
import { HandlerExecuter } from './executer.js';

export class UserCommand extends BaseCommand {
    public command: string;
    public describe: string;
    public builder: (yargs: Argv) => Argv;
    public handler: (argv: any) => void;

    constructor(commandName: string, commandConfig: CommandConfig) {
        super();
        this.command = commandName;
        this.describe = commandConfig.description || 'Description is missing';
        this.builder = (yargs: Argv) => {
            if (commandConfig.flags) {
                for (const [flagName, flagConfig] of Object.entries(
                    commandConfig.flags
                )) {
                    yargs.option(flagName, flagConfig);
                }
            }
            return yargs;
        };
        this.handler = async (argv: any) => {
            await HandlerExecuter.use(commandConfig.handler, argv); // Подразумевается, что HandlerExecuter реализован
        };
    }
}
