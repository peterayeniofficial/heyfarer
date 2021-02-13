import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bus } from './buses.entity';

export enum Status {
  ACTIVE = 'Active',
  CANCELLED = 'Canceled',
}

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  trip_date: Date;

  @Column({ type: 'decimal' })
  fare: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: string;

  @ManyToOne(() => Bus, (bus) => bus.trips)
  bus: Bus;
}
