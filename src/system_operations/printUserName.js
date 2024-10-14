import os from 'os';
export const printUserName = () => {
    console.log('User - ', os.userInfo().username);
};
