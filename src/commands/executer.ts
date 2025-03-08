import path from 'path';
import { Message } from '../util/message.js';

export class CommandExecuter {
    static async use(handlerPath: string, argv: any): Promise<void> {
        const absolutePath = `file://${path.resolve(handlerPath)}`;
        try {
            const module = await import(absolutePath);
            if (module.default && typeof module.default === 'function') {
                await module.default(argv);
            } else if (typeof module === 'function') {
                await module(argv);
            } else {
                Message.error({
                    error: 'Handler module does not export a function',
                    comment: 'Make default export a function'
                });
            }
        } catch (error) {
            Message.error({
                error: error,
                comment: 'hen trying to export and execute the function'
            });
        }
    }
}
