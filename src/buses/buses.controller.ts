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
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Buses')
@Controller('v1/buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @Get()
  findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    return this.busesService.findAll(paginationQuery);
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.busesService.findOne(id);
  }

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busesService.update(id, updateBusDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.busesService.remove(id);
  }
}
