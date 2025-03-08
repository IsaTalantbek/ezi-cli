interface Imessage {
    path?: string;
    name?: string;
    comment?: string;
}

interface Ierror {
    error: any;
    path?: string;
    name?: string;
    comment?: string;
    noExit?: boolean;
}

export class Message {
    /**
     * Displays an error message with optional details and terminates the process.
     *
     * @param options - The error message options
     * @param options.path - Optional. The file path where the error occurred
     * @param options.name - Optional. The name associated with the error
     * @param options.comment - Optional. Additional comment about the error
     * @param options.error - The main error message or object
     * @param options.noExit - Optional. If true, prevents the process from exiting
     * @returns void
     */
    public static error({ path, name, comment, error, noExit }: Ierror): void {
        console.log('');
        console.error(`> type: \x1b[31merror\x1b[0m`);
        console.error(`> error: \x1b[31m${error}\x1b[0m`);
        comment ? console.error(`> comment: ${comment}`) : null;
        name ? console.error(`> name: ${name}`) : null;
        path ? console.error(`> path: ${path}`) : null;
        console.log('');
        noExit ? null : process.exit(1);
    }

    /**
     * Displays a notice message with optional details.
     *
     * @param options - The notice message options
     * @param options.path - Optional. The file path associated with the notice
     * @param options.name - Optional. The name associated with the notice
     * @param options.comment - Optional. The main content of the notice message
     * @returns void
     */
    public static notice({ path, name, comment }: Imessage): void {
        console.log('');
        console.log('> type: \x1b[34mnotice\x1b[0m');
        comment ? console.log(`> notice: ${comment}`) : null;
        name ? console.log(`> name: ${name}`) : null;
        path ? console.log(`> path: ${path}`) : null;
        console.log('');
    }

    /**
     * Displays a warning message with optional details.
     *
     * @param options - The warning message options
     * @param options.path - Optional. The file path associated with the warning
     * @param options.name - Optional. The name associated with the warning
     * @param options.comment - Optional. The main content of the warning message
     * @returns void
     */
    public static warn({ path, name, comment }: Imessage): void {
        console.log('');
        console.log('> type: \x1b[33mwarn\x1b[0m');
        comment ? console.log(`> warn: ${comment}`) : null;
        name ? console.log(`> name: ${name}`) : null;
        path ? console.log(`> path: ${path}`) : null;
        console.log('');
    }
}
