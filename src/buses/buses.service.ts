import { Injectable } from '@nestjs/common';
import { Bus } from './entities/buses.entity';

@Injectable()
export class BusesService {
  private buses: Bus[] = [
    {
      id: 1,
      numberPlate: 'JKL 345 AA',
      manufacturer: 'Toyota',
      model: 'Hiace',
      year: '2018',
      capacity: 18,
    },
  ];
}
