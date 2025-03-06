import path from 'path';

export class FileExtension {
    public static get(filename: string): string {
        return path.extname(filename).slice(1);
    }
}
