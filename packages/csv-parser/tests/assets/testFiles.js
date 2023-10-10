import  { globSync} from 'glob';

export const filesWithHeaders = () => {
    const files = globSync("./tests/fixtures/headers/*.csv");
    return files.map((file) => {
        return {
            description: `file: ${file}`,
            input: file,
            separator: ",",
            excepted: {
                csv: "",
                header: 1,
            },
        };
    });
}

export const filesWithoutHeaders = () => {
    const files = globSync("./tests/fixtures/noheaders/*.csv");
    return files.map((file) => {
        return {
            description: `file: ${file}`,
            input: file,
            separator: ",",
            excepted: {
                csv: "",
                header: 0.4,
            },
        };
    });
}