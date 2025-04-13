import { PackageJson } from '../../config/package.json.js';
import { SampleHandler } from '../sample.js';

export interface ChangeHandlerArgs {
    'config-file-path': string;
}

export class ChangeHandler extends SampleHandler<ChangeHandlerArgs> {
    public async use() {
        const packageJson = PackageJson.read();
        packageJson.config['ezi-cli-path'] = this.args.configFilePath;
        PackageJson.write(packageJson);
    }
}
