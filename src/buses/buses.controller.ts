import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('buses')
export class BusesController {
  @Get()
  findAll() {
    return 'This action return all buses';
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
