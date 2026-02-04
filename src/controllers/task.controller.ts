import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.schema";

export class TaskController {
  // CREATE
  static async create(req: Request, res: Response) {
    try {
      const body = createTaskSchema.parse(req.body);

const data = {
  ...body,
  userId: req.userId!,
};


      const task = await prisma.task.create({
        data,
      });

      return res.status(201).json(task);
    } catch (error: any) {
      if (error?.name === "ZodError") {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: error.errors,
        });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // LIST
  static async list(_req: Request, res: Response) {
    try {
      const tasks = await prisma.task.findMany();
      return res.status(200).json(tasks);
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // UPDATE
  static async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      // valida body
      const validatedData = updateTaskSchema.parse(req.body);

      if (Object.keys(validatedData).length === 0) {
        return res.status(400).json({
          message: "Nenhum campo válido enviado para atualização",
        });
      }

      const task = await prisma.task.update({
        where: { id },
        data: validatedData,
      });

      return res.status(200).json(task);
    } catch (error: any) {
      if (error?.name === "ZodError") {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: error.errors,
        });
      }

      if (error?.code === "P2025") {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // DELETE
  static async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.task.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error: any) {
      if (error?.code === "P2025") {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
