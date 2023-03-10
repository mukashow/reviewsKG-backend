import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserSearch {
  @ApiProperty({ example: '+996500500' })
  @IsNotEmpty()
  @MinLength(7)
  readonly q: string;

  @ApiProperty({ example: [2], required: false })
  @Transform(({ value }) => Number(value))
  readonly service?: number;
}
