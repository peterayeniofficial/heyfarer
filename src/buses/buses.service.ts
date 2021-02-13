import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bus } from './entities/buses.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.busRepository.find({
      relations: ['trips'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const bus = await this.busRepository.findOne(id, { relations: ['trips'] });
    if (!bus) {
      throw new NotFoundException(`Bus #${id} not found`);
    }
    return bus;
  }

  create(createBussDto: CreateBusDto) {
    const bus = this.busRepository.create(createBussDto);
    return this.busRepository.save(bus);
  }

  async update(id: string, updateBussDto: UpdateBusDto) {
    const bus = await this.busRepository.preload({
      id: +id,
      ...updateBussDto,
    });
    if (!bus) {
      // update the existing bus
      throw new NotFoundException(`Bus #${id} not found`);
    }

    return this.busRepository.save(bus);
  }

  async remove(id: string) {
    const bus = await this.findOne(id);
    return this.busRepository.remove(bus);
  }
}
