import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusesController } from './buses/buses.controller';

@Module({
  imports: [],
  controllers: [AppController, BusesController],
  providers: [AppService],
})
export class AppModule {}
