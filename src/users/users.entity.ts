import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Service } from '../services/services.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @ManyToOne(() => Service)
  @JoinTable()
  service: Service;
}
