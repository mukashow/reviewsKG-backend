import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Service } from '../services/services.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  serviceProviderPhone: string;

  @Column()
  review: string;

  @Column({ nullable: true })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Service)
  service: Service;
}
