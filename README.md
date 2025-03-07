ezi-cli - a tool on top of yargs for creating simple CLI

```bash
npm install ezi-cli
```

```bash
# you can choose your file name. Supported extensions: json, yaml
ezi init-ezi-cli -p ./ezi-cli.json
```

after that you will be asked to create script files, write yes.

Once the configuration file is created, you will see something like this in it:

```json
{
    "commands": {
        "test": {
            "handler": "./cli-scripts/test.js",
            "descriptions": "test ESM handler",
            "flags": {
                "your-name": {
                    "type": "string"
                }
            }
        },
        "test-commonJS": {
            "handler": "./cli-scripts/test.cjs",
            "descriptions": "test CommonJS handler",
            "flags": {
                "your-name": {
                    "type": "string"
                }
            }
        }
    }
}
```

You will also have files created:

```js
// cli-scripts/test.js
export default function (argv) {
    console.log(`your command: ${argv._}`);
    console.log(`your flag: ${argv['your-name']}`);
}
```

you can use the command to run

```bash
ezi test --your-name john
```

After that you can simply add new commands and scripts, the scripts will receive argv from the yargs library. Just make the default export anonymous function in the scripts please
