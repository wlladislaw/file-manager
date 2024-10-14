import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';

export const compress = async (currPath, newPath) => {
    const br = createBrotliCompress();
    const input = createReadStream(currPath, { encoding: 'utf-8' });
    const res = createWriteStream(newPath);

    try {
        await pipeline(input, br, res);
        console.log('file compressed!');
    } catch (err) {
        console.error(`Error during compression: ${err.message}`);
    }
};
