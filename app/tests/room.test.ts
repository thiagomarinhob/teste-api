import { Room } from "../src/entities/Room";
import { Teacher } from "../src/entities/Teacher";
import RoomRepository from "../src/repository/RoomRepository";
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

describe("Room", () => {
  it("should create a room instance", () => {
    const room = new Room();
    room.subject = "Português";

    expect(room).toBeDefined();
    expect(room.subject).toBe("Português");
  });

  it("should find all room in database", async () => {
    // Para validar o banco tem que está vázio
    const isEmpty = await RoomRepository.findAll();

    expect(isEmpty).toHaveLength(0);

    const room1 = new Room();
    room1.subject = "Português";

    const room2 = new Room();
    room2.subject = "História";

    await RoomRepository.create(room1);
    await RoomRepository.create(room2);

    const rooms = await RoomRepository.findAll();

    expect(rooms).toHaveLength(2);

    expect(rooms[0].subject).toBe("Português");
    expect(rooms[1].subject).toBe("História");

    await RoomRepository.deleteRoom(room1.id);
    await RoomRepository.deleteRoom(room2.id);
  });

  it("should find by subject in database", async () => {
    const room1 = new Room();
    room1.subject = "Português";

    await RoomRepository.create(room1);

    const roomExist = await RoomRepository.find("Português");

    expect(roomExist).toBeInstanceOf(Room);

    await RoomRepository.deleteRoom(room1.id);
  });

  it("should create and update a room in database", async () => {
    const room1 = new Room();
    room1.subject = "Português";

    await RoomRepository.create(room1);

    expect(room1.subject).toBe("Português");

    room1.subject = "Matemática";

    await RoomRepository.update(room1);

    expect(room1.subject).toBe("Matemática");

    await RoomRepository.deleteRoom(room1.id);
  });

  it("should connect teacher a room in database", async () => {
    let room1 = new Room();
    room1.subject = "Português";

    await RoomRepository.create(room1);

    const teachet = new Teacher();
    teachet.name = "Alex";
    teachet.age = 31;

    await TeacherRepository.create(teachet);

    const result = await RoomRepository.connectTeacher(room1.id, teachet.id);

    if (result instanceof Room) {
      room1 = result;
    }

    expect(room1.teacher.name).toBe("Alex");

    await RoomRepository.deleteRoom(room1.id);
    await TeacherRepository.deleteTeacher(teachet.id);
  });
});
