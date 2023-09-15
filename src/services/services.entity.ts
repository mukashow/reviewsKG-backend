import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Review } from '../reviews/reviews.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => User, user => user)
  users: User[];

  @OneToMany(() => Review, review => review)
  reviews: Review[];

  @OneToMany(() => Service, service => service.parent)
  children: Service[];

  @ManyToOne(() => Service, service => service.children)
  parent: Service;
}
