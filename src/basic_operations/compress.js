import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
export const compress = async (currPath, newPath) => {
    const br = createBrotliCompress();
    const input = createReadStream(currPath, { encoding: 'utf-8' });
    const res = createWriteStream(newPath);
    input.pipe(br).pipe(res);
    res.on('finish', () => {
        console.log('file compressed!');
    });
    br.on('error', (err) => {
        console.error(`error compression: ${err.message}`);
    });
};
