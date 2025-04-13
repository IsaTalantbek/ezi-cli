import { ArgumentsCamelCase, Argv, CommandModule } from 'yargs';

export class SampleCommand<TArgs = {}> implements CommandModule<{}, TArgs> {
    command: string;
    describe: string;
    builder: (yargs: Argv) => Argv<TArgs>;
    handler: (args: ArgumentsCamelCase<TArgs>) => void | Promise<void>;

    constructor(
        command: string,
        describe: string,
        builder: (yargs: Argv) => Argv<TArgs>,
        handler: (args: ArgumentsCamelCase<TArgs>) => void | Promise<void>
    ) {
        this.command = command;
        this.describe = describe;
        this.builder = builder;
        this.handler = handler;
    }
}
