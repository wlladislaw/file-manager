import fs from 'fs';
import path from 'path';
export const copyFile = async (filePath, destDir) => {
    try {
        const resPath = path.join(destDir, path.basename(filePath));

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(resPath);
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            console.log(`file copied to '${destDir}'`);
        });
        readStream.on('error', (err) => {
            console.log('Operation failed', err.message);
        });
    } catch (err) {
        console.log('Operation failed', err.message);
    }
};
