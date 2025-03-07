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

    public static notice({ path, name, comment }: Imessage): void {
        console.log('');
        console.log('> type: \x1b[34mnotice\x1b[0m');
        comment ? console.log(`> notice: ${comment}`) : null;
        name ? console.log(`> name: ${name}`) : null;
        path ? console.log(`> path: ${path}`) : null;
        console.log('');
    }

    public static warn({ path, name, comment }: Imessage): void {
        console.log('');
        console.log('> type: \x1b[33mwarn\x1b[0m');
        comment ? console.log(`> warn: ${comment}`) : null;
        name ? console.log(`> name: ${name}`) : null;
        path ? console.log(`> path: ${path}`) : null;
        console.log('');
    }
}
