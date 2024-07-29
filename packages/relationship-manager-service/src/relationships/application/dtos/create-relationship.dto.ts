import { Relationship } from '../../domain/relationship';
import { RelationshipType } from '../../domain/relationship.type';
import { ID } from '../../../shared/id';

export class CreateRelationshipDTO {
    private type: RelationshipType;
    private name: string;
    private email: string;
    private phone: string;
    private contactMethods: string[];

    public constructor({
        type,
        contactMethods,
        email,
        name,
        phone,
    }: {
        type: RelationshipType;
        name: string;
        email: string;
        phone: string;
        contactMethods: string[];
    }) {
        this.type = type;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.contactMethods = contactMethods;
    }

    toRelationship(id: ID): Relationship {
        return new Relationship(id, {
            type: this.type,
            name: this.name,
            email: this.email,
            phone: this.phone,
            contactMethods: this.contactMethods,
        });
    }
}
