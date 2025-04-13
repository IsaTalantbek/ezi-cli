import ezcl from 'ezi-console';
import path from 'path';
import { ArgumentsCamelCase } from 'yargs';
import { SampleHandler } from '../sample.js';

export class CommandExecutorHandler extends SampleHandler<{}> {
    constructor(
        protected args: ArgumentsCamelCase<any>,
        private handlerPath: string
    ) {
        super(args);
    }

    public async use(): Promise<void> {
        const absolutePath = `file://${path.resolve(this.handlerPath)}`;
        try {
            const module = await import(absolutePath);
            if (module.default && typeof module.default === 'function') {
                await module.default(this.args);
            } else if (typeof module === 'function') {
                await module(this.args);
            } else {
                ezcl.error({
                    error: 'Handler module does not export a function',
                    comment: 'Make default export a function',
                    exit: true
                });
            }
        } catch (error: Error | any) {
            ezcl.error({
                error: error,
                comment: 'hen trying to export and execute the function',
                exit: true
            });
        }
    }
}
