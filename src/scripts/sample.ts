import { ArgumentsCamelCase } from 'yargs';

export abstract class SampleHandler<T = {}> {
    constructor(protected args: ArgumentsCamelCase<T>) {}

    public abstract use(): Promise<void>;
}
