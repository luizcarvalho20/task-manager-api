import express from "express";
import swaggerUi from "swagger-ui-express";

import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { swaggerSpec } from "./config/swagger";

const app = express();

// Middlewares essenciais
app.use(express.json());

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de usuários
app.use("/users", userRoutes);

// Healthcheck
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

// Rotas de tarefas
app.use("/tasks", taskRoutes);

export { app };
