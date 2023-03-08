import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ServiceCreate {
  @ApiProperty({ example: 'Auto' })
  @IsNotEmpty()
  @IsString({ message: 'title should be a string' })
  readonly title: string;
}
