import { UUID } from 'angular2-uuid';

export enum STATUS {
    Online,
    Offline
}

export class Printer {
    id: string;
    name: string;
    status: STATUS;
    ipAddress: string;
    description: string;
    color: string;

    constructor(init?: Partial<Printer>) {
        Object.assign(this, init);
        this.id = UUID.UUID();
    }

    static eql(fPrinter, sPrinter): boolean {
        return (fPrinter.name === sPrinter.name &&
            fPrinter.status === sPrinter.status &&
            fPrinter.ipAddress === sPrinter.ipAddress &&
            fPrinter.color === sPrinter.color &&
            fPrinter.description === sPrinter.description);
    }
}
