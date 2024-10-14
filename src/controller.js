import path, { resolve, dirname } from 'path';
import { lstat } from 'fs/promises';
import { homedir } from 'os';
import { list } from './basic_operations/list.js';
import { validateArgs } from './validators/validateArgs.js';
import { printDir } from './loggers/printDir.js';
import { getEol } from './system_operations/getEol.js';
import { printHomeDir } from './system_operations/printHomeDir.js';
import { createFile } from './basic_operations/createFile.js';
import { printUserName } from './system_operations/printUserName.js';
import { getCPUs } from './system_operations/getCPUs.js';
import { printArchitecture } from './system_operations/printArchitecture.js';
import { rename } from './basic_operations/rename.js';
import { remove } from './basic_operations/remove.js';
import { read } from './basic_operations/read.js';
import { copyFile } from './basic_operations/copyFile.js';
import { moveFile } from './basic_operations/moveFile.js';
import { hash } from './basic_operations/hash.js';
import { decompress } from './basic_operations/decompress.js';
import { compress } from './basic_operations/compress.js';

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

    add: {
        exec: async (fileName) => {
            const filePath = path.join(currentDirectory, fileName);
            await createFile(filePath);
        },
        args: 1,
    },
    rn: {
        exec: async (oldName, newName) => {
            const oldFilePath = path.join(currentDirectory, oldName);
            const newFilePath = path.join(currentDirectory, newName);

            await rename(oldFilePath, newFilePath);
        },
        args: 2,
    },
    rm: {
        exec: async (file) => {
            const pathFile = path.join(currentDirectory, file);
            await remove(pathFile);
        },
        args: 1,
    },
    cat: {
        exec: async (file) => {
            const pathFile = path.join(currentDirectory, file);
            await read(pathFile);
        },
        args: 1,
    },
    cp: {
        exec: async (srcPath, destDir) => {
            const pathFile = path.join(currentDirectory, srcPath);
            const pathNewDir = path.join(currentDirectory, destDir);
            await copyFile(pathFile, pathNewDir);
        },
        args: 2,
    },
    mv: {
        exec: async (srcPath, destDir) => {
            const pathFile = path.join(currentDirectory, srcPath);
            const pathNewDir = path.join(currentDirectory, destDir);
            await moveFile(pathFile, pathNewDir);
        },
        args: 2,
    },
    hash: {
        exec: (file) => {
            const pathFile = path.join(currentDirectory, file);
            hash(pathFile);
        },
        args: 1,
    },
    compress: {
        exec: async (srcPath, destDir) => {
            const pathFile = path.join(currentDirectory, srcPath);
            const pathNew = path.join(currentDirectory, destDir);
            await compress(pathFile, pathNew);
        },
        args: 2,
    },
    decompress: {
        exec: async (srcPath, destDir) => {
            const pathFile = path.join(currentDirectory, srcPath);
            const pathNew = path.join(currentDirectory, destDir);
            await decompress(pathFile, pathNew);
        },
        args: 2,
    },

    os: {
        '--username': { exec: printUserName, args: 0 },
        '--EOL': { exec: getEol, args: 0 },
        '--cpus': { exec: getCPUs, args: 0 },
        '--homedir': { exec: printHomeDir, args: 0 },
        '--architecture': { exec: printArchitecture, args: 0 },
    },
};

export const controller = async (input) => {
    const [mainCommand, ...args] = input.trim().split(' ');

    if (mainCommand === 'os') {
        const subCommand = args[0];

        const osCommand = controllerMap.os[subCommand];
        if (osCommand) {
            osCommand.exec();
        } else {
            console.log('Invalid os sub command!');
        }
    } else if (controllerMap[mainCommand]) {
        const { exec, args: expectedArgs } = controllerMap[mainCommand];

        if (!validateArgs(expectedArgs, args)) return;

        try {
            await exec(...args);
        } catch (error) {
            console.log('Operation failed', error.message);
        } finally {
            printDir(currentDirectory);
        }
    } else {
        console.log('Invalid input');
    }
};
