import project_package from '../package.json';
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
            exec(`sed -i '' 's/${project_package.dll}/${filename}/g' ${__dirname}/../package.json`,
                (error, stdout, stderr) => {
                    console.log(colors.yellow(stdout));
                    error && console.log(colors.red(`stdout: ${error}`));
                    stderr && console.log(colors.red(`stderr: ${stderr}`));
                }
            );
        }
    });
});
