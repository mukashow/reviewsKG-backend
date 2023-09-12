import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @Column()
  rating: number;

  @ManyToOne(() => Service)
  service: Service;
}
