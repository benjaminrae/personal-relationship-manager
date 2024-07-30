import { CreateRelationshipUseCase } from '../../../../src/relationships/application/use-cases/create-relationship.use-case';
import { RelationshipRepository } from '../../../../src/relationships/domain/relationship.repository';
import { CreateRelationshipDTO } from '../../../../src/relationships/application/dtos/create-relationship.dto';
import { Relationship } from '../../../../src/relationships/domain/relationship';
import { UUIDGenerator } from '../../../../src/shared/uuid-generator.service';
import { RelationshipType } from '../../../../src/relationships/domain/relationship.type';
import { CouldNotSaveRelationshipError } from '../../domain/could-not-save-relationship.error';

describe('create-relationship-use-case', () => {
    let create: jest.Mock;
    let relationshipRepository: RelationshipRepository;
    let generateID: jest.Mock;
    let uuidGenerator: UUIDGenerator;
    let createRelationshipUseCase: CreateRelationshipUseCase;

    beforeEach(() => {
        create = jest.fn();
        generateID = jest.fn();
        relationshipRepository = {
            create: create,
        };
        uuidGenerator = {
            generate: generateID,
        };
        createRelationshipUseCase = new CreateRelationshipUseCase(relationshipRepository, uuidGenerator);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a relationship and save it in the database', async () => {
        const id = crypto.randomUUID();
        const johnDoe = givenFriendshipWithJohnDoe();
        const createRelationshipDTO = new CreateRelationshipDTO(johnDoe);
        generateID.mockReturnValue(id);

        const idResult = await createRelationshipUseCase.execute(createRelationshipDTO);

        expect(relationshipRepository.create).toHaveBeenCalledWith(new Relationship(id, johnDoe));
        expect(idResult.value()).toBe(id);
    });

    it('should give an error result when saving to the database fails', async () => {
        const id = crypto.randomUUID();
        const johnDoe = givenFriendshipWithJohnDoe();
        const createRelationshipDTO = new CreateRelationshipDTO(johnDoe);
        generateID.mockReturnValue(id);
        create.mockRejectedValue(new Error('Could not save relationship'));

        const errorResult = await createRelationshipUseCase.execute(createRelationshipDTO);

        expect(errorResult.isFailure()).toBe(true);
        expect(errorResult.error()).toBeInstanceOf(CouldNotSaveRelationshipError);
    });
});

const givenFriendshipWithJohnDoe = () => {
    const type: RelationshipType = 'friend';
    const name = 'John Doe';
    const email = 'john.doe@gmail.com';
    const phone = '1234567890';
    const contactMethods = ['WhatsApp', 'Telegram'];
    return {
        contactMethods,
        email,
        name,
        phone,
        type,
    };
};
