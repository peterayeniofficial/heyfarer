import { Test, TestingModule } from '@nestjs/testing';
import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { BusesModule } from '../../src/buses/buses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateBusDto } from 'src/buses/dto/create-bus.dto';

describe('[Feature] Buses - /v1/buses (e2e)', () => {
  const bus = {
    numberPlate: 'JKL 345 AA',
    manufacturer: 'Toyota',
    model: 'Hiace',
    year: '2018',
    capacity: 18,
  };

  const expectedPartialBus = jasmine.objectContaining({
    ...bus,
  });

  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BusesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/v1/buses')
      .send(bus as CreateBusDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialBus);
      });
  });
  it('Get all [GET /]', () => {
    return request(httpServer)
      .get('/v1/buses')
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedPartialBus);
      });
  });
  it('Get one [GET /:id]', () => {
    return request(httpServer)
      .get('/v1/buses/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedPartialBus);
      });
  });
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
