import { Request, Response } from "express";
import TeacherRepository from "../../repository/TeacherRepository";

export class TeacherController {
  async create(request: Request, response: Response) {
    const { name, age } = request.body;

    const result = await TeacherRepository.create({
      name,
      age,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async findAll(request: Request, response: Response) {
    const result = await TeacherRepository.findAll();

    return response.json(result);
  }

  async findByName(request: Request, response: Response) {
    const { name } = request.params;

    const result = await TeacherRepository.findByName(name);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const { name, age } = request.body;
    const { id } = request.params;

    const result = await TeacherRepository.update({
      id,
      name,
      age,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const result = await TeacherRepository.deleteTeacher(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).send();
  }
}
