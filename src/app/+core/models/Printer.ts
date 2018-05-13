import { UUID } from 'angular2-uuid';

export class Printer {
    id: string;
    name: string;
    status: string;
    ipAddress: string;
    description: string;
    color: string;

    constructor(init?: Partial<Printer>) {
        Object.assign(this, init);
        this.id = UUID.UUID();
    }
}
