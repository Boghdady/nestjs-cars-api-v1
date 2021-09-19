import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lng: string;

  @Column()
  lat: string;

  // - Changes the Reports table
  // - User who created this report will be accessed with: report.user
  // - Association is not automatically fetched when we fetch a Report
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
