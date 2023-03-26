import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReviewCrudQuery {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
