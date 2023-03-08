import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../services/service.model';
import { UserService } from './user-service.model';
import { Review } from '../reviews/reviews.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '+996500500500' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  @BelongsToMany(() => Service, () => UserService)
  services: Service[];

  @ApiProperty({ example: [{ id: 1, title: 'Авто' }] })
  @HasMany(() => Review)
  reviews: Review[];
}
