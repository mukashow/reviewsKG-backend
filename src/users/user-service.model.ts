import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Service } from '../services/service.model';

@Table({ tableName: 'user_service' })
export class UserService extends Model<UserService> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Service)
  @Column
  serviceId: number;
}
