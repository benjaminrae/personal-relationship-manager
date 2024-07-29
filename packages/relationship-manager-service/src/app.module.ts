import { Module } from '@nestjs/common';
import { RelationshipsModule } from './relationships/infrastructure/di/relationships.module';

@Module({
    imports: [RelationshipsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
