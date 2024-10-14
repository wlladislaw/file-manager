export const validateArgs = (expectedArgs, args) => {
    if (args.length < expectedArgs) {
        console.log('Invalid input');
        return false;
    }
    return true;
};
