// CommandLoader.ts
import { Argv } from 'yargs';
import { ICommand } from './base.js';

export class CommandLoader {
    private commands: ICommand[] = [];

    constructor(private yargsInstance: Argv) {}

    public addCommand(command: ICommand): void {
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
