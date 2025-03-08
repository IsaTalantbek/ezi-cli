#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CLIConfig, ReadConfigFile } from '../config/cli/read.js';
import { CommandLoader } from '../commands/loader.js';
import { UserCommand } from '../commands/custom.js';
import { InitCommand } from '../commands/system/init.js';
import { Message } from '../util/message.js';
import { ChangeCommand } from '../commands/system/change.js';

class CLI {
    config: CLIConfig;
    constructor() {
        this.config = ReadConfigFile.getConfig(false) as CLIConfig;
        if (this.config) {
            if (!this.config['scripts-path']) {
                Message.error({
                    error: 'your-config-file/scripts-path is not exist'
                });
            }
        }
    }
    async run() {
        const yargsInstance = yargs(hideBin(process.argv))
            .scriptName('ezi')
            .showHelpOnFail(false);

        const commandsLoader = new CommandLoader(yargsInstance);
        if (this.config) {
            for (const [commandName, commandConfig] of Object.entries(
                this.config.commands
            )) {
                commandsLoader.addCommand(
                    new UserCommand(
                        this.config['scripts-path'],
                        commandName,
                        commandConfig
                    )
                );
            }
        }
        commandsLoader.addCommand(new InitCommand());
        commandsLoader.addCommand(new ChangeCommand());

        commandsLoader.loadCommands();
        yargsInstance.parseAsync();
    }
}
(async () => {
    const cli = new CLI();
    await cli.run();
})();
