import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserQuery {
  @ApiProperty({ example: '+996500500500' })
  @IsPhoneNumber('KY')
  @IsNotEmpty()
  readonly phone: string;
}
