import { Relationship } from './relationship';

export interface RelationshipRepository {
    create(relationship: Relationship): Promise<void>;
}
