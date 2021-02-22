import { Test, TestingModule } from '@nestjs/testing';
import { BusesService } from './buses.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bus } from './entities/buses.entity';
import { Trip } from './entities/trip.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('BusesService', () => {
  let service: BusesService;
  let busRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Trip), useValue: createMockRepository() },
        { provide: getRepositoryToken(Bus), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<BusesService>(BusesService);
    busRepository = module.get<MockRepository>(getRepositoryToken(Bus));
    //to get request or transient scope
    // service = await module.resolve(BusesService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when bus with ID exists', () => {
      it('should return the bus object', async () => {
        const busId = '1';
        const expectedBus = {};

        busRepository.findOne.mockReturnValue(expectedBus);
        const bus = await service.findOne(busId);
        expect(bus).toEqual(expectedBus);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async (done) => {
        const busId = '1';
        busRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(busId);
          done();
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Bus #${busId} not found`);
        }
      });
    });
  });
});
