import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AddServiceToParent {
  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly parent: number;
}
