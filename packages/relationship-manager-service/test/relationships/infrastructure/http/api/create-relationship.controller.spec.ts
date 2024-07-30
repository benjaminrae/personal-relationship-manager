import { CreateRelationshipController } from '../../../../../src/relationships/infrastructure/http/api/create-relationship.controller';
import { UseCase } from '../../../../../src/shared/use-case';
import { Result } from '../../../../../src/shared/result';
import { ID } from '../../../../../src/shared/id';
import { CreateRelationshipDTO } from '../../../../../src/relationships/application/dtos/create-relationship.dto';
import { CreateRelationshipRequest } from '../../../../../src/relationships/infrastructure/http/api/create-relationship.request';
import { RelationshipCouldNotBeCreatedError } from '../../../../../src/relationships/domain/relationship-could-not-be-created.error';

describe('create-relationship-controller', () => {
    let execute: jest.Mock;
    let useCase: UseCase<CreateRelationshipDTO, Result<ID>>;

    let controller: CreateRelationshipController;
    beforeEach(() => {
        execute = jest.fn();
        useCase = {
            execute,
        };
        controller = new CreateRelationshipController(useCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should respond with the id of the created relationship', async () => {
        const id = crypto.randomUUID();
        execute.mockResolvedValue(Result.ok(id));
        const request = new CreateRelationshipRequest();

        const response = await controller.create(request);

        expect(response).toEqual({ id: id });
    });

    it('should respond with a RelationshipCouldNotBeCreatedResponse when the relationship could not be created', async () => {
        execute.mockResolvedValue(Result.fail(new RelationshipCouldNotBeCreatedError()));
        const request = new CreateRelationshipRequest();

        expect(() => controller.create(request)).rejects.toThrowError();
    });
});
