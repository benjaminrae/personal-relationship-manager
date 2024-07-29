import { CreateRelationshipDTO } from '../../../application/dtos/create-relationship.dto';
import { RelationshipType } from '../../../domain/relationship.type';

export class CreateRelationshipRequest {
    public type: RelationshipType;
    public name: string;
    public email: string;
    public phone: string;
    public contactMethods: string[];

    public toDto(): CreateRelationshipDTO {
        return new CreateRelationshipDTO({
            type: this.type,
            name: this.name,
            email: this.email,
            phone: this.phone,
            contactMethods: this.contactMethods,
        });
    }
}
