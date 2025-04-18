import ezcl from 'ezi-console';
import fs from 'fs';

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
    public static getEziCliPath(error: boolean | undefined): string | null {
        const packageJson = PackageJson.read();
        if (packageJson?.config?.['ezi-cli-path']) {
            return packageJson.config['ezi-cli-path'];
        } else {
            if (error) {
                ezcl.error({
                    error: 'package.json/config.ezi-cli-path is not exist',
                    exit: true
                });
            }
            return null;
        }
    }
}
