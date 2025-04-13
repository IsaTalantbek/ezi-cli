import fs from 'fs';
import { createInterface } from 'readline';
import { InitHandler } from '../init/init.js';

class Postinstall {
    public async syncConfigs(): Promise<void> {
        const rawData = fs.readFileSync('package.json', 'utf-8');
        const packageJson = JSON.parse(rawData);
        if (packageJson?.config) {
            if (packageJson.config['ezi-cli-path']) {
                process.exit(1);
            }
        }
        const init = await this.inputInitCLI();
        if (init) {
            await new InitHandler({
                _: ['postinstall'],
                $0: 'ezi',
                'config-file-path': './ezi-cli.json',
                configFilePath: './ezi-cli.json'
            }).use();
        }
    }
    private async inputInitCLI(): Promise<boolean> {
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

(async () => {
    const postinstall = new Postinstall();
    await postinstall.syncConfigs();
})();
