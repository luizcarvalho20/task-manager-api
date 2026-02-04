import express from "express";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";


const app = express();

// Middlewares essenciaisx
app.use(express.json());

// Rotas de usuários
app.use("/users", userRoutes);

// Healthcheck
app.get("/health", (_req, res) => {
  return res.status(200).json({ status: "ok" });
});

// Rotas de tarefas
app.use("/tasks", taskRoutes);

export { app };
