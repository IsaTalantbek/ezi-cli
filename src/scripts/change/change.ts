import { PackageJson } from '../../config/package.json/read.js';

export class ChangeHandler {
    public static use(argv: any) {
        const { path } = argv;
        const packageJson = PackageJson.read();
        packageJson.config['ezi-cli-path'] = path;
        PackageJson.write(packageJson);
    }
}
