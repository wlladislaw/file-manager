import { promises as fs } from 'fs';

export const rename = async (old, newName) => {
    try {
        await fs.stat(old);

        try {
            await fs.stat(newName);
            throw new Error('FS operation failed: name already exists');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.rename(old, newName);
        console.log('file renamed in current dir ');
    } catch (err) {
        console.log('Operation failed:', err.message);
    }
};
