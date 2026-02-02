import express from "express";
import taskRoutes from "./routes/task.routes";

const app = express();

// Middlewares essenciais
app.use(express.json());

// Healthcheck
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

// Rotas de tarefas
app.use("/tasks", taskRoutes);

export { app };
