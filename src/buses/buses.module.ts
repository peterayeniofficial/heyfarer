import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/buses.entity';
import { Trip } from './entities/trip.entity';
import { Event } from '../events/entities/event.entity';
// import { ConfigModule } from '@nestjs/config';
// import busesConfig from './config/buses.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus, Trip, Event]),
    // ConfigModule.forFeature(busesConfig),
  ],
  controllers: [BusesController],
  providers: [BusesService],
  exports: [BusesService],
})
export class BusesModule {}
