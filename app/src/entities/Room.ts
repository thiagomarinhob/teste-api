import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  subject: string;

  @ManyToMany(() => Student, (student) => student)
  @JoinTable({ name: "student_room" })
  student: Student[];

  @ManyToOne(() => Teacher, (teacher) => teacher.rooms)
  teacher: Teacher;
}
