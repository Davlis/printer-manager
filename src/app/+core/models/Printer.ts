import uuidv4 from 'uuidv4';

export class Printer {
    id: string;
    name: string;
    status: string;
    ipAddress: string;
    description: string;
    color: string;

    constructor(init?: Partial<Printer>) {
        Object.assign(this, init);
        this.id = uuidv4();
    }
}
