import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  grade: number;
}
