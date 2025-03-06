import { Argv } from 'yargs';

export interface ICommand {
    command: string;
    describe: string;
    builder?: (yargs: Argv) => Argv;
    handler: (argv: any) => void | Promise<void>;
}

export abstract class BaseCommand implements ICommand {
    abstract command: string;
    abstract describe: string;

    abstract builder(yargs: Argv): Argv;
    abstract handler(argv: any): void | Promise<void>;
}
