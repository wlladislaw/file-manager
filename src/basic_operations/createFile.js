import fs from 'fs';
export const createFile = async (filePath) => {
    try {
        await fs.promises.writeFile(filePath, '', () => {
            console.log(`File created successfully`);
        });
    } catch (err) {
        console.log('Operation failed', err.message);
    }
};
