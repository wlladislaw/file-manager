export const validateArgs = (expectedArgs, args) => {
    if (args.length < expectedArgs) {
        console.log('Expected more arguments');
        return false;
    }
    return true;
};
