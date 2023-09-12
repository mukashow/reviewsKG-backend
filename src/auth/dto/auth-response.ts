import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../../services/services.entity';

export class AuthResponse {
  @ApiProperty({ example: 'access token' })
  access: string;

  @ApiProperty({ example: 'refresh token' })
  refresh: string;

  @ApiProperty({ example: '+996500500500' })
  phone: string;

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  services: Service[];
}
