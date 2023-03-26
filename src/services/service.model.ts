import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { UserService } from '../users/user-service.model';
import { Review } from '../reviews/reviews.model';

interface CreationAttrs {
  title: string;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, CreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @BelongsToMany(() => User, () => UserService)
  users: User[];

  @HasMany(() => Review)
  reviews: Review[];
}
