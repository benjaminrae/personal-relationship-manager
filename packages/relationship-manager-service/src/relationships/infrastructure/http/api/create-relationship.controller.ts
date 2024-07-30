import { Controller, Post } from '@nestjs/common';
import { ID } from '../../../../shared/id';
import { Result } from '../../../../shared/result';
import { CreateRelationshipDTO } from '../../../application/dtos/create-relationship.dto';
import { UseCase } from '../../../../shared/use-case';
import { CreateRelationshipRequest } from './create-relationship.request';
import { RelationshipCouldNotBeCreatedResponse } from './relationship-could-not-be-created.response';

@Controller('relationships')
export class CreateRelationshipController {
    public constructor(private readonly useCase: UseCase<CreateRelationshipDTO, Result<ID>>) {}

    @Post()
    async create(request: CreateRelationshipRequest) {
        const idResult = await this.useCase.execute(request.toDto());

        if (idResult.isFailure()) {
            throw RelationshipCouldNotBeCreatedResponse.withError(idResult.error());
        }

        return { id: idResult.value() };
    }
}
