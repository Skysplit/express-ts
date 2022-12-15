import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  path!: string;

  @ManyToOne(() => User)
  user!: User;
}
