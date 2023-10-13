import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity("teachers")
export class Teacher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(() => Room, (room) => room.teacher)
  rooms: Room[];
}
