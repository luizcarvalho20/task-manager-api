import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class TaskController {
  static async create(req: Request, res: Response) {
    const { title, description, userId } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return res.status(201).json(task);
  }

  static async list(_req: Request, res: Response) {
    const tasks = await prisma.task.findMany();
    return res.status(200).json(tasks);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Monta o "data" só com campos que vieram no body (evita sobrescrever com undefined)
    const data: { title?: string; description?: string | null; completed?: boolean } = {};

    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (completed !== undefined) data.completed = completed;

    const task = await prisma.task.update({
      where: { id },
      data,
    });

    return res.status(200).json(task);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    return res.status(204).send();
  }
}
