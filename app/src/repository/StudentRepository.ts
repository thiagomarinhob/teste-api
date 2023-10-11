import { Student } from "../entities/Student";
import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";

type IStudent = {
  name: string;
  age: number;
  grade: number;
};

type IStudentUpdate = {
  id: string;
  name: string;
  age: number;
  grade: number;
};

const studentRepository = AppDataSource.getRepository(Student);

const roomRepository = AppDataSource.getRepository(Room);

async function findAll() {
  const result = await studentRepository.find();

  return result;
}

async function create(data: IStudent) {
  const { age, grade, name } = data;
  const existStudent = await studentRepository.findOne({
    where: {
      name,
    },
  });

  if (existStudent) {
    return new Error("Student already exists!");
  }

  const student = await studentRepository.create({
    age,
    grade,
    name,
  });

  await studentRepository.save(student);

  return student;
}

async function findByName(name: string) {
  const existStudent = await studentRepository.findOne({
    where: {
      name,
    },
  });

  if (!existStudent) {
    return new Error("Student not exists!");
  }

  return existStudent;
}

async function update(data: IStudentUpdate) {
  const { age, grade, name, id } = data;
  const existStudent = await studentRepository.findOne({
    where: {
      id,
    },
  });

  if (!existStudent) {
    return new Error("Student does not exists!");
  }

  existStudent.name = name ? name : existStudent.name;
  existStudent.age = age ? age : existStudent.age;
  existStudent.grade = grade ? grade : existStudent.grade;

  await studentRepository.save(existStudent);

  return existStudent;
}

async function deleteStudent(id: string) {
  const existStudent = await studentRepository.findOne({
    where: {
      id,
    },
  });

  if (!existStudent) {
    return new Error("Student does not exists!");
  }

  await studentRepository.delete(existStudent.id);
}

async function connectStudentRoom(studentId: string, roomId: string) {
  const existStudent = await studentRepository.findOne({
    where: {
      id: studentId,
    },
  });

  if (!existStudent) {
    return new Error("Student does not exists!");
  }

  const existRoom = await roomRepository.findOne({
    where: {
      id: roomId,
    },
    relations: {
      student: true,
    },
  });

  if (!existRoom) {
    return new Error("Room does not exists!");
  }

  const validate = await existRoom.student.map((item) => {
    if (item.id === existStudent.id) {
      return item.id;
    }
  });

  if (validate.length > 0) {
    return new Error("Already registered student");
  }

  existRoom.student = [...existRoom.student, existStudent];

  await roomRepository.save(existRoom);

  return existRoom;
}

export default {
  findAll,
  create,
  findByName,
  update,
  deleteStudent,
  connectStudentRoom,
};
