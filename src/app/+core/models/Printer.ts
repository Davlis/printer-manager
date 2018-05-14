import { UUID } from 'angular2-uuid';

export enum STATUS {
    ONLINE = 'Online',
    OFFLINE = 'Offline'
}

export enum TYPE {
    NEEDLE = 'Needle',
    INKJET = 'InkJet',
    LASER = 'Laser'
}

export class Printer {
    id: string;
    name: string;
    status: STATUS;
    ipAddress: string;
    description: string;
    color: string;
    type: TYPE;

    constructor(init?: Partial<Printer>) {
        Object.assign(this, init);
        this.id = UUID.UUID();
    }

    static get types () {
        return TYPE;
    }

    static get statuses() {
        return STATUS;
    }

    static eql(fPrinter, sPrinter): boolean {
        return (fPrinter.name === sPrinter.name &&
            fPrinter.status === sPrinter.status &&
            fPrinter.ipAddress === sPrinter.ipAddress &&
            fPrinter.color === sPrinter.color &&
            fPrinter.description === sPrinter.description &&
            fPrinter.type === sPrinter.type);
    }
}
