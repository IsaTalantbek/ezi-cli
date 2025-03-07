import { Argv } from 'yargs';

export interface ICommand {
    command: string;
    describe: string;
    builder?: (yargs: Argv) => Argv;
    handler: (argv: any) => void | Promise<void>;
}

export class BaseCommand implements ICommand {
    command: string;
    describe: string;
    builder: (yargs: Argv) => Argv;
    handler: (argv: any) => void | Promise<void>;

    constructor(
        command: string,
        describe: string,
        builder: (yargs: Argv) => Argv,
        handler: (argv: any) => void | Promise<void>
    ) {
        this.command = command;
        this.describe = describe;
        this.builder = builder;
        this.handler = handler;
    }
}
