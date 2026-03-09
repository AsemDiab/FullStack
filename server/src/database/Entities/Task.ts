import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.ts";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  content!: string;

  @Column("boolean")
  status!: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "ownerId" })
  user!: User;
}
