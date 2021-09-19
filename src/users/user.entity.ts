import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // - Does not change the Users table
  // - Reports tied to their user will be accessed with: user.reports
  // - Association is not automatically fetched when we fetch a user
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`User inserted successfully ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User removed successfully ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User updated successfully ${this.id}`);
  }
}
