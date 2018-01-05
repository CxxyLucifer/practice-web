import project_package from '../package.json';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import { exec } from 'child_process';

let filePath = path.resolve(__dirname);

fs.readdir(filePath, function (err, files) {
    if (err) {
        console.log(colors.red(err));
        return;
    }
    files.forEach(function (filename) {
        if (filename.startsWith('genesis.dll') && filename.endsWith('.json')) {
            exec(`sed -i '' 's/${project_package.dll}/${filename}/g' ${__dirname}/../package.json`,
                function (err, out) {
                    console.log(colors.yellow(out));
                    err && console.log(colors.red(err));
                }
            );
        }
    });
});
