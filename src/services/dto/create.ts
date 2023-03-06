import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ServiceCreate {
  @ApiProperty({ example: 'Auto' })
  @IsString({ message: 'title should be a string' })
  readonly title: string;
}
