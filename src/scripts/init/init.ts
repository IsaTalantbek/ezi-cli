import fs from 'fs-extra';
import readline from 'readline';
import { FileExtension } from '../../util/file.extension.js';
import yaml from 'yaml';
import { fileURLToPath } from 'url';
import path from 'path';
import { SyncConfigs } from '../sync/sync.js';
import { Message } from '../../util/message.js';

export class InitConfig {
    path: string = './ezi-cli.json';
    test: boolean = true;

    constructor(path: string) {
        this.path = path;
    }

    public async handler(): Promise<void> {
        this.test = await this.inputCreateTest();
        this.configFile();
        this.test ? this.testScripts() : null;
        SyncConfigs.use();
    }

    private configFile(): void {
        try {
            const rawData = fs.readFileSync('./package.json', 'utf-8');

            const packageJson = JSON.parse(rawData);

            const config = {
                commands: this.test
                    ? {
                          test: {
                              handler: './cli-scripts/test.js',
                              description: 'test ESM handler',
                              flags: {
                                  'your-name': {
                                      type: 'string'
                                  }
                              }
                          },
                          'test-commonJS': {
                              handler: './cli-scripts/test.cjs',
                              description: 'test CommonJS handler',
                              flags: {
                                  'your-name': {
                                      type: 'string'
                                  }
                              }
                          }
                      }
                    : {}
            };

            const data =
                FileExtension.get(this.path) === 'json'
                    ? JSON.stringify(config, null, 2)
                    : yaml.stringify(config);
            if (!packageJson.config) {
                packageJson.config = {}; // Если config нет, создаем его
            }
            packageJson.config['ezi-cli-path'] = this.path;
            fs.writeFileSync(
                './package.json',
                JSON.stringify(packageJson, null, 2)
            );
            fs.writeFile(this.path, data);
        } catch (error) {
            Message.error({
                error: error,
                comment:
                    'when trying to create a configuration file, and also add the path to it in package.json/config.ezi-cli-path'
            });
        }
    }

    private testScripts(): void {
        const currentFilePath = fileURLToPath(import.meta.url);
        const src = path.join(
            path.dirname(currentFilePath),
            '../../samples/cli-scripts'
        );

        fs.copy(src, './cli-scripts');
    }

    private async inputCreateTest(): Promise<boolean> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question('create test scripts (yes): ', (input) => {
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
