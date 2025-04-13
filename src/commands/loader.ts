import { Argv } from 'yargs';
import { SampleCommand } from './sample.js';

export class CommandLoader {
    private commands: SampleCommand<any>[] = [];

    constructor(private yargsInstance: Argv) {}

    public addCommand(command: SampleCommand<any>): void {
        this.commands.push(command);
    }

    public loadCommands(): void {
        this.commands.forEach((cmd) => {
            this.yargsInstance.command({
                command: cmd.command,
                describe: cmd.describe,
                builder: cmd.builder,
                handler: cmd.handler
            });
        });
    }
}
