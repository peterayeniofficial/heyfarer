import { Module } from '@nestjs/common';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/buses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  controllers: [BusesController],
  providers: [BusesService],
})
export class BusesModule {}
