import { Teacher } from "../src/entities/Teacher";
import TeacherRepository from "../src/repository/TeacherRepository";
import { AppDataSource } from "../src/data-source";

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

describe("Teacher", () => {
  it("should create a teacher instance", () => {
    const teacher = new Teacher();
    teacher.name = "Joana";
    teacher.age = 40;

    expect(teacher.name).toBe("Joana");
    expect(teacher.age).toBe(40);
  });

  it("should find all teachers in database", async () => {
    // Para validar o banco tem que está vázio
    const isEmpty = await TeacherRepository.findAll();

    expect(isEmpty).toHaveLength(0);

    const teacher1 = new Teacher();
    teacher1.name = "Joana";
    teacher1.age = 40;

    const teacher2 = new Teacher();
    teacher2.name = "João";
    teacher2.age = 30;

    await TeacherRepository.create(teacher1);
    await TeacherRepository.create(teacher2);

    const teachers = await TeacherRepository.findAll();

    expect(teachers).toHaveLength(2);

    expect(teachers[0].name).toBe("Joana");
    expect(teachers[1].name).toBe("João");

    await TeacherRepository.deleteTeacher(teacher1.id);
    await TeacherRepository.deleteTeacher(teacher2.id);
  });

  it("should find by name in database", async () => {
    const teacher = new Teacher();
    teacher.name = "Joana";
    teacher.age = 40;

    await TeacherRepository.create(teacher);

    const teacherExist = await TeacherRepository.findByName("Joana");

    expect(teacherExist).toBeInstanceOf(Teacher);

    await TeacherRepository.deleteTeacher(teacher.id);
  });

  it("should create and update a teacher in database", async () => {
    const teacher = new Teacher();
    teacher.name = "Joana";
    teacher.age = 40;

    await TeacherRepository.create(teacher);

    expect(teacher.name).toBe("Joana");

    teacher.name = "João";
    teacher.age = 30;

    await TeacherRepository.update(teacher);

    expect(teacher.name).toBe("João");

    await TeacherRepository.deleteTeacher(teacher.id);
  });
});
