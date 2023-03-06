import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserCreate {
  @ApiProperty({ example: '+996500500500' })
  @IsPhoneNumber('KY')
  @IsNotEmpty()
  readonly phone: string;
}
