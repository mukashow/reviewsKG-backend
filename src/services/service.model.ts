import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserService } from '../users/user-service.model';

interface CreationAttrs {
  title: string;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, CreationAttrs> {
  @ApiProperty({ example: 1 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Auto' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @BelongsToMany(() => User, () => UserService)
  users: User[];
}
