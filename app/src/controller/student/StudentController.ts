import { Request, Response } from "express";
import StudentRepository from "../../repository/StudentRepository";

export class StudentController {
  async create(request: Request, response: Response) {
    const { name, age, grade } = request.body;

    const result = await StudentRepository.create({
      name,
      age,
      grade,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async findAll(request: Request, response: Response) {
    const result = await StudentRepository.findAll();

    return response.json(result);
  }

  async findByName(request: Request, response: Response) {
    const { name } = request.params;

    const result = await StudentRepository.findByName(name);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const { name, age, grade } = request.body;
    const { id } = request.params;

    const result = await StudentRepository.update({
      id,
      name,
      age,
      grade,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const result = await StudentRepository.deleteStudent(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).send();
  }

  async connect(request: Request, response: Response) {
    const { studentId, roomId } = request.params;

    const result = await StudentRepository.connectStudentRoom(
      studentId,
      roomId
    );

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
