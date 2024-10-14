import fs from 'fs';
export const rename = async (old, newName) => {
    try {
        if (!fs.existsSync(old) || fs.existsSync(newName)) {
            throw new Error('FS operation failed');
        }
        await fs.promises.rename(old, newName);
        console.log('File renamed in current dir ');
    } catch (err) {
        console.log('Operation failed', err.message);
    }
};
