import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('Relationships (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('user should be able to create a relationship', () => {
        return request(app.getHttpServer())
            .post('/relationships')
            .send({
                type: 'friend',
                name: 'John Doe',
                email: 'john.doe@gmail.com',
                phone: '1234567890',
                contactMethods: ['WhatsApp', 'Facebook'],
            })
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty('id');
                expect(res.body.id).not.toBeNull();
            });

        // request(app.getHttpServer()).get('/relationships/ID').expect(200);
    });
});
