import { promises as fs } from 'fs';

export const remove = async (filePath) => {
    try {
        await fs.stat(filePath);
        await fs.rm(filePath);
        console.log('file deleted!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('FS operation failed: file does not exist');
        } else {
            console.error('Operation failed:', error.message);
        }
    }
};
