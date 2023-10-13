import { AppDataSource } from "../data-source";
import { Teacher } from "../entities/Teacher";

type ITeacher = {
  name: string;
  age: number;
};

type ITeacherUpdate = {
  id: string;
  name: string;
  age: number;
};

const teacherRepository = AppDataSource.getRepository(Teacher);

async function findAll() {
  const result = await teacherRepository.find({
    relations: {
      rooms: true,
    },
  });

  return result;
}

async function create(data: ITeacher) {
  const { age, name } = data;
  const existTeacher = await teacherRepository.findOne({
    where: {
      name,
    },
  });

  if (existTeacher) {
    return new Error("Teacher already exists!");
  }

  const teacher = await teacherRepository.create({
    name,
    age,
  });

  await teacherRepository.save(teacher);

  return teacher;
}

async function findByName(name: string) {
  const existTeacher = await teacherRepository.findOne({
    where: {
      name,
    },
    relations: {
      rooms: true,
    },
  });

  if (!existTeacher) {
    return new Error("Teacher not exists!");
  }

  return existTeacher;
}

async function update(data: ITeacherUpdate) {
  const { age, name, id } = data;
  const existTeacher = await teacherRepository.findOne({
    where: {
      id,
    },
  });

  if (!existTeacher) {
    return new Error("Teacher does not exists!");
  }

  existTeacher.name = name ? name : existTeacher.name;
  existTeacher.age = age ? age : existTeacher.age;

  await teacherRepository.save(existTeacher);

  return existTeacher;
}

async function deleteTeacher(id: string) {
  const existTeacher = await teacherRepository.findOne({
    where: {
      id,
    },
  });

  if (!existTeacher) {
    return new Error("Teacher does not exists!");
  }

  await teacherRepository.delete(existTeacher.id);
}

export default { findAll, create, findByName, update, deleteTeacher };
