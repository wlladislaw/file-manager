import { readdir } from 'fs/promises';

import { logFiles } from '../loggers/filesLogger.js';

export const list = async (currentDirectory) => {
    try {
        const files = await readdir(currentDirectory, { withFileTypes: true });
        logFiles(files);
    } catch {
        console.log('Operation failed');
    }
};
