import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../services/service.model';
import { ReviewService } from './review-service.model';
import { User } from '../users/users.model';

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
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

  @ForeignKey(() => User)
  @ApiProperty({ example: '+996500500500' })
  @Column({ type: DataType.STRING, allowNull: false })
  serviceProviderPhone: string;

  @ApiProperty({ example: 'Good service' })
  @Column({ type: DataType.STRING, allowNull: false })
  review: string;

  @ApiProperty({ example: 4 })
  @Column({ type: DataType.INTEGER })
  rating: number;

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  @BelongsToMany(() => Service, () => ReviewService)
  services: Service[];
}
