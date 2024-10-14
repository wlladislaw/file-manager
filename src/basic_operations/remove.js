import fs from 'fs';
export const remove = async (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error('FS operation failed');
        }
        await fs.promises.rm(filePath);
        console.log('File deleted!');
    } catch (error) {
        console.error(error.message);
    }
};
