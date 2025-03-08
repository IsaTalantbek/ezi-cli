import fs from 'fs';
import { Message } from '../../util/message.js';

export class PackageJson {
    public static read() {
        return JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    }
    public static write(packageJson: any): void {
        fs.writeFileSync(
            './package.json',
            JSON.stringify(packageJson, null, 4)
        );
    }
    public static getEziCliPath(error: boolean): string | null {
        const packageJson = PackageJson.read();
        if (packageJson?.config?.['ezi-cli-path']) {
            return packageJson.config['ezi-cli-path'];
        } else {
            if (error) {
                Message.error({
                    error: 'package.json/config.ezi-cli-path is not exist'
                });
            }
            return null;
        }
    }
}
