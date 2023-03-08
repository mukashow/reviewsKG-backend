import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Review } from './reviews.model';
import { Service } from '../services/service.model';

@Table({ tableName: 'review_service' })
export class ReviewService extends Model<ReviewService> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Review)
  @Column
  reviewId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;
}
