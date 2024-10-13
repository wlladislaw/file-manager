import { resolve, dirname } from 'path';
import { lstat } from 'fs/promises';
import { homedir } from 'os';
import { list } from './basic_operations/list.js';
import { validateArgs } from './validators/validateArgs.js';
import { printDir } from './loggers/printDir.js';

const parentDirectory = homedir();
let currentDirectory = homedir();

const changeDir = async (nextDir) => {
    const fullPath = resolve(currentDirectory, nextDir);
    try {
        const stats = await lstat(fullPath);

        if (stats.isDirectory()) {
            currentDirectory = fullPath;
        } else {
            console.log('Operation failed');
        }
    } catch {
        console.log('Operation failed');
    }
};

const uppDir = () => {
    if (parentDirectory === currentDirectory) {
        console.log('You are alredy in home dir!');
    } else {
        const dir = dirname(currentDirectory);

        currentDirectory = dir;
    }
};
const controllerMap = {
    ls: {
        exec: () => list(currentDirectory),
        args: 0,
    },
    up: {
        exec: uppDir,
        args: 0,
    },
    cd: {
        exec: async (dir) => await changeDir(dir),
        args: 1,
    },
};

export const controller = async (input) => {
    const [operation, ...args] = input.trim().split(' ');

    if (controllerMap[operation]) {
        const { exec, args: expectedArgs } = controllerMap[operation];

        if (!validateArgs(expectedArgs, args)) return;

        try {
            await exec(...args);

            printDir(currentDirectory);
        } catch (error) {
            console.log('Operation failed', error.message);
        }
    } else {
        console.log('Invalid input');
    }
};
