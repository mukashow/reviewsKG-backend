import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

type Sort = 'createdAt_asc' | 'createdAt_desc' | 'rating_asc' | 'rating_desc';

export class ReviewCreateDto {
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
  @IsInt()
  @IsNumber()
  @Max(5)
  readonly rating?: number = 0;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  readonly service?: number;
}

export class ReviewQueryDto {
  @ApiProperty({ example: 'createdAt_asc' })
  @IsOptional()
  readonly sort: Sort = 'createdAt_desc';

  @ApiProperty({ example: '+996550669099' })
  @IsOptional()
  @IsPhoneNumber('KY')
  readonly phone: string;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({ example: 10 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @Min(1)
  readonly pageSize: number = 10;
}

export class ReviewDeleteDto {
  @ApiProperty({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  readonly id: number;
}

export class Order {
  @ApiProperty({ example: 'createdAt_asc' })
  readonly key: Sort;

  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'News first' })
  readonly title: string;
}
