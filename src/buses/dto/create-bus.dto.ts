import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBusDto {
  @ApiProperty({ description: 'Bus registration number' })
  @IsString()
  readonly numberPlate: string;

  @ApiProperty({ description: 'Bus manufacturers name' })
  @IsString()
  readonly manufacturer: string;

  @ApiProperty({ description: 'Bus model number' })
  @IsString()
  readonly model: string;

  @ApiProperty({ description: 'Bus manufactured year' })
  @IsString()
  readonly year: string;

  @ApiProperty({ description: 'Bus Capacity' })
  @IsNumber()
  readonly capacity: number;
}
