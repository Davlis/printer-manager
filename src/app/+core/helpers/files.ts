export {
    readJSON,
    extractFileFromDOMEvent
};

const readAsTextFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = (e) => resolve(reader.result);
        reader.onerror = () => reject('Error occured while reading file');
        reader.readAsText(file);
    });
};

const readJSON = async (file) => {
    if (!file) {
        throw new Error('File cannot be null or undefined');
    }
    if (file.type !== 'application/json') {
        throw new Error('No application/json type');
    }
    const textFile = await readAsTextFile(file);
    return JSON.parse(<string>textFile);
};

const extractFileFromDOMEvent = ($event) => {
    if (!$event) {
        throw new Error('DOM event cannot be null or undefined');
    }
    return $event.target.files[0];
};
