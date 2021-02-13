import { IsString, IsNumber } from 'class-validator';
export class CreateBusDto {
  @IsString()
  readonly numberPlate: string;

  @IsString()
  readonly manufacturer: string;

  @IsString()
  readonly model: string;

  @IsString()
  readonly year: string;

  @IsNumber()
  readonly capacity: number;
}
