import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ServiceCRUDQuery {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
