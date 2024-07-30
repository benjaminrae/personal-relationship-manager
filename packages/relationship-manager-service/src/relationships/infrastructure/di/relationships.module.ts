import { Module } from '@nestjs/common';
import { CreateRelationshipController } from '../http/api/create-relationship.controller';

@Module({
    controllers: [CreateRelationshipController],
})
export class RelationshipsModule {}
