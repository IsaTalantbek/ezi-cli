ezi-cli - a tool on top of yargs for creating simple CLI

After installation you will be prompted to initialize the cli:

```bash
execute initialization command? (yes): yes
```

If you did not agree, you can initialize the CLI using:

```bash
# you can choose your file name. Supported extensions: json, yaml
$ ezi init-cli -p ./ezi-cli.json
create test scripts (yes): yes
```

after that you will be asked to create script files, write yes.

Once the configuration file is created, you will see something like this in it:

```json
{
    "scripts-path": "./cli-scripts",
    "commands": {
        "test": {
            "handler": "test-cli.js",
            "description": "test ESM handler",
            "flags": {
                "your-name": {
                    "alias": "n",
                    "type": "string",
                    "description": "your-name",
                    "default": "NaN"
                }
            }
        },
        "test-commonJS": {
            "handler": "test-cli.cjs",
            "description": "test CommonJS handler",
            "flags": {
                "your-name": {
                    "alias": "n",
                    "type": "string",
                    "description": "your-name",
                    "default": "NaN"
                }
            }
        }
    }
}
```

You will also have files created:

```js
// cli-scripts/test-cli.js
export default function (argv) {
    console.log(`your command: ${argv._}`);
    console.log(`your flag: ${argv['your-name']}`);
}
```

you can use the command to run

```bash
$ ezi test -n john

your command: test
your flag: john
```

If you want to change the path to your configuration file or change its name:

```bash
$ ezi change-cli [path-to-config]
```

After that you can simply add new commands and scripts, the scripts will receive argv from the yargs library. Just make the default export function in the scripts
