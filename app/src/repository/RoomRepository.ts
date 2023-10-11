import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";
import { Teacher } from "../entities/Teacher";

type IRoom = {
  subject: string;
};

type IRoomUpdate = {
  id: string;
  subject: string;
};

const roomRepository = AppDataSource.getRepository(Room);

const teacherRepository = AppDataSource.getRepository(Teacher);

async function findAll() {
  const result = await roomRepository.find({
    relations: {
      student: true,
      teacher: true,
    },
  });

  return result;
}

async function create(data: IRoom) {
  const { subject } = data;
  const existRoom = await roomRepository.findOne({
    where: {
      subject,
    },
  });

  if (existRoom) {
    return new Error("Room already exists!");
  }

  const room = await roomRepository.create({
    subject,
  });

  await roomRepository.save(room);

  return room;
}

async function find(subject: string) {
  const existRoom = await roomRepository.findOne({
    where: {
      subject,
    },
    relations: {
      student: true,
      teacher: true,
    },
  });

  if (!existRoom) {
    return new Error("Room does not exists!");
  }

  return existRoom;
}

async function update(data: IRoomUpdate) {
  const { subject, id } = data;
  const existRoom = await roomRepository.findOne({
    where: {
      id,
    },
  });

  if (!existRoom) {
    return new Error("Room does not exists!");
  }

  existRoom.subject = subject ? subject : existRoom.subject;
  existRoom.teacher;

  await roomRepository.save(existRoom);

  return existRoom;
}

async function deleteRoom(id: string) {
  const existRoom = await roomRepository.findOne({
    where: {
      id,
    },
  });

  if (!existRoom) {
    return new Error("Room does not exists!");
  }

  await roomRepository.delete(existRoom.id);
}

async function connectTeacher(id: string, teacherId: string) {
  const existRoom = await roomRepository.findOne({
    where: {
      id,
    },
    relations: {
      teacher: true,
    },
  });

  if (!existRoom) {
    return new Error("Room does not exists!");
  }

  const existTeacher = await teacherRepository.findOne({
    where: {
      id: teacherId,
    },
    relations: {
      rooms: true,
    },
  });

  if (!existTeacher) {
    return new Error("Teacher not exists!");
  }

  existRoom.teacher = existTeacher;

  await roomRepository.save(existRoom);

  return existRoom;
}

export default { findAll, create, find, update, deleteRoom, connectTeacher };
