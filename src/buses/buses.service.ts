import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Bus } from './entities/buses.entity';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
    private readonly connection: Connection,
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

  async recommendBus(bus: Bus) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      bus.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_bus';
      recommendEvent.type = 'bus';
      recommendEvent.payload = { busId: bus.id };

      await queryRunner.manager.save(bus);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
