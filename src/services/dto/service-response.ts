import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponse {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Auto' })
  readonly title: string;

  @ApiProperty({ example: '2023-03-07T03:20:20.083Z' })
  readonly createdAt: string;

  @ApiProperty({ example: '2023-03-07T03:20:20.083Z' })
  readonly updatedAt: string;
}
