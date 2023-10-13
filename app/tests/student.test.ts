import { Student } from "../src/entities/Student";
import { Room } from "../src/entities/Room";
import { AppDataSource } from "../src/data-source";
import StudentRepository from "../src/repository/StudentRepository";
import RoomRepository from "../src/repository/RoomRepository";

let connection;

beforeAll(async () => {
  connection = await AppDataSource.initialize()
    .then(async () => {
      console.log("DATABASE CONNECT");
    })
    .catch((error) => console.log(error));
});

afterAll(async () => {
  AppDataSource.destroy().then(() => {
    console.log("DATABASE DISCONNECT");
  });
});

describe("Student", () => {
  it("should create a student instance", async () => {
    const student = new Student();
    student.name = "Thiago";
    student.age = 23;
    student.grade = 9;

    expect(student).toBeDefined();
    expect(student.name).toBe("Thiago");
    expect(student.age).toBe(23);
    expect(student.grade).toBe(9);
  });

  it("should find all and delete students in database", async () => {
    // Para validar o banco tem que está vázio
    const isEmpty = await StudentRepository.findAll();

    expect(isEmpty).toHaveLength(0);

    const student1 = new Student();
    student1.name = "Thiago";
    student1.age = 23;
    student1.grade = 9;

    const student2 = new Student();
    student2.name = "Alex";
    student2.age = 20;
    student2.grade = 8;

    await StudentRepository.create(student1);
    await StudentRepository.create(student2);

    const students = await StudentRepository.findAll();

    expect(students).toHaveLength(2);
    expect(students[0].name).toBe("Thiago");
    expect(students[1].name).toBe("Alex");

    await StudentRepository.deleteStudent(student1.id);
    await StudentRepository.deleteStudent(student2.id);
  });

  it("should find by name and delete a students in database", async () => {
    const student1 = new Student();
    student1.name = "Thiago";
    student1.age = 23;
    student1.grade = 9;

    await StudentRepository.create(student1);

    const studentExist = await StudentRepository.findByName("Thiago");

    expect(studentExist).toBeInstanceOf(Student);
    expect(studentExist.name).toBe("Thiago");
    await StudentRepository.deleteStudent(student1.id);
  });

  it("should create and update a students in database", async () => {
    const student1 = new Student();
    student1.name = "Thiago";
    student1.age = 23;
    student1.grade = 9;

    await StudentRepository.create(student1);

    expect(student1.name).toBe("Thiago");
    expect(student1.age).toBe(23);
    expect(student1.grade).toBe(9);

    student1.name = "Thiago Marinho";
    student1.age = 24;
    student1.grade = 10;

    await StudentRepository.update(student1);

    expect(student1.name).toBe("Thiago Marinho");
    expect(student1.age).toBe(24);
    expect(student1.grade).toBe(10);

    await StudentRepository.deleteStudent(student1.id);
  });

  it("should connect student a room in database", async () => {
    let room = new Room();
    room.subject = "matemática";

    await RoomRepository.create(room);

    const student1 = new Student();
    student1.name = "Thiago";
    student1.age = 23;
    student1.grade = 9;

    await StudentRepository.create(student1);

    const result = await StudentRepository.connectStudentRoom(
      student1.id,
      room.id
    );

    if (result instanceof Room) {
      room = result;
    }

    expect(student1.name).toBe("Thiago");
    expect(student1.age).toBe(23);
    expect(student1.grade).toBe(9);

    expect(room.student[0].name).toBe("Thiago");

    await StudentRepository.deleteStudent(student1.id);
    await RoomRepository.deleteRoom(room.id);
  });
});
