#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CLIConfig, ReadConfigFile } from '../config/cli/read.js';
import { CommandLoader } from '../commands/loader.js';
import { UserCommand } from '../commands/custom.js';

class CLI {
    config;
    constructor() {
        this.config = ReadConfigFile.getConfig(true) as CLIConfig;
    }
    async run() {
        const cliName = this.config['cli-name'];

        const yargsInstance = yargs(hideBin(process.argv))
            .scriptName(cliName)
            .showHelpOnFail(false);

        const commandsLoader = new CommandLoader(yargsInstance);

        for (const [commandName, commandConfig] of Object.entries(
            this.config.commands
        )) {
            commandsLoader.addCommand(
                new UserCommand(commandName, commandConfig)
            );
        }
        commandsLoader.loadCommands();
        yargsInstance.parseAsync();
    }
}
(async () => {
    const cli = new CLI();
    await cli.run();
})();
