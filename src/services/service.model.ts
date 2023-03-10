import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { UserService } from '../users/user-service.model';
import { Review } from '../reviews/reviews.model';
import { ReviewService } from '../reviews/review-service.model';

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

  @BelongsToMany(() => Review, () => ReviewService)
  reviews: Review[];
}
