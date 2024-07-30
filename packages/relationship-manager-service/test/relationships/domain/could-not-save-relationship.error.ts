import { DomainError } from '../../../src/shared/domain.error';

export class CouldNotSaveRelationshipError extends DomainError {
    static withError(error: Error) {
        return new CouldNotSaveRelationshipError(error.message);
    }
}
