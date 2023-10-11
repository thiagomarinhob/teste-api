import { Request, Response } from "express";
import RoomRepository from "../../repository/RoomRepository";

export class RoomController {
  async create(request: Request, response: Response) {
    const { subject } = request.body;

    const result = await RoomRepository.create({
      subject,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async findAll(request: Request, response: Response) {
    const result = await RoomRepository.findAll();

    return response.json(result);
  }

  async find(request: Request, response: Response) {
    const { subject } = request.params;

    const result = await RoomRepository.find(subject);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const { subject } = request.body;
    const { id } = request.params;

    const result = await RoomRepository.update({
      id,
      subject,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const result = await RoomRepository.deleteRoom(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).send();
  }

  async connectTeacher(request: Request, response: Response) {
    const { id } = request.params;
    const { teacherId } = request.body;

    const result = await RoomRepository.connectTeacher(id, teacherId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).send();
  }
}
