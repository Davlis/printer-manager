import uuidv4 from 'uuidv4';

export class Printer {
    id: string;
    name: string;
    status: string;
    ipAddress: string;
    Description: string;
    Color: string;

    constructor() {
        this.id = uuidv4();
    }
}
