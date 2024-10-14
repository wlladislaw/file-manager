import fs from 'fs';
export const read = async (filePath) => {
    try {
        const stream = fs.createReadStream(filePath, 'utf8');
        stream.on('readable', () => {
            const res = stream.read();
            if (res !== null) process.stdout.write(res);
        });
        stream.on('end', () => {
            console.log('\n');
        });
        stream.on('error', () => {
            console.log('Operation failed while read');
        });
    } catch (error) {
        console.log('Operation failed', error.message);
    }
};
