import os from 'os';
import { controller } from './controller.js';
import { greeting } from './loggers/greeting.js';
import { printDir } from './loggers/printDir.js';
import { printExit } from './loggers/printExit.js';

const args = process.argv;
const lastArg = args.find((el) => {
    if (el.startsWith('--user')) {
        return el;
    }
});
const userName = lastArg.split('=')[1];

greeting(userName);

const homedir = os.homedir();

printDir(homedir);

process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
    if (input.trim() === '.exit') {
        printExit(userName);
        process.exit(1);
    }

    controller(input.toString());
});

process.on('SIGINT', function () {
    printExit(userName);
    process.exit();
});
