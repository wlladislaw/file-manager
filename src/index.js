import os from 'os';

const args = process.argv;
const lastArg = args.find((el) => {
    if (el.startsWith('--user')) {
        return el;
    }
});
const userName = lastArg.split('=')[1];

console.log(`Welcome to the File Manager, ${userName}!`);

const homedir = os.homedir();

console.log(`You are currently in ${homedir}`);

process.stdin.setEncoding('utf8');

process.stdin.on('data', (input) => {
    if (input.trim() === '.exit') {
        console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        process.exit(1);
    }
    console.log(`You are currently in ${homedir}`);
});

process.on('SIGINT', function () {
    console.log(`\nThank you for using File Manager, ${userName}, goodbye!`);
    process.exit();
});
