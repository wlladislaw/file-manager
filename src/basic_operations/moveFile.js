import fs from 'fs';

import { copyFile } from './copyFile.js';
export const moveFile = async (filePath, destDir) => {
    await copyFile(filePath, destDir);
    try {
        await fs.promises.rm(filePath);
    } catch (err) {
        console.log('Operation failed', err.message);
    }
};
