export const logFiles = (files) => {
    files.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }

        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }

        return a.name.localeCompare(b.name);
    });

    const data = files.map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? 'directory' : 'file',
    }));

    console.table(data);
};
