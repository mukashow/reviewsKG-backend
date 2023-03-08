import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: 'access token' })
  access: string;

  @ApiProperty({ example: 'refresh token' })
  refresh: string;

  @ApiProperty({ example: '+996500500500' })
  phone: string;
}
