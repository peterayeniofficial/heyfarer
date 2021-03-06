import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Trip } from './trip.entity';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberPlate: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  capacity: number;

  @Column({ default: 0 })
  recommendations: number;

  @OneToMany(() => Trip, (trip) => trip.bus, { cascade: true })
  trips: Trip[];
}
