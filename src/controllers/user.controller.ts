import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
  // REGISTER
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // validação mínima para evitar 500 por payload inválido
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Dados inválidos" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("[UserController.register] error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // LOGIN
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // validação mínima para evitar 500 por payload inválido
      if (!email || !password) {
        return res.status(400).json({ message: "Dados inválidos" });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const secret = process.env.JWT_SECRET || "dev_secret";

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "1d",
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("[UserController.login] error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
