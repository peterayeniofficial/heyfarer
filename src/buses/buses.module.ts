import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/buses.entity';
import { Trip } from './entities/trip.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus, Trip, Event])],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
