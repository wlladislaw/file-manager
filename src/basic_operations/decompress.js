import { createReadStream, createWriteStream, existsSync } from 'fs';
import { createBrotliCompress } from 'zlib';
export const decompress = async (currPath, newPath) => {
    const br = createBrotliCompress();

    if (!existsSync(currPath)) {
        console.log('Compress archive for decompress func!!!');
        return;
    }
    const input = createReadStream(currPath);

    input.on('error', (error) => {
        console.error(error.message);
    });
    const res = createWriteStream(newPath, { encoding: 'utf-8' });

    input.pipe(br).pipe(res);
    res.on('finish', () => {
        console.log('file decompressed in current directory');
    });
};
