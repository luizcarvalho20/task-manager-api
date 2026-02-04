import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
  // REGISTER
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

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
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // LOGIN
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

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

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "dev_secret",
        { expiresIn: "1d" }
      );

      return res.json({ token });
    } catch {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
