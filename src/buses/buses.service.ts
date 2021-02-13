import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  findAll() {
    return this.buses;
  }

  findOne(id: string) {
    const bus = this.buses.find((bus) => bus.id === +id);
    if (!bus) {
      throw new NotFoundException(`Bus #${id} not found`);
    }
    return bus;
  }

  create(createBussDto: any) {
    this.buses.push(createBussDto);
    return createBussDto;
  }

  update(id: string, updateBussDto: any) {
    const existingBuss = this.findOne(id);
    if (existingBuss) {
      // update the existing bus
    }
  }

  remove(id: string) {
    const busIndex = this.buses.findIndex((bus) => bus.id === +id);
    if (busIndex >= 0) {
      this.buses.splice(busIndex, 1);
    }
  }
}
