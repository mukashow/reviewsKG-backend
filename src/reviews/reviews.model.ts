import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Service } from '../services/service.model';

interface CreationAttrs {
  author: string;
  serviceProviderPhone: string;
  review: string;
  rating: number;
  serviceId: number;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, CreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING, allowNull: false })
  serviceProviderPhone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  review: string;

  @Column({ type: DataType.INTEGER })
  rating: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;

  @BelongsTo(() => Service)
  service: Service;
}
