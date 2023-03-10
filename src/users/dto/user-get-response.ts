import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../../services/service.model';

export class UserGetResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '+996500500500' })
  phone: string;

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  services: Service[];
}
