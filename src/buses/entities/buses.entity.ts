import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
