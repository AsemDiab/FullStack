import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task.ts";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  email!: string;

  @Column("varchar")
  password_hash!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
