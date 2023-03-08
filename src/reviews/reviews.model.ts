import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../services/service.model';
import { ReviewService } from './review-service.model';

interface CreationAttrs {
  name: string;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, CreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '+996500500500' })
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ApiProperty({ example: '+996500500500' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: 'Good service' })
  @Column({ type: DataType.STRING, allowNull: false })
  review: string;

  @ApiProperty({ example: 4 })
  @Column({ type: DataType.NUMBER })
  rating: number;

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  @BelongsToMany(() => Service, () => ReviewService)
  services: Service[];
}
