import fs from 'fs-extra';
import { createInterface } from 'readline';
import { FileExtension } from '../../util/file.extension.js';
import yaml from 'yaml';
import { fileURLToPath } from 'url';
import path from 'path';
import { PackageJson } from '../../config/package.json.js';
import ezcl from 'ezi-console';
import { SampleHandler } from '../sample.js';

export interface InitHandlerArgs {
    'config-file-path': string;
}

export class InitHandler extends SampleHandler<InitHandlerArgs> {
    path: string = this.args.configFilePath;
    test: boolean = true;

    public async use(): Promise<void> {
        this.test = await this.inputCreateTest();
        this.configFile();
        this.test ? this.testScripts() : null;
    }

    private configFile(): void {
        try {
            const config = {
                'scripts-path': './cli-scripts',
                commands: this.test
                    ? {
                          test: {
                              handler: 'test-cli.js',
                              description: 'test ESM handler',
                              flags: {
                                  'your-name': {
                                      alias: 'n',
                                      type: 'string',
                                      description: 'your-name',
                                      default: 'NaN'
                                  }
                              }
                          },
                          'test-commonJS': {
                              handler: 'test-cli.cjs',
                              description: 'test CommonJS handler',
                              flags: {
                                  'your-name': {
                                      alias: 'n',
                                      type: 'string',
                                      description: 'your-name',
                                      default: 'NaN'
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
            fs.writeFileSync(this.path, data);

            const packageJson = PackageJson.read();

            if (!packageJson.config) {
                packageJson.config = {}; // Если config нет, создаем его
            }
            packageJson.config['ezi-cli-path'] = this.path;

            PackageJson.write(packageJson);
        } catch (error: Error | any) {
            ezcl.error({
                error: error,
                comment:
                    'when trying to create a configuration file, and also add the path to it in package.json/config.ezi-cli-path',
                exit: true
            });
        }
    }

    private testScripts(): void {
        const currentFilePath = fileURLToPath(import.meta.url);
        const src = path.join(
            path.dirname(currentFilePath),
            '../../samples/cli-scripts'
        );

        fs.copySync(src, './cli-scripts');
    }

    private async inputCreateTest(): Promise<boolean> {
        const rl = createInterface({
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
