import fs from 'fs';
import { createInterface } from 'readline';
import { InitConfig } from '../init/init.js';

export class Postinstall {
    public static async syncConfigs(): Promise<void> {
        const rawData = fs.readFileSync('package.json', 'utf-8');
        const packageJson = JSON.parse(rawData);
        if (packageJson?.config) {
            if (packageJson.config['ezi-cli-path']) {
                process.exit(1);
            }
        }
        const init = await this.inputInitCLI();
        if (init) {
            const init = new InitConfig('./ezi-cli.json');
            await init.handler();
        }
    }
    private static async inputInitCLI(): Promise<boolean> {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('execute initialization command? (yes): ', (input) => {
                if (input.toLowerCase() === 'yes' || input === '') {
                    resolve(true);
                } else {
                    resolve(false);
                }
                rl.close();
            });
        });
    }
}

Postinstall.syncConfigs();
