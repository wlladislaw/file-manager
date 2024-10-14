import os from 'os';

export const getEol = () => {
    console.log('end of line - ', JSON.stringify(os.EOL));
};
