import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { stat } from 'fs/promises';

export const decompress = async (currPath, newPath) => {
    const br = createBrotliCompress();

    try {
        await stat(currPath);
    } catch (error) {
        console.log('Compress archive for decompress func!!!');
        return;
    }

    const input = createReadStream(currPath);
    const res = createWriteStream(newPath, { encoding: 'utf-8' });

    try {
        await pipeline(input, br, res);
        console.log('file decompressed in current directory');
    } catch (error) {
        console.error('Error during decompression:', error.message);
    }
};
