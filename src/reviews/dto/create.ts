import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class ReviewCreate {
  @ApiProperty({ example: '+996500500500' })
  @IsPhoneNumber('KY')
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: '+996500500500' })
  @IsPhoneNumber('KY')
  @IsNotEmpty()
  @IsString()
  readonly serviceProviderPhone: string;

  @ApiProperty({ example: 'Good service' })
  @IsNotEmpty()
  @IsString()
  readonly review: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  readonly rating: number;

  @ApiProperty({ example: [2] })
  @IsOptional()
  @IsNumber({}, { each: true })
  readonly services: number[] = [];
}
