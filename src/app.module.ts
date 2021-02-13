import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusesController } from './buses/buses.controller';
import { BusesService } from './buses/buses.service';

@Module({
  imports: [],
  controllers: [AppController, BusesController],
  providers: [AppService, BusesService],
})
export class AppModule {}
