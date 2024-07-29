import { CreateRelationshipDTO } from '../dtos/create-relationship.dto';
import { UseCase } from '../../../shared/use-case';
import { Result } from '../../../shared/result';
import { ID } from '../../../shared/id';
import { RelationshipRepository } from '../../domain/relationship.repository';
import { UUIDGenerator } from '../../../shared/uuid-generator.service';
import { CouldNotSaveRelationshipError } from '../../../../test/relationships/domain/could-not-save-relationship.error';

export class CreateRelationshipUseCase implements UseCase<CreateRelationshipDTO, Result<ID>> {
    public constructor(
        private readonly relationshipRepository: RelationshipRepository,
        private readonly uuidGenerator: UUIDGenerator,
    ) {}

    async execute(input: CreateRelationshipDTO): Promise<Result<ID>> {
        const id = this.uuidGenerator.generate();

        try {
            await this.relationshipRepository.create(input.toRelationship(id));
        } catch (error) {
            return Result.fail(CouldNotSaveRelationshipError.withError(error));
        }

        return Result.ok(id);
    }
}
