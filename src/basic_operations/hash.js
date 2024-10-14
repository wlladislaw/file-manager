import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export const hash = (file) => {
    const hash = createHash('sha256');
    const input = createReadStream(file);

    input.on('readable', () => {
        const data = input.read();

        if (data) hash.update(data);
        else {
            console.log(`Hash hex - ${hash.digest('hex')}`);
        }
    });
};
