import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileUpdate {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsNumber()
  readonly service: number;

  @IsOptional()
  @IsString()
  readonly description: string;
}
