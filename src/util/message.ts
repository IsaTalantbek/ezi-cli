interface Isample {
    type: string;
    path?: string;
    name?: string;
    comment?: string;
}

export class Message {
    public static sample({ type, path, name, comment }: Isample): void {
        console.log('');
        if (type === 'error') {
            type ? console.error(`> type: ${type}`) : null;
            path ? console.error(`> path: ${path}`) : null;
            name ? console.error(`> name: ${name}`) : null;
            comment ? console.error(`> comment: ${comment}`) : null;
            console.log('');
            process.exit(1);
        } else {
            type ? console.log(`> type: ${type}`) : null;
            path ? console.log(`> path: ${path}`) : null;
            name ? console.log(`> name: ${name}`) : null;
            comment ? console.log(`> comment: ${comment}`) : null;
            console.log('');
        }
    }
}
