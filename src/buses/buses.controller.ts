import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action return all buses. Limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return a #[id] ${id} bus`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} buss`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action remove #${id} bus`;
  }
}
