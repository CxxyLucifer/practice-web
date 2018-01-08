import config from './config.json';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import { exec } from 'child_process';

let filePath = path.resolve(__dirname);

fs.readdir(filePath, (err, files) => {
    if (err) {
        console.log(colors.red(err));
        return;
    }
    files.forEach((filename) => {
        if (filename.startsWith('genesis.dll') && filename.endsWith('.json')) {
            filename = filename.split('.json')[0];
            exec(`sed -i '' 's/${config.dll_filename}/${filename}/g' ${__dirname}/config.json`,
                (error, stdout, stderr) => {
                    console.log(colors.yellow(stdout));
                    error && console.log(colors.red(`stdout: ${error}`));
                    stderr && console.log(colors.red(`stderr: ${stderr}`));
                }
            );
        }
    });
});
