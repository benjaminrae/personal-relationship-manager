import { ID } from '../../shared/id';

export class Relationship {
    private type: string;
    private contactMethods: string[];
    private email: string;
    private name: string;
    private phone: string;

    public constructor(
        id: ID,
        {
            type,
            contactMethods,
            email,
            name,
            phone,
        }: {
            type: string;
            name: string;
            email: string;
            phone: string;
            contactMethods: string[];
        },
    ) {
        this.type = type;
        this.contactMethods = contactMethods;
        this.email = email;
        this.name = name;
        this.phone = phone;
    }
}
