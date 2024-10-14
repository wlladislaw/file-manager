import os from 'os';
export const getCPUs = () => {
    console.log('CPUs - ', os.cpus());
};
